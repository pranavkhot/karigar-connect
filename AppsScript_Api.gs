/**
 * Karigar Connect — JSON API for the external (Vercel) frontend.
 *
 * This is the ONLY backend file you need to add for Route 2.
 * It exposes your existing functions over a simple web request so the
 * website hosted on Vercel can call them. Nothing else changes:
 * saving, the generated CV, Gemini reading, and search all keep working.
 *
 * The website sends a POST with a plain-text JSON body like:
 *   { "action": "register", "payload": { ... } }
 * and this returns JSON back.
 */
function doPost(e) {
  var out;
  try {
    var req = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    switch (req.action) {
      case 'register': out = saveRegistration(req.payload); break;
      case 'parseCV':  out = parseCV(req.file);            break;
      case 'search':   out = searchCandidates(req.filters); break;
      case 'stats':    out = searchStats(req.password);     break;
      default:         out = { success: false, message: 'UNKNOWN_ACTION' };
    }
  } catch (err) {
    out = { success: false, message: 'SERVER_ERROR', detail: String(err) };
  }
  return ContentService
    .createTextOutput(JSON.stringify(out))
    .setMimeType(ContentService.MimeType.JSON);
}
