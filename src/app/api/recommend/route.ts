import { NextResponse } from 'next/server';

const RECOMMENDATION_API_URL = process.env.RECOMMENDATION_API_URL;

export async function POST(req: Request) {
    if (!RECOMMENDATION_API_URL) {
        return NextResponse.json(
            { error: 'Recommendation service is not configured. Please set RECOMMENDATION_API_URL.' },
            { status: 503 }
        );
    }

    try {
        const contentType = req.headers.get('content-type') || '';

        // ── Image-based (multipart/form-data) request ──────────────────────
        if (contentType.includes('multipart/form-data')) {
            const formData = await req.formData();
            const image = formData.get('image') as File;
            const category = formData.get('category') as string | null;

            if (!image) {
                return NextResponse.json({ error: 'No image provided.' }, { status: 400 });
            }

            // Forward the multipart form directly to the external Python API
            const outForm = new FormData();
            outForm.append('image', image);
            if (category) outForm.append('category', category);

            const response = await fetch(`${RECOMMENDATION_API_URL}/recommend`, {
                method: 'POST',
                body: outForm,
            });

            if (!response.ok) {
                const text = await response.text();
                console.error('External API error:', text);
                return NextResponse.json(
                    { error: 'Recommendation engine returned an error.' },
                    { status: 502 }
                );
            }

            const data = await response.json();
            return NextResponse.json(data);
        }

        // ── Attributes-based (JSON) request ────────────────────────────────
        const body = await req.json();
        const { shape, carat, goldColor, category } = body;

        // Map UI carat ranges to float approximations for the ML model
        let parsedCarat = 1.0;
        if (carat) {
            const caratStr = String(carat);
            if (caratStr.includes('0.5 - 1')) parsedCarat = 0.75;
            else if (caratStr.includes('1 - 2')) parsedCarat = 1.5;
            else if (caratStr.includes('2 - 3')) parsedCarat = 2.5;
            else parsedCarat = parseFloat(caratStr) || 1.0;
        }

        // Map UI gold color string to generalised value
        let parsedGold = 'unknown';
        if (goldColor) {
            if (goldColor.toLowerCase().includes('rose')) parsedGold = 'rose';
            else if (goldColor.toLowerCase().includes('white')) parsedGold = 'white';
            else if (goldColor.toLowerCase().includes('yellow')) parsedGold = 'yellow';
        }

        const payload: Record<string, unknown> = {
            shape: shape || 'unknown',
            carat: parsedCarat,
            gold: parsedGold,
        };
        if (category) payload.category = category;

        const response = await fetch(`${RECOMMENDATION_API_URL}/recommend`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const text = await response.text();
            console.error('External API error:', text);
            return NextResponse.json(
                { error: 'Recommendation engine returned an error.' },
                { status: 502 }
            );
        }

        const recommendations = await response.json();

        // Normalise results into the shape the frontend expects
        const mappedResults = recommendations.map((rec: Record<string, string>, index: number) => ({
            id: `rec-${rec.id}-${index}`,
            name: `The ${rec.style.charAt(0).toUpperCase() + rec.style.slice(1)} Match`,
            style: rec.style,
            shape: rec.shape.charAt(0).toUpperCase() + rec.shape.slice(1),
            carat: `${rec.carat} ct`,
            goldColor: rec.gold.charAt(0).toUpperCase() + rec.gold.slice(1) + ' Gold',
            image: rec.image,
            price: 'Price varies upon clarity',
        }));

        return NextResponse.json({ success: true, results: mappedResults });

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { error: 'Internal server error while processing recommendation.' },
            { status: 500 }
        );
    }
}
