/* Karigar Connect — frontend connector
   The browser calls your own Vercel API route, not Google Apps Script directly. */

const API_URL = "/api/karigar";

async function api(action, data) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(Object.assign({ action: action }, data || {}))
  });

  const text = await res.text();
  let json;
  try { json = JSON.parse(text); }
  catch (e) { throw new Error("Bad API response: " + text.slice(0, 200)); }

  if (!res.ok) {
    throw new Error(json.message || json.detail || "API_ERROR");
  }
  return json;
}
