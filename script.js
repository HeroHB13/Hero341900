// Start Screen & Multi-Phase Logic

document.addEventListener('DOMContentLoaded', () => {
  // 0. Start Screen Transition Logic (Separated Start Screen)
  const startFlowBtn = document.getElementById('start-flow-btn');
  const startScreenCard = document.getElementById('start-screen-card');
  const startTimerBadge = document.getElementById('start-timer-badge');
  const mainFlowContainer = document.getElementById('main-flow-container');

  if (startFlowBtn && startScreenCard && mainFlowContainer) {
    startFlowBtn.addEventListener('click', () => {
      // 1. Show Loading Spinner inside button for 2 seconds
      startFlowBtn.disabled = true;
      const originalText = startFlowBtn.innerHTML;

      startFlowBtn.innerHTML = `
        <span class="flex items-center justify-center gap-2 text-slate-950 font-black">
          <svg class="animate-spin h-6 w-6 text-slate-950" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>جاري التجهيز...</span>
        </span>
      `;

      // 2. Wait 2 seconds before transitioning to Phase 1
      setTimeout(() => {
        startScreenCard.classList.add('opacity-0', 'scale-95');
        if (startTimerBadge) startTimerBadge.classList.add('opacity-0', 'scale-95');

        setTimeout(() => {
          startScreenCard.classList.add('hidden');
          if (startTimerBadge) startTimerBadge.classList.add('hidden');
          mainFlowContainer.classList.remove('hidden');

          setTimeout(() => {
            mainFlowContainer.classList.remove('opacity-0', 'scale-95');
          }, 50);
        }, 300);
      }, 2000);
    });
  }

  // 1. Live Countdown Timer Logic (Starts counting down immediately)
  let remainingSeconds = 2 * 60 + 45; // 02:45 minutes (165 seconds)

  function tickTimer() {
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    const timeText = `${formattedMinutes}:${formattedSeconds}`;

    const mainTimer = document.getElementById('countdown-timer');
    const startTimer = document.getElementById('start-screen-timer');

    if (mainTimer) mainTimer.textContent = timeText;
    if (startTimer) startTimer.textContent = timeText;

    if (remainingSeconds > 0) {
      remainingSeconds--;
    } else {
      remainingSeconds = 3 * 60; // Reset to 03:00 to maintain continuous urgency
    }
  }

  // Execute immediately on load, then tick every 1000ms (1 second)
  tickTimer();
  setInterval(tickTimer, 1000);

  // 1.1 Strict Clock & Hour-based Diamond Distribution (Stepped in chunks of 100)
  const distributedCountElement = document.getElementById('distributed-diamonds-count');

  function getClockBasedDistributedDiamonds() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // Total seconds passed since 00:00:00 today
    const totalSecondsToday = (hours * 3600) + (minutes * 60) + seconds;
    const dayProgressRatio = totalSecondsToday / 86400; // 0.0 at 00:00 to 1.0 at 23:59

    const dayStartTotal = 5000;   // Starting total at 00:00:00 (~5,000)
    const dayEndTotal = 325000;   // Ending total at 23:59:59 (~325,000)

    const exactTotal = dayStartTotal + (dayProgressRatio * (dayEndTotal - dayStartTotal));

    // Floor to exact steps of 100 so it always increments by +100 at a time
    return Math.floor(exactTotal / 100) * 100;
  }

  let lastDisplayedSteppedDiamonds = 0;

  function tickDistributedDiamonds() {
    if (!distributedCountElement) return;
    const currentSteppedTotal = getClockBasedDistributedDiamonds();

    if (currentSteppedTotal !== lastDisplayedSteppedDiamonds) {
      lastDisplayedSteppedDiamonds = currentSteppedTotal;

      // Quick flash effect on text when jumping +100
      distributedCountElement.classList.add('text-amber-300', 'scale-105');
      distributedCountElement.textContent = currentSteppedTotal.toLocaleString('en-US');

      setTimeout(() => {
        distributedCountElement.classList.remove('text-amber-300', 'scale-105');
      }, 400);
    }
  }

  // Update immediately and check every 1000ms
  tickDistributedDiamonds();
  setInterval(tickDistributedDiamonds, 1000);

  // 2. Dynamic Live Notifications Ticker Logic (50+ Arab Names, 15 Countries, Random Generator)
  const arabNames = [
    "عبدالله", "أحمد", "محمد", "عمر", "أيوب", "خالد", "يوسف", "فهد", "حمزة", "علي",
    "سعود", "إبراهيم", "حسين", "زياد", "مصطفى", "راشد", "طارق", "سليمان", "وليد", "ياسين",
    "عبدالرحمن", "سعد", "ماجد", "مروان", "بدر", "أنس", "كريم", "سامي", "فيصل", "حسان",
    "بلال", "عثمان", "أيمن", "عادل", "نايف", "مهند", "توفيق", "معاذ", "سالم", "رائد",
    "منصور", "سامر", "نواف", "نبيل", "جهاد", "صالح", "إلياس", "أكرم", "حاتم", "آدم"
  ];

  const arabCountries = [
    { name: "السعودية", flag: "🇸🇦" },
    { name: "مصر", flag: "🇪🇬" },
    { name: "الإمارات", flag: "🇦🇪" },
    { name: "المغرب", flag: "🇲🇦" },
    { name: "الجزائر", flag: "🇩🇿" },
    { name: "العراق", flag: "🇮🇶" },
    { name: "الكويت", flag: "🇰🇼" },
    { name: "الأردن", flag: "🇯🇴" },
    { name: "تونس", flag: "🇹🇳" },
    { name: "عُمان", flag: "🇴🇲" },
    { name: "قطر", flag: "🇶🇦" },
    { name: "ليبيا", flag: "🇱🇾" },
    { name: "فلسطين", flag: "🇵🇸" },
    { name: "البحرين", flag: "🇧🇭" },
    { name: "اليمن", flag: "🇾🇪" }
  ];

  const diamondAmounts = ["1,000", "2,180", "5,000", "10,000"];
  let lastUsedNameIndex = -1;

  function getRandomNotification() {
    let nameIndex;
    do {
      nameIndex = Math.floor(Math.random() * arabNames.length);
    } while (nameIndex === lastUsedNameIndex);
    lastUsedNameIndex = nameIndex;

    const name = arabNames[nameIndex];
    const countryObj = arabCountries[Math.floor(Math.random() * arabCountries.length)];
    const diamonds = diamondAmounts[Math.floor(Math.random() * diamondAmounts.length)];
    const seconds = Math.floor(Math.random() * 45) + 3; // 3 to 48 seconds
    const timeText = seconds < 60 ? `قبل ${seconds} ثانية` : "قبل دقيقة";

    return { name, country: countryObj.name, flag: countryObj.flag, diamonds, time: timeText };
  }

  const notifContainer = document.getElementById('notification-ticker');

  function showNextNotification() {
    if (!notifContainer) return;

    const notif = getRandomNotification();

    // Animate out
    notifContainer.classList.add('opacity-0', 'translate-y-2');

    setTimeout(() => {
      notifContainer.innerHTML = `
        <span class="inline-flex items-center gap-1.5 font-bold text-white">
          <span class="relative flex h-2.5 w-2.5">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span>${notif.name}</span> من <span class="text-amber-400">${notif.country} ${notif.flag}</span>
        </span>
        <span class="text-slate-300 mx-1">قام بشحن</span>
        <span class="inline-flex items-center gap-1 font-extrabold text-amber-400">
          <img src="assets/d1.png" alt="جوهرة" class="w-4 h-4 inline-block animate-pulse">
          ${notif.diamonds} جوهرة
        </span>
        <span class="text-slate-400 text-[11px] mr-1.5">(${notif.time})</span>
      `;

      // Animate in
      notifContainer.classList.remove('opacity-0', 'translate-y-2');
    }, 250);
  }

  showNextNotification();
  setInterval(showNextNotification, 3800);

  // 3. Phase 3: Loading & Simulation Logic
  const playerForm = document.getElementById('player-form');
  const formStepContainer = document.getElementById('form-step-container');
  const loadingStepContainer = document.getElementById('loading-step-container');
  const lockerStepContainer = document.getElementById('locker-step-container');
  const successStepContainer = document.getElementById('success-step-container');
  const statusText = document.getElementById('simulation-status-text');
  const progressBar = document.getElementById('simulation-progress-bar');
  const displayPlayerId = document.getElementById('display-player-id');
  const displayDiamonds = document.getElementById('display-diamonds');
  const cpaOffersList = document.getElementById('cpa-offers-list');

  // Live 4-Second Player ID Inspection Logic & Submit Button Toggle
  const playerIdInput = document.getElementById('player-id');
  const idCheckStatus = document.getElementById('id-check-status');
  const idCheckText = document.getElementById('id-check-text');
  const idCheckBadge = document.getElementById('id-check-badge');
  const startBtn = document.getElementById('start-btn');

  let checkTimer = null;
  let countdownSeconds = 4;
  let countdownInterval = null;
  let isIdVerified = false;
  let lastVerifiedVal = '';

  function disableSubmitButton() {
    if (!startBtn) return;
    startBtn.disabled = true;
    startBtn.className = "w-full mt-4 bg-gradient-to-r from-amber-500 to-amber-600 opacity-50 cursor-not-allowed transition-all duration-300 text-slate-950 font-black text-lg sm:text-xl py-4 px-6 rounded-xl sm:rounded-2xl shadow-none flex items-center justify-center gap-2";
  }

  function enableSubmitButton() {
    if (!startBtn) return;
    startBtn.disabled = false;
    startBtn.className = "w-full mt-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-lg sm:text-xl py-4 px-6 rounded-xl sm:rounded-2xl shadow-[0_4px_25px_rgba(245,158,11,0.4)] hover:shadow-[0_6px_30px_rgba(245,158,11,0.6)] active:scale-95 transform transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer opacity-100";
  }

  function handleIdInputCheck() {
    if (!playerIdInput) return;
    playerIdInput.value = playerIdInput.value.replace(/[^0-9]/g, '');
    const val = playerIdInput.value.trim();
    const errorMsg = document.getElementById('id-error-msg');
    if (errorMsg) errorMsg.classList.add('hidden');

    // If already verified for this exact ID value, keep button enabled!
    if (isIdVerified && val === lastVerifiedVal && val.length >= 8) {
      enableSubmitButton();
      return;
    }

    // Disable button until 4s check completes
    disableSubmitButton();

    // Reset previous timers
    clearInterval(countdownInterval);
    clearTimeout(checkTimer);

    if (val.length >= 8 && val.length <= 20) {
      isIdVerified = false;

      if (idCheckStatus) idCheckStatus.classList.remove('hidden');

      idCheckStatus.className = "mt-2 p-2.5 bg-slate-950/90 border border-amber-500/40 rounded-xl text-xs flex items-center justify-between text-right transition-all duration-300 shadow-inner";

      if (idCheckText) {
        idCheckText.innerHTML = `
          <svg class="animate-spin h-4 w-4 text-amber-400 inline-block shrink-0" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span class="text-slate-200 font-bold">جاري الفحص والتحقق من صحة المعرّف...</span>
        `;
      }

      countdownSeconds = 4;
      if (idCheckBadge) idCheckBadge.textContent = "04s";

      countdownInterval = setInterval(() => {
        countdownSeconds--;
        if (idCheckBadge) idCheckBadge.textContent = `0${Math.max(0, countdownSeconds)}s`;
        if (countdownSeconds <= 0) clearInterval(countdownInterval);
      }, 1000);

      // After 4 seconds -> Mark as verified AND ENABLE SUBMIT BUTTON
      checkTimer = setTimeout(() => {
        clearInterval(countdownInterval);
        isIdVerified = true;
        lastVerifiedVal = val;

        if (idCheckStatus) {
          idCheckStatus.className = "mt-2 p-2.5 bg-emerald-950/90 border border-emerald-500/50 rounded-xl text-xs flex items-center justify-between text-right transition-all duration-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]";
        }

        if (idCheckText) {
          idCheckText.innerHTML = `
            <svg class="w-4 h-4 text-emerald-400 shrink-0 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path>
            </svg>
            <span class="text-emerald-300 font-bold">تم الفحص بنجاح: الحساب نشط وجاهز للشحن ✔️</span>
          `;
        }

        if (idCheckBadge) idCheckBadge.innerHTML = `<span class="text-emerald-400 font-bold">مؤكد</span>`;

        // Enable submit button!
        enableSubmitButton();
      }, 4000);

    } else {
      isIdVerified = false;
      lastVerifiedVal = '';
      if (idCheckStatus) idCheckStatus.classList.add('hidden');
    }
  }

  if (playerIdInput) {
    ['input', 'keyup', 'change', 'paste', 'blur', 'focus'].forEach(eventType => {
      playerIdInput.addEventListener(eventType, handleIdInputCheck);
    });
  }

  if (playerForm) {
    playerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const playerIdInput = document.getElementById('player-id');
      const errorMsg = document.getElementById('id-error-msg');
      const playerId = playerIdInput ? playerIdInput.value.trim() : '';
      const diamondSelect = document.getElementById('diamond-package');
      const selectedOptionText = diamondSelect ? diamondSelect.options[diamondSelect.selectedIndex].text : '';

      // Strictly validate digits only and length between 8 and 20
      const isValidId = /^[0-9]{8,20}$/.test(playerId);

      if (!isValidId) {
        if (errorMsg) errorMsg.classList.remove('hidden');
        if (playerIdInput) playerIdInput.focus();
        return;
      }

      if (errorMsg) errorMsg.classList.add('hidden');

      // Update Target Summary Display
      if (displayPlayerId) displayPlayerId.textContent = playerId;
      if (displayDiamonds) {
        const match = selectedOptionText.match(/[\d,]+/);
        displayDiamonds.textContent = match ? `${match[0]} جوهرة` : selectedOptionText;
      }

      // Update Phase 4 Captcha Verification Locker promise text
      const lockerIdVal = document.getElementById('locker-id-val');
      const lockerDiamondVal = document.getElementById('locker-diamond-val');
      if (lockerIdVal) lockerIdVal.textContent = playerId;
      if (lockerDiamondVal) {
        const match = selectedOptionText.match(/[\d,]+/);
        lockerDiamondVal.textContent = match ? `${match[0]} جوهرة` : selectedOptionText;
      }

      // Smooth Fade Out Form Container
      formStepContainer.classList.add('opacity-0', 'scale-95');

      setTimeout(() => {
        formStepContainer.classList.add('hidden');
        loadingStepContainer.classList.remove('hidden');

        setTimeout(() => {
          loadingStepContainer.classList.remove('opacity-0', 'scale-95');
          runSimulationSequence();
        }, 50);
      }, 300);
    });
  }

  function runSimulationSequence() {
    const steps = [
      { text: "جاري الاتصال بسيرفرات لعبة فري فاير...", progress: "30%", delay: 1800 },
      { text: "جاري التحقق من وجود الآيدي في قاعدة البيانات...", progress: "65%", delay: 2200 },
      { text: "تم التعرف على الحساب بنجاح! جاري توليد الجواهر...", progress: "100%", delay: 2400 }
    ];

    let currentStep = 0;

    function processStep() {
      if (currentStep < steps.length) {
        const step = steps[currentStep];

        // Animate text out
        statusText.classList.add('opacity-0', 'translate-y-1');

        setTimeout(() => {
          statusText.textContent = step.text;
          if (progressBar) progressBar.style.width = step.progress;
          statusText.classList.remove('opacity-0', 'translate-y-1');
        }, 200);

        currentStep++;
        setTimeout(processStep, step.delay);
      } else {
        // Simulation finished -> Transition smoothly to Phase 4 (CPA Locker)
        setTimeout(showLockerStep, 800);
      }
    }

    processStep();
  }

  // 4. Phase 4: CPA Content Locker / OGAds Captcha Locker Logic
  function showLockerStep() {
    if (!loadingStepContainer || !lockerStepContainer) return;

    loadingStepContainer.classList.add('opacity-0', 'scale-95');

    setTimeout(() => {
      loadingStepContainer.classList.add('hidden');
      lockerStepContainer.classList.remove('hidden');

      setTimeout(() => {
        lockerStepContainer.classList.remove('opacity-0', 'scale-95');

        // Trigger OGAds Captcha Locker if function exists
        if (typeof _ogm === 'function') {
          _ogm();
        } else if (typeof call_locker === 'function') {
          call_locker();
        } else if (typeof og_load === 'function') {
          og_load();
        } else {
          fetchAndRenderOffers();
        }
      }, 50);
    }, 300);
  }

  // Fetch CPA Offers strictly via offers.php OGAds API v2 Endpoint
  function fetchAndRenderOffers() {
    if (!cpaOffersList) return;

    cpaOffersList.innerHTML = `
      <div class="animate-pulse space-y-2">
        <div class="h-14 bg-slate-950 rounded-xl border border-slate-800"></div>
        <div class="h-14 bg-slate-950 rounded-xl border border-slate-800"></div>
      </div>
    `;

    fetch('offers.php')
      .then(async response => {
        const rawText = await response.text();
        let data;
        try {
          data = JSON.parse(rawText);
        } catch (e) {
          throw new Error("استجابة السيرفر غير صالحة: " + (rawText ? rawText.substring(0, 100) : "استجابة فارغة"));
        }

        if (data.error) {
          throw new Error(data.message || 'فشل جلب العروض من السيرفر');
        }
        return data;
      })
      .then(data => {
        console.log('OGAds API Received Data:', data);
        let offersList = [];

        if (Array.isArray(data)) {
          offersList = data;
        } else if (data && Array.isArray(data.offers)) {
          offersList = data.offers;
        } else if (data && Array.isArray(data.data)) {
          offersList = data.data;
        } else if (data && Array.isArray(data.result)) {
          offersList = data.result;
        }

        if (offersList && offersList.length > 0) {
          renderOffers(offersList);
        } else {
          showCpaError("");
        }
      })
      .catch(err => {
        console.error('CPA Offer fetch error:', err);
        showCpaError("");
      });
  }

  // Expose function globally so inline onclick handlers work without ReferenceError
  window.fetchAndRenderOffers = fetchAndRenderOffers;

  function showCpaError(errorMsg) {
    if (!cpaOffersList) return;
    // Clear container completely without displaying any error card
    cpaOffersList.innerHTML = '';
  }

  function renderOffers(offers) {
    if (!cpaOffersList) return;

    cpaOffersList.innerHTML = offers.map((offer, index) => {
      const title = offer.anchor || offer.name || offer.title || offer.name_short || `عرض حقيقي رقم ${index + 1}`;
      const url = offer.link || offer.url || offer.href || `#cpa-offer-${index + 1}`;

      let iconMarkup = `<span class="text-xl sm:text-2xl p-2 bg-slate-900 group-hover:bg-amber-500/10 rounded-lg border border-slate-800 group-hover:border-amber-500/30 transition-colors">${offer.icon || (index === 0 ? '📱' : index === 1 ? '📝' : '🎁')}</span>`;

      if (offer.picture) {
        iconMarkup = `<img src="${offer.picture}" alt="" class="w-10 h-10 rounded-lg object-cover border border-slate-800 group-hover:border-amber-500/40">`;
      }

      return `
        <a href="${url}" target="_blank" rel="noopener noreferrer" onclick="onOfferClick(event)"
          class="cpa-offer-item group w-full bg-slate-950/90 hover:bg-slate-900 border border-slate-800 hover:border-amber-500/60 rounded-xl p-3 sm:p-4 text-right flex items-center justify-between gap-3 transition-all duration-200 shadow-md hover:shadow-[0_4px_20px_rgba(245,158,11,0.25)] transform hover:-translate-y-0.5 cursor-pointer block text-decoration-none">

          <div class="flex items-center gap-3">
            ${iconMarkup}
            <div>
              <h4 class="text-xs sm:text-sm font-bold text-white group-hover:text-amber-400 transition-colors leading-snug">
                ${title}
              </h4>
              <span class="text-[11px] text-slate-400">عرض فوري | مجاني 100%</span>
            </div>
          </div>

          <span class="shrink-0 bg-gradient-to-r from-amber-500 to-amber-600 group-hover:from-amber-400 group-hover:to-amber-500 text-slate-950 font-black text-xs sm:text-sm py-2 px-3 sm:px-4 rounded-lg shadow-sm flex items-center gap-1 transition-all">
            <span>إكمال</span>
            <svg class="w-4 h-4 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </span>

        </a>
      `;
    }).join('');
  }

  // Handle Offer Click -> Trigger Phase 5 (Conversion Success Screen)
  window.onOfferClick = function(e) {
    setTimeout(showSuccessStep, 2000);
  };

  // 5. Phase 5: Professional Digital Invoice & Success Screen Logic
  function showSuccessStep() {
    if (!lockerStepContainer || !successStepContainer) return;

    // Dynamically Populate Invoice Details
    const invoiceNum = document.getElementById('invoice-number');
    const invoiceDate = document.getElementById('invoice-date');
    const invoicePlayerId = document.getElementById('invoice-player-id');
    const invoicePackage = document.getElementById('invoice-package');

    const playerIdInput = document.getElementById('player-id');
    const diamondSelect = document.getElementById('diamond-package');

    const randomOrderNum = '#FF-' + Math.floor(100000 + Math.random() * 900000);
    const now = new Date();
    const formattedDate = `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, '0')}/${String(now.getDate()).padStart(2, '0')} - ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    if (invoiceNum) invoiceNum.textContent = randomOrderNum;
    if (invoiceDate) invoiceDate.textContent = formattedDate;
    if (invoicePlayerId && playerIdInput && playerIdInput.value) {
      invoicePlayerId.textContent = playerIdInput.value.trim();
    }
    if (invoicePackage && diamondSelect && diamondSelect.selectedIndex >= 0) {
      const selectedOptionText = diamondSelect.options[diamondSelect.selectedIndex].text;
      const match = selectedOptionText.match(/[\d,]+/);
      invoicePackage.textContent = match ? `${match[0]} جوهرة 💎` : selectedOptionText;
    }

    lockerStepContainer.classList.add('opacity-0', 'scale-95');

    setTimeout(() => {
      lockerStepContainer.classList.add('hidden');
      successStepContainer.classList.remove('hidden');

      setTimeout(() => {
        successStepContainer.classList.remove('opacity-0', 'scale-95');
      }, 50);
    }, 300);
  }

  // Global handle to trigger success step directly if needed
  window.showSuccessStep = showSuccessStep;

  // Secret Trigger: Clicking "SSL" word 10 consecutive times opens Phase 5 Success Screen
  const sslTrigger = document.getElementById('ssl-trigger');
  let sslClickCount = 0;
  let sslClickTimer = null;

  if (sslTrigger) {
    sslTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      sslClickCount++;

      // Reset counter if clicks pause for more than 2.5 seconds
      clearTimeout(sslClickTimer);
      sslClickTimer = setTimeout(() => {
        sslClickCount = 0;
      }, 2500);

      // If clicked 10 times consecutively -> Open Phase 5 Success Screen
      if (sslClickCount >= 10) {
        sslClickCount = 0;
        clearTimeout(sslClickTimer);
        showSuccessStep();
      }
    });
  }
});
