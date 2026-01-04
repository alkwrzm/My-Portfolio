"use server"

export async function submitToGoogleSheets(formData: FormData) {
    const scriptUrl = process.env.GOOGLE_SHEETS_SCRIPT_URL;

    if (!scriptUrl) {
        console.warn("GOOGLE_SHEETS_SCRIPT_URL is not defined. Skipping Google Sheets submission.");
        return { success: false, error: "Configuration missing" };
    }

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string || '';
    const message = formData.get('message') as string;

    try {
        const response = await fetch(scriptUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                phone,
                message,
                timestamp: new Date().toISOString(),
            }),
        });

        if (!response.ok) {
            throw new Error(`Google Sheets API responded with ${response.status}`);
        }

        const result = await response.json();
        return { success: true, data: result };

    } catch (error) {
        console.error('Error submitting to Google Sheets:', error);
        return { success: false, error: 'Failed to submit to Google Sheets' };
    }
}
