// COOKIE CONSENT SCRIPT
(function() {
    // Inject CSS
    const style = document.createElement('style');
    style.textContent = `
    /* --- Your full CSS code goes here --- */
    .cookie-consent-banner { position: fixed; bottom: 20px; right: 20px; width: 465px; background: #fff; border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.12); z-index:9999; padding:24px; font-family:'Inter',sans-serif; display:none; transform:translateY(20px); opacity:0; transition: all 0.4s cubic-bezier(0.25,0.8,0.25,1); }
    .cookie-consent-banner.show { display:block; transform:translateY(0); opacity:1; }
    .cookie-btn { padding:12px 20px; border-radius:8px; cursor:pointer; font-weight:600; font-size:14px; border:none; flex:1; }
    .main-accept-button { background-color:#ed1c24; color:#fff; }
    .main-reject-btn { background-color:#f8f9fa; color:#333; border:1px solid #e0e0e0; }
    .main-adjust-button { background-color:#f8f9fa; color:#333; border:1px solid #e0e0e0; }
    .cookie-settings-modal { display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.7); z-index:10000; padding:30px 0; opacity:0; transition:opacity 0.3s ease-in-out; }
    .cookie-settings-modal.show { display:flex; align-items:center; justify-content:center; opacity:1; }
    .cookie-settings-content { background:#fff; width:845px; max-height:470px; border-radius:12px; overflow:hidden; transform:translateY(20px); transition:transform 0.3s ease-in-out; display:flex; flex-direction:column; }
    .cookie-settings-modal.show .cookie-settings-content { transform:translateY(0); }
    .cookie-settings-header { padding:20px 30px; border-bottom:1px solid #ecf0f1; display:flex; justify-content:space-between; align-items:center; background-color:#f8f9fa; }
    .cookie-settings-body { padding:25px 30px; flex:1; overflow-y:auto; }
    .cookie-settings-footer { padding:20px 30px; background:#f8f9fa; border-top:1px solid #ecf0f1; }
    .main-toggle-switch { position: relative; display:inline-block; width:50px; height:26px; }
    .main-toggle-switch input { opacity:0; width:0; height:0; }
    .toggle-slider { position:absolute; cursor:pointer; top:0; left:0; right:0; bottom:0; background-color:#bdc3c7; border-radius:34px; transition:.4s; }
    .toggle-slider:before { position:absolute; content:""; height:20px; width:20px; left:3px; bottom:3px; background:#fff; border-radius:50%; transition:.4s; }
    input:checked + .toggle-slider { background-color:#2ecc71; }
    input:checked + .toggle-slider:before { transform:translateX(24px); }
    /* Floating button */
    .cookie-settings-button { position:fixed; bottom:96px; right:30px; width:50px; height:50px; background-color:#1177d0; border-radius:50%; display:none; align-items:center; justify-content:center; cursor:pointer; z-index:9998; border:2px solid #fff; transition:all 0.3s ease; }
    .cookie-settings-button.show { display:flex; }
    `;
    document.head.appendChild(style);

    // Create Banner HTML
    const banner = document.createElement('div');
    banner.className = 'cookie-consent-banner';
    banner.innerHTML = `
    <h2>We value your privacy</h2>
    <p>We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze traffic.</p>
    <div style="display:flex; gap:10px; margin-top:10px;">
        <button class="cookie-btn main-reject-btn" id="rejectCookies">Reject</button>
        <button class="cookie-btn main-adjust-button" id="adjustCookies">Adjust</button>
        <button class="cookie-btn main-accept-button" id="acceptCookies">Accept</button>
    </div>
    `;
    document.body.appendChild(banner);

    // Create Settings Modal HTML
    const settingsModal = document.createElement('div');
    settingsModal.className = 'cookie-settings-modal';
    settingsModal.innerHTML = `
    <div class="cookie-settings-content">
        <div class="cookie-settings-header">
            <h2>Cookie Preferences</h2>
            <button class="close-modal" id="closeSettingsModal">×</button>
        </div>
        <div class="cookie-settings-body">
            <div class="cookie-category">
                <div class="toggle-container">
                    <h3>Analytics Cookies</h3>
                    <label class="main-toggle-switch">
                        <input type="checkbox" id="analyticsToggle">
                        <span class="toggle-slider"></span>
                    </label>
                </div>
            </div>
        </div>
        <div class="cookie-settings-footer">
            <button class="cookie-btn main-save-btn" id="saveSettings">Save Preferences</button>
        </div>
    </div>
    `;
    document.body.appendChild(settingsModal);

    // Floating button
    const floatingBtn = document.createElement('div');
    floatingBtn.id = 'cookieFloatingButton';
    floatingBtn.className = 'cookie-settings-button';
    floatingBtn.title = 'Cookie Preferences';
    floatingBtn.innerHTML = '&#9881;'; // gear icon unicode
    document.body.appendChild(floatingBtn);

    // JS Logic
    const acceptBtn = document.getElementById('acceptCookies');
    const rejectBtn = document.getElementById('rejectCookies');
    const adjustBtn = document.getElementById('adjustCookies');
    const closeSettings = document.getElementById('closeSettingsModal');
    const saveSettingsBtn = document.getElementById('saveSettings');
    const analyticsToggle = document.getElementById('analyticsToggle');

    // Show banner if no consent
    if(!localStorage.getItem('cookieConsent')) {
        banner.classList.add('show');
        floatingBtn.classList.add('show');
    } else {
        floatingBtn.classList.add('show');
    }

    acceptBtn.addEventListener('click', function() {
        localStorage.setItem('cookieConsent','accepted');
        banner.classList.remove('show');
    });

    rejectBtn.addEventListener('click', function() {
        localStorage.setItem('cookieConsent','rejected');
        banner.classList.remove('show');
    });

    adjustBtn.addEventListener('click', function(){
        settingsModal.classList.add('show');
    });

    closeSettings.addEventListener('click', function(){
        settingsModal.classList.remove('show');
    });

    saveSettingsBtn.addEventListener('click', function(){
        const analyticsConsent = analyticsToggle.checked;
        localStorage.setItem('analyticsConsent', analyticsConsent ? 'accepted':'rejected');
        settingsModal.classList.remove('show');
        banner.classList.remove('show');
    });

    floatingBtn.addEventListener('click', function(){
        settingsModal.classList.add('show');
    });
})();
