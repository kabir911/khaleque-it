// ---------------------------------------------------------------------------
// Site configuration — edit these values, no need to touch component code.
// ---------------------------------------------------------------------------

// The Google Apps Script / Google Sheets web-app URL that the contact form
// POSTs to. You said you'll provide this later — paste it here when ready.
// It should look like:
//   https://script.google.com/macros/s/AKfyc.../exec
export const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbyEX-6mZAzYVghNdfGOkt2jQBawXfwyMwJ4LucfnGHT5aOzWrUranR50Yz7wvn64LCghQ/exec'

// Google reCAPTCHA v2 ("I'm not a robot" checkbox) site key.
// Get one at https://www.google.com/recaptcha/admin and add your domain
// (and localhost for testing). Paste the SITE key (not the secret) here.
// The value below is Google's official TEST key — it always passes and shows
// a "for testing purposes only" banner. Replace it before going live.
// export const RECAPTCHA_SITE_KEY = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
export const RECAPTCHA_SITE_KEY = '6LeyhggtAAAAAG98-BftoQvClaXGfUGGWqouoagi'

// Public contact details shown on the site (safe to display).
export const CONTACT = {
  email: 'support@divm.com',
  phone: '+49 (0) 172 682 4586',
  city: 'Frankfurt am Main, Germany',
}

export const chatConfig = {
  ollama: {
    host: "https://evtownhouse.hopto.org:11434",
    model: "llama3.1:8b"
  },
  gemini: {
    url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest"
  }
};
