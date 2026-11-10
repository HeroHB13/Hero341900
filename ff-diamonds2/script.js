/* ==========================================================================
   FREE FIRE DIAMONDS CPA LANDING PAGE - JAVASCRIPT LOGIC
   Handles Stepper, Terminal Script, Locker Trigger, Toasts & Comments
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // Configuration / Variables
    let selectedPlatform = 'Android';
    let selectedDiamonds = '1080';
    let playerID = '';

    // OGAds Content Locker URL / Function Configuration
    // Replace 'https://your-ogads-locker-url.com' with your actual OGAds locker link or JS trigger!
    const OGADS_LOCKER_URL = "https://www.google.com"; // Example placeholder - user replaces with OGAds URL

    // DOM Elements
    const step1 = document.getElementById('step-1');
    const step2 = document.getElementById('step-2');
    const step3 = document.getElementById('step-3');

    const stepDot1 = document.getElementById('step-dot-1');
    const stepDot2 = document.getElementById('step-dot-2');
    const stepDot3 = document.getElementById('step-dot-3');

    const line1 = document.getElementById('line-1');
    const line2 = document.getElementById('line-2');

    const inputPlayerID = document.getElementById('player-id');
    const idError = document.getElementById('id-error');
    const btnStep1 = document.getElementById('btn-step-1');
    const btnStep2 = document.getElementById('btn-step-2');

    const summaryID = document.getElementById('summary-id');
    const summaryDiamonds = document.getElementById('summary-diamonds');

    const terminalBody = document.getElementById('terminal-body');
    const progressBar = document.getElementById('progress-bar');
    const progressPercent = document.getElementById('progress-percent');

    const verificationModal = document.getElementById('verification-modal');
    const modalPlayerID = document.getElementById('modal-player-id');
    const btnOgadsLocker = document.getElementById('btn-ogads-locker');

    // Platform Selector
    const platformCards = document.querySelectorAll('.platform-card');
    platformCards.forEach(card => {
        card.addEventListener('click', () => {
            platformCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            selectedPlatform = card.getAttribute('data-platform');

            // Haptic vibration feedback on mobile
            if (navigator.vibrate) navigator.vibrate(40);
        });
    });

    // Diamond Selector Dropdown Logic
    const diamondSelect = document.getElementById('diamond-select');
    if (diamondSelect) {
        selectedDiamonds = diamondSelect.value;
        summaryDiamonds.textContent = `${Number(selectedDiamonds).toLocaleString()} جوهرة`;

        diamondSelect.addEventListener('change', (e) => {
            selectedDiamonds = e.target.value;
            summaryDiamonds.textContent = `${Number(selectedDiamonds).toLocaleString()} جوهرة`;

            // Haptic vibration
            if (navigator.vibrate) navigator.vibrate(40);
        });
    }

    // Real-time Input Sanitization (Numbers Only, Max 20 digits)
    inputPlayerID.addEventListener('input', (e) => {
        // Strip out non-digit characters automatically
        e.target.value = e.target.value.replace(/\D/g, '');
        if (idError.classList.contains('visible')) {
            idError.classList.remove('visible');
        }
    });

    // STEP 1 -> STEP 2 Transition
    btnStep1.addEventListener('click', () => {
        playerID = inputPlayerID.value.trim();

        // Validation Checks (Must not be empty, must be numeric, length between 6 and 20)
        if (!playerID || !/^\d+$/.test(playerID) || playerID.length < 6 || playerID.length > 20) {
            idError.textContent = '⚠️ الرجاء إدخال رقم المعرف الصحيح';
            idError.classList.add('visible');
            inputPlayerID.focus();
            return;
        }

        idError.classList.remove('visible');
        summaryID.textContent = playerID;
        modalPlayerID.textContent = playerID;

        // Switch Steps
        step1.classList.remove('active');
        step2.classList.add('active');

        stepDot1.classList.remove('active');
        stepDot1.classList.add('completed');
        line1.classList.add('completed');
        stepDot2.classList.add('active');
    });

    // STEP 2 -> STEP 3 Transition (Terminal Injection Animation)
    btnStep2.addEventListener('click', () => {
        step2.classList.remove('active');
        step3.classList.add('active');

        stepDot2.classList.remove('active');
        stepDot2.classList.add('completed');
        line2.classList.add('completed');
        stepDot3.classList.add('active');

        // Start Terminal Sequence
        runTerminalSequence();
    });

    // Terminal Script Execution Simulator (40 Seconds Duration)
    function runTerminalSequence() {
        const lines = [
            { text: `[+] Initializing Garena Secure API (SSL 256-bit)...`, delay: 800, percent: 5, type: 'normal' },
            { text: `[+] Establishing encrypted handshake with Region Server (MENA_NODE)...`, delay: 4000, percent: 15, type: 'normal' },
            { text: `[+] Locating Player Database records...`, delay: 8000, percent: 25, type: 'normal' },
            { text: `[+] Searching for Player ID: [ ${playerID} ] on ${selectedPlatform}...`, delay: 13000, percent: 38, type: 'warning' },
            { text: `[✔] Player Record Found! Nickname & Region Verified.`, delay: 18000, percent: 50, type: 'success' },
            { text: `[+] Requesting Diamond Injection Token from Garena Mainframe...`, delay: 23000, percent: 62, type: 'normal' },
            { text: `[+] Injecting Payload: +${Number(selectedDiamonds).toLocaleString()} Diamonds to Account Wallet...`, delay: 28000, percent: 76, type: 'highlight' },
            { text: `[+] Deploying Anti-Ban Hash Shield (Garena_Bypass_v4.2)...`, delay: 33000, percent: 88, type: 'normal' },
            { text: `[✔] Diamonds Injected Successfully into Account Balance!`, delay: 37000, percent: 96, type: 'success' },
            { text: `[!] SECURITY_LOCK: Action Required: `, delay: 40000, percent: 100, type: 'error', hasBtn: true }
        ];

        terminalBody.innerHTML = '';

        lines.forEach(item => {
            setTimeout(() => {
                const lineDiv = document.createElement('div');
                lineDiv.className = `terminal-line ${item.type}`;

                if (item.hasBtn) {
                    lineDiv.innerHTML = `<span>${item.text}</span> <button class="terminal-verify-btn" id="terminal-verify-btn">VERIFY</button>`;
                } else {
                    lineDiv.textContent = item.text;
                }

                terminalBody.appendChild(lineDiv);
                terminalBody.scrollTop = terminalBody.scrollHeight;

                // Update Progress Bar
                progressBar.style.setProperty('--progress-w', `${item.percent}%`);
                progressBar.style.width = `${item.percent}%`;
                progressPercent.textContent = `${item.percent}%`;

                // Wire click listener if button was rendered
                if (item.hasBtn) {
                    const btn = document.getElementById('terminal-verify-btn');
                    if (btn) {
                        btn.addEventListener('click', () => {
                            showVerificationModal();
                        });
                    }
                }
            }, item.delay);
        });
    }

    // Verification Modal Trigger
    function showVerificationModal() {
        const modalDiamondsCount = document.getElementById('modal-diamonds-count');
        if (modalDiamondsCount) {
            modalDiamondsCount.textContent = Number(selectedDiamonds).toLocaleString();
        }
        if (modalPlayerID) {
            modalPlayerID.textContent = playerID;
        }
        verificationModal.classList.add('active');
        startCountdownTimer(300); // 5 minutes timer
    }

    // Countdown Timer (04:59)
    function startCountdownTimer(durationSeconds) {
        let timer = durationSeconds;
        const timerClock = document.getElementById('countdown-timer');

        const interval = setInterval(() => {
            const minutes = Math.floor(timer / 60);
            const seconds = timer % 60;

            const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
            const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

            timerClock.textContent = `${formattedMinutes}:${formattedSeconds}`;

            if (--timer < 0) {
                clearInterval(interval);
                timerClock.textContent = "00:00";
            }
        }, 1000);
    }

    // OGAds Locker Button Click Handler
    btnOgadsLocker.addEventListener('click', () => {
        if (typeof og_load === 'function') {
            og_load();
        } else {
            try {
                og_load();
            } catch (err) {
                console.warn("OGAds og_load() function not found or blocked by AdBlocker.", err);
            }
        }
    });

    // Live Social Proof Toast Notifications
    const countries = ['السعودية 🇸🇦', 'مصر 🇪🇬', 'المغرب 🇲🇦', 'الجزائر 🇩🇿', 'العراق 🇮🇶', 'الإمارات 🇦🇪', 'تونس 🇹🇳'];
    const diamondAmounts = ['1,080', '2,200', '5,600'];
    const toastElem = document.getElementById('live-toast');
    const toastTitle = document.getElementById('toast-title');
    const toastDesc = document.getElementById('toast-desc');

    function triggerRandomToast() {
        const randomCountry = countries[Math.floor(Math.random() * countries.length)];
        const randomID = Math.floor(100000 + Math.random() * 899999);
        const randomAmount = diamondAmounts[Math.floor(Math.random() * diamondAmounts.length)];
        const randomTime = Math.floor(3 + Math.random() * 15);

        toastTitle.textContent = `لاعب من ${randomCountry} (ID: ${randomID}***)`;
        toastDesc.textContent = `قام بشحن ${randomAmount} جوهرة قبل ${randomTime} ثانية!`;

        toastElem.classList.add('show');

        setTimeout(() => {
            toastElem.classList.remove('show');
        }, 4000);
    }

    // Trigger first toast after 4 seconds, then repeat every 10 seconds
    setTimeout(() => {
        triggerRandomToast();
        setInterval(triggerRandomToast, 11000);
    }, 4000);

    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g,
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    }

    // Typewriter Typing Effect for Header Subtitle
    const typingSentences = [
        "شحن جواهر فري فاير مجانا من هنا",
        "هل تريد اكثر من 1000 جوهرة مجانيه ؟",
        "موقعنا مضمون وصادق 100% وتصل الجواهر مباشرة",
        "افضل طريقه لشحن جواهر فري فاير مجانا"
    ];

    let sentenceIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingElem = document.getElementById('typing-text');

    function typeEffect() {
        if (!typingElem) return;

        const currentSentence = typingSentences[sentenceIndex];

        if (isDeleting) {
            charIndex--;
            typingElem.textContent = currentSentence.substring(0, charIndex);
        } else {
            charIndex++;
            typingElem.textContent = currentSentence.substring(0, charIndex);
        }

        let typeSpeed = isDeleting ? 35 : 70;

        if (!isDeleting && charIndex === currentSentence.length) {
            typeSpeed = 2200; // Pause when sentence is fully typed
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            sentenceIndex = (sentenceIndex + 1) % typingSentences.length;
            typeSpeed = 400; // Pause before starting next sentence
        }

        setTimeout(typeEffect, typeSpeed);
    }

    typeEffect();

    // Dynamic Header Status (Date + Hourly Online Calculator + Status)
    function updateHeaderStatus() {
        const now = new Date();

        // 1. Format Date: DD-MM-YYYY
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        const dateStr = `${day}-${month}-${year}`;

        const dateElem = document.getElementById('header-date');
        if (dateElem) dateElem.textContent = dateStr;

        // 2. Calculate Online Users dynamically: 80 at 00:00 -> 1700 at 23:59
        const currentMinutes = now.getHours() * 60 + now.getMinutes();
        const totalDayMinutes = 1440;
        const progress = currentMinutes / totalDayMinutes;

        const baseOnline = Math.round(80 + progress * (1700 - 80));
        const fluctuation = Math.floor(Math.random() * 9) - 4; // slight live fluctuation
        const finalOnline = Math.max(80, baseOnline + fluctuation);

        const onlineElem = document.getElementById('header-online-users');
        if (onlineElem) onlineElem.textContent = finalOnline.toLocaleString();
    }

    updateHeaderStatus();
    setInterval(updateHeaderStatus, 5000);

});
