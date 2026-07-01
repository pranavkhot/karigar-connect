export async function POST(request) {
  try {
    const appsScriptUrl = process.env.APPS_SCRIPT_URL;

    if (!appsScriptUrl) {
      return Response.json(
        { success: false, message: "APPS_SCRIPT_URL_NOT_SET" },
        { status: 500 }
      );
    }

    const body = await request.text();

    const googleResponse = await fetch(appsScriptUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body
    });

    const text = await googleResponse.text();

    return new Response(text, {
      status: googleResponse.ok ? 200 : 502,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return Response.json(
      { success: false, message: "VERCEL_CONNECTOR_ERROR", detail: String(error) },
      { status: 500 }
    );
  }
}

export async function GET() {
  return Response.json({ ok: true, service: "Karigar Connect API" });
}
