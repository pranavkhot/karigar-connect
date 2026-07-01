# Karigar Connect Vercel Connector Setup

1. Add AppsScript_Api.gs code to your Google Apps Script project as Api.gs.
2. Redeploy Apps Script as Web App: Execute as Me, Access Anyone. Copy the /exec URL.
3. Upload/deploy this folder to Vercel.
4. In Vercel Project Settings > Environment Variables add:
   APPS_SCRIPT_URL = your Apps Script /exec URL
5. Redeploy Vercel.

Pages:
- / = worker registration form
- /search = owner/company search
- /share = QR and WhatsApp links
