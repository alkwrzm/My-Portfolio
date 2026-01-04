"use server";

import { google } from "googleapis";

export async function submitToGoogleSheets(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;
    const sheetId = process.env.GOOGLE_SHEET_ID;
    const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'); // Handle newlines in env var

    if (!sheetId || !clientEmail || !privateKey) {
        console.error("Missing Google Sheets credentials");
        return { success: false, error: "Server configuration error" };
    }

    try {
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: clientEmail,
                private_key: privateKey,
            },
            scopes: [
                "https://www.googleapis.com/auth/drive",
                "https://www.googleapis.com/auth/drive.file",
                "https://www.googleapis.com/auth/spreadsheets",
            ],
        });

        const sheets = google.sheets({ version: "v4", auth });

        await sheets.spreadsheets.values.append({
            spreadsheetId: sheetId,
            range: "A1", // Starts appending from the first sheet
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [[new Date().toISOString(), name, email, message]],
            },
        });

        return { success: true };
    } catch (error) {
        console.error("Error submitting to Google Sheets:", error);
        return { success: false, error: "Failed to submit to Google Sheets" };
    }
}
