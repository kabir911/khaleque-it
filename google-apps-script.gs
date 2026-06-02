/**
 * Google Apps Script backend for the Khaleque IT Consulting contact form.
 *
 * SETUP
 * 1. Create a new Google Sheet. Note its name.
 * 2. Extensions ▸ Apps Script. Delete the default code and paste this file.
 * 3. (Recommended) Set your reCAPTCHA SECRET key below to verify submissions
 *    server-side. Leave blank to skip verification.
 * 4. Deploy ▸ New deployment ▸ type "Web app".
 *      - Execute as: Me
 *      - Who has access: Anyone
 *    Copy the resulting /exec URL.
 * 5. Paste that URL into src/config.js -> GOOGLE_SHEETS_URL, then rebuild/redeploy the site.
 *
 * The first row of the sheet is created automatically as a header row.
 */

// Optional: paste your reCAPTCHA v2 SECRET key (not the site key) to verify tokens.
var RECAPTCHA_SECRET = '';

function doPost(e) {
  try {
    var p = (e && e.parameter) || {};

    // Optional server-side reCAPTCHA verification.
    if (RECAPTCHA_SECRET) {
      var token = p['g-recaptcha-response'] || '';
      var verify = UrlFetchApp.fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'post',
        payload: { secret: RECAPTCHA_SECRET, response: token },
        muteHttpExceptions: true,
      });
      var result = JSON.parse(verify.getContentText());
      if (!result.success) {
        return json({ ok: false, error: 'captcha-failed' });
      }
    }

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    var headers = ['timestamp', 'name', 'email', 'company', 'phone', 'message', 'language', 'page'];

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(headers);
    }

    sheet.appendRow([
      new Date(),
      p.name || '',
      p.email || '',
      p.company || '',
      p.phone || '',
      p.message || '',
      p.language || '',
      p.page || '',
    ]);

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
