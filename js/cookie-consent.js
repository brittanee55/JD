
(function () {
  const KEY = "hka_cookie_preferences_v1";

  function getPrefs() {
    try { return JSON.parse(localStorage.getItem(KEY)); } catch(e) { return null; }
  }

  function savePrefs(prefs) {
    localStorage.setItem(KEY, JSON.stringify({ ...prefs, savedAt: new Date().toISOString() }));
    document.documentElement.dataset.cookies = "saved";
    const banner = document.querySelector(".cookie-banner");
    const modal = document.querySelector(".cookie-modal-backdrop");
    if (banner) banner.remove();
    if (modal) modal.remove();
  }

  function injectStyles() {
    if (document.getElementById("cookie-consent-styles")) return;
    const style = document.createElement("style");
    style.id = "cookie-consent-styles";
    style.textContent = `
      .cookie-banner{position:fixed;left:20px;right:20px;bottom:20px;z-index:20000;display:flex;gap:16px;align-items:center;justify-content:space-between;background:rgba(2,8,7,.96);border:1px solid rgba(217,164,65,.35);color:#f7f1e5;border-radius:16px;padding:18px 20px;box-shadow:0 24px 80px rgba(0,0,0,.45);backdrop-filter:blur(12px)}
      .cookie-banner p{margin:0;color:#c8bfae;line-height:1.5}
      .cookie-banner strong{color:#fff}
      .cookie-actions{display:flex;gap:10px;flex-wrap:wrap}
      .cookie-actions button{border:1px solid rgba(217,164,65,.45);background:rgba(0,0,0,.25);color:#f1d083;border-radius:10px;padding:10px 13px;font-weight:800;cursor:pointer}
      .cookie-actions .accept{background:#0b684f;color:#fff;border-color:rgba(97,214,162,.55)}
      .cookie-actions .reject{color:#fff}
      .cookie-modal-backdrop{position:fixed;inset:0;z-index:20001;background:rgba(0,0,0,.68);display:grid;place-items:center;padding:20px}
      .cookie-modal{width:min(560px,100%);background:#06110f;border:1px solid rgba(217,164,65,.35);border-radius:18px;padding:24px;color:#f7f1e5}
      .cookie-modal h2{margin:0 0 10px}
      .cookie-option{display:flex;align-items:center;justify-content:space-between;border-top:1px solid rgba(217,164,65,.14);padding:14px 0;gap:18px}
      .cookie-option p{margin:3px 0 0;color:#c8bfae;font-size:14px}
      .cookie-option input{width:22px;height:22px}
      @media(max-width:760px){.cookie-banner{display:grid}.cookie-actions{width:100%}.cookie-actions button{flex:1}}
    `;
    document.head.appendChild(style);
  }

  function openPreferences() {
    document.querySelector(".cookie-modal-backdrop")?.remove();
    const current = getPrefs() || { necessary: true, analytics: false, functional: false, marketing: false };
    const wrap = document.createElement("div");
    wrap.className = "cookie-modal-backdrop";
    wrap.innerHTML = `
      <div class="cookie-modal" role="dialog" aria-modal="true" aria-label="Cookie preferences">
        <h2>Cookie Preferences</h2>
        <p>Choose which optional cookies can be used. Necessary cookies are always enabled.</p>
        <div class="cookie-option"><div><strong>Necessary</strong><p>Required for security, forms, sessions, and preferences.</p></div><input type="checkbox" checked disabled /></div>
        <div class="cookie-option"><div><strong>Analytics</strong><p>Helps improve performance and understand usage.</p></div><input id="ck-analytics" type="checkbox" ${current.analytics ? "checked" : ""}/></div>
        <div class="cookie-option"><div><strong>Functional</strong><p>Remembers preferences and improves your experience.</p></div><input id="ck-functional" type="checkbox" ${current.functional ? "checked" : ""}/></div>
        <div class="cookie-option"><div><strong>Marketing</strong><p>Supports ads, pixels, retargeting, and campaign measurement.</p></div><input id="ck-marketing" type="checkbox" ${current.marketing ? "checked" : ""}/></div>
        <div class="cookie-actions">
          <button class="reject" id="cookie-close">Cancel</button>
          <button class="accept" id="cookie-save">Save Preferences</button>
        </div>
      </div>`;
    document.body.appendChild(wrap);
    document.getElementById("cookie-close").onclick = () => wrap.remove();
    document.getElementById("cookie-save").onclick = () => savePrefs({
      necessary: true,
      analytics: document.getElementById("ck-analytics").checked,
      functional: document.getElementById("ck-functional").checked,
      marketing: document.getElementById("ck-marketing").checked
    });
  }

  function showBanner() {
    if (getPrefs()) return;
    injectStyles();
    const banner = document.createElement("div");
    banner.className = "cookie-banner";
    banner.innerHTML = `
      <p><strong>We use cookies.</strong> We use necessary cookies to run the site and optional cookies for analytics, personalization, and marketing.</p>
      <div class="cookie-actions">
        <button class="reject" id="cookie-reject">Reject</button>
        <button id="cookie-manage">Manage Preferences</button>
        <button class="accept" id="cookie-accept">Accept</button>
      </div>`;
    document.body.appendChild(banner);
    document.getElementById("cookie-reject").onclick = () => savePrefs({ necessary: true, analytics: false, functional: false, marketing: false });
    document.getElementById("cookie-accept").onclick = () => savePrefs({ necessary: true, analytics: true, functional: true, marketing: true });
    document.getElementById("cookie-manage").onclick = openPreferences;
  }

  window.HKACookiePreferences = { open: openPreferences, get: getPrefs, save: savePrefs };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", showBanner);
  } else {
    showBanner();
  }
})();
