/**
 * OUR EVERLASTING STORY — PROFESSIONAL COUPLE PORTFOLIO SCRIPT
 * Features:
 * - Live Relationship Timeline Counter (Days, Hours, Minutes, Seconds)
 * - Header Interactive Audio Equalizer Player
 * - Synchronized Arctic Monkeys Lyrics Video & Audio Player
 * - Direct WhatsApp Dispatcher (to 0895-2724-3318)
 * - Gallery Lightbox Viewer
 * - Full Personalization Engine (LocalStorage)
 */

// Helper to get 1 day ago (24 hours ago)
function getOneDayAgoISO() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString();
}

// 1. DATA CONFIGURATION
const defaultStoryConfig = {
  name: "Zakiya",
  maleName: "xRed",
  photo: "zakiya.jpg",
  malePhoto: "xred.jpg",
  whatsappNumber: "6289527243318",
  anniversaryDate: getOneDayAgoISO(), // Dibuat 1 Hari
  letter: `"Terima kasih telah hadir dan menjadi bagian paling berharga dalam perjalananku. Bersamamu, hal-hal sederhana terasa begitu bermakna, dan hari-hari yang berat selalu terasa jauh lebih ringan. Aku bersyukur atas caramu tersenyum, caramu mendengarkan, dan caramu selalu mendukungku dalam keadaan apa pun. Semoga perjalanan ini terus kita tapaki bersama dengan rasa saling percaya, saling menjaga, dan saling mencintai dengan setulus hati. Selalu ada untukmu, kini dan seterusnya."`
};

function getConfig() {
  const saved = localStorage.getItem("our_everlasting_story_v2");
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      // Auto-update to xRed & Zakiya
      if (parsed.name === "Freya Anindya" || !parsed.name) {
        parsed.name = "Zakiya";
      }
      if (parsed.maleName === "Dika Pratama" || !parsed.maleName) {
        parsed.maleName = "xRed";
      }
      if (!parsed.photo || parsed.photo.includes("unsplash")) {
        parsed.photo = "zakiya.jpg";
      }
      if (!parsed.malePhoto || parsed.malePhoto.includes("unsplash")) {
        parsed.malePhoto = "xred.jpg";
      }
      if (!parsed.whatsappNumber || parsed.whatsappNumber === "6281234567890") {
        parsed.whatsappNumber = "6289527243318";
      }
      // Auto-update to 1 day if it was still on the old 2023 date
      if (parsed.anniversaryDate === "2023-10-24T00:00:00" || !parsed.anniversaryDate) {
        parsed.anniversaryDate = getOneDayAgoISO();
      }
      localStorage.setItem("our_everlasting_story_v2", JSON.stringify(parsed));
      return parsed;
    } catch (e) {
      console.error(e);
    }
  }
  return defaultStoryConfig;
}

let currentConfig = getConfig();

function saveConfig(newCfg) {
  currentConfig = newCfg;
  localStorage.setItem("our_everlasting_story_v2", JSON.stringify(newCfg));
  applyConfigToUI();
}

// 2. LIVE RELATIONSHIP MILESTONE COUNTER
function updateRelationshipCounter() {
  const start = new Date(currentConfig.anniversaryDate).getTime();
  const now = new Date().getTime();
  const diff = now - start;

  if (diff > 0) {
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    const dEl = document.getElementById("countDays");
    const hEl = document.getElementById("countHours");
    const mEl = document.getElementById("countMinutes");
    const sEl = document.getElementById("countSeconds");

    if (dEl) dEl.textContent = Math.max(1, days).toLocaleString("id-ID");
    if (hEl) hEl.textContent = String(hours).padStart(2, "0");
    if (mEl) mEl.textContent = String(minutes).padStart(2, "0");
    if (sEl) sEl.textContent = String(seconds).padStart(2, "0");
  }

  try {
    const d = new Date(currentConfig.anniversaryDate);
    const months = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
    const formatted = `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
    const heroDate = document.getElementById("heroAnniversaryDateDisplay");
    if (heroDate) heroDate.textContent = `Baru 1 Hari Bersama • Sejak ${formatted}`;
  } catch (e) {}
}
setInterval(updateRelationshipCounter, 1000);
updateRelationshipCounter();

// 3. HEADER AUDIO EQUALIZER SYSTEM (Synchronized with Spotify Track)
const btnHeaderAudio = document.getElementById("btnHeaderAudio");
const audioStatusText = document.getElementById("audioStatusText");

if (btnHeaderAudio) {
  btnHeaderAudio.addEventListener("click", () => {
    toggleSpotifyPlay();
  });
}

// 4. SPOTIFY AUDIO PLAYER & LIVE KARAOKE LYRICS ENGINE
const spAudio = document.getElementById("spotifyAudioTrack");
const spBtnPlay = document.getElementById("spBtnPlay");
const spPlayIcon = document.getElementById("spPlayIcon");
const spSeekRail = document.getElementById("spSeekRail");
const spSeekProgress = document.getElementById("spSeekProgress");
const spTimeCurrent = document.getElementById("spTimeCurrent");
const spTimeTotal = document.getElementById("spTimeTotal");
const spHeartBtn = document.getElementById("spHeartBtn");
const spBtnShuffle = document.getElementById("spBtnShuffle");
const spBtnPrev = document.getElementById("spBtnPrev");
const spBtnNext = document.getElementById("spBtnNext");
const spBtnRepeat = document.getElementById("spBtnRepeat");
const spVolSlider = document.getElementById("spVolSlider");
const spVolMuteBtn = document.getElementById("spVolMuteBtn");
const spVolIcon = document.getElementById("spVolIcon");
const spStatusBadge = document.getElementById("spStatusBadge");
const spLyricsContainer = document.getElementById("spLyricsContainer");

// Synchronized Lyrics Data for Arctic Monkeys — I Wanna Be Yours (3:04)
const spotifyLyrics = [
  { time: 0, text: "♪ (Intro - Arctic Monkeys) ♪" },
  { time: 13, text: "I wanna be your vacuum cleaner" },
  { time: 17, text: "Breathing in your dust" },
  { time: 21, text: "I wanna be your Ford Cortina" },
  { time: 25, text: "I will never rust" },
  { time: 29, text: "If you like your coffee hot" },
  { time: 33, text: "Let me be your coffee pot" },
  { time: 37, text: "You call the shots, babe" },
  { time: 41, text: "I just wanna be yours" },
  { time: 45, text: "Secrets I have held in my heart" },
  { time: 49, text: "Are harder to hide than I thought" },
  { time: 53, text: "Maybe I just wanna be yours" },
  { time: 58, text: "I wanna be yours, I wanna be yours" },
  { time: 64, text: "Wanna be yours, wanna be yours" },
  { time: 70, text: "Wanna be yours..." },
  { time: 74, text: "Let me be your 'lelectric meter" },
  { time: 78, text: "And I will not run out" },
  { time: 82, text: "Let me be the portable heater" },
  { time: 86, text: "That you'll get cold without" },
  { time: 89, text: "I wanna be your setting lotion" },
  { time: 94, text: "Hold your hair in deep devotion" },
  { time: 98, text: "At least as deep as the Pacific Ocean" },
  { time: 102, text: "Now I wanna be yours" },
  { time: 106, text: "Secrets I have held in my heart" },
  { time: 110, text: "Are harder to hide than I thought" },
  { time: 114, text: "Maybe I just wanna be yours" },
  { time: 119, text: "I wanna be yours, I wanna be yours" },
  { time: 125, text: "Wanna be yours, wanna be yours" },
  { time: 131, text: "Wanna be yours, wanna be yours..." },
  { time: 139, text: "♪ (Guitar Instrumental) ♪" },
  { time: 148, text: "Secrets I have held in my heart" },
  { time: 152, text: "Are harder to hide than I thought" },
  { time: 156, text: "Maybe I just wanna be yours" },
  { time: 161, text: "I wanna be yours, I wanna be yours" },
  { time: 167, text: "Wanna be yours, wanna be yours" },
  { time: 173, text: "I wanna be yours..." }
];

// Render Spotify Lyrics items
function renderSpotifyLyrics() {
  if (!spLyricsContainer) return;
  spLyricsContainer.innerHTML = "";
  spotifyLyrics.forEach((item, index) => {
    const p = document.createElement("p");
    p.className = "sp-lyric-item";
    p.textContent = item.text;
    p.dataset.time = item.time;
    p.dataset.index = index;
    p.onclick = () => {
      if (spAudio) {
        spAudio.currentTime = item.time;
        if (spAudio.paused) playSpotifyAudio();
      }
    };
    spLyricsContainer.appendChild(p);
  });
}
renderSpotifyLyrics();

function formatTime(seconds) {
  if (isNaN(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

function playSpotifyAudio() {
  if (!spAudio) return Promise.resolve();

  return spAudio.play().then(() => {
    if (spPlayIcon) spPlayIcon.className = "fa-solid fa-pause";
    if (spStatusBadge) spStatusBadge.textContent = "PLAYING NOW";
    if (btnHeaderAudio) {
      btnHeaderAudio.classList.add("playing");
      if (audioStatusText) audioStatusText.textContent = "Playing";
    }
  }).catch(e => {
    console.log("Play interrupted:", e);
    throw e;
  });
}

function pauseSpotifyAudio() {
  if (!spAudio) return;
  spAudio.pause();
  if (spPlayIcon) spPlayIcon.className = "fa-solid fa-play";
  if (spStatusBadge) spStatusBadge.textContent = "PAUSED";
  if (btnHeaderAudio) {
    btnHeaderAudio.classList.remove("playing");
    if (audioStatusText) audioStatusText.textContent = "Soundtrack";
  }
}

function toggleSpotifyPlay() {
  if (!spAudio) return;
  if (spAudio.paused) {
    playSpotifyAudio();
  } else {
    pauseSpotifyAudio();
  }
}

if (spBtnPlay) spBtnPlay.addEventListener("click", toggleSpotifyPlay);

// Smart Autoplay System
function initSmartAutoplay() {
  if (!spAudio) return;

  const promise = spAudio.play();
  if (promise !== undefined) {
    promise.then(() => {
      // Autoplay allowed by browser
      if (spPlayIcon) spPlayIcon.className = "fa-solid fa-pause";
      if (spStatusBadge) spStatusBadge.textContent = "PLAYING NOW";
      if (btnHeaderAudio) {
        btnHeaderAudio.classList.add("playing");
        if (audioStatusText) audioStatusText.textContent = "Playing";
      }
    }).catch(() => {
      // Browser autoplay policy blocked unprompted audio -> trigger on first user touch/click/scroll
      const onFirstAction = () => {
        if (spAudio.paused) {
          playSpotifyAudio().catch(() => {});
        }
        document.removeEventListener("click", onFirstAction);
        document.removeEventListener("touchstart", onFirstAction);
        document.removeEventListener("scroll", onFirstAction);
        document.removeEventListener("keydown", onFirstAction);
      };

      document.addEventListener("click", onFirstAction, { once: true });
      document.addEventListener("touchstart", onFirstAction, { once: true });
      document.addEventListener("scroll", onFirstAction, { once: true });
      document.addEventListener("keydown", onFirstAction, { once: true });
    });
  }
}

window.addEventListener("DOMContentLoaded", initSmartAutoplay);
window.addEventListener("load", initSmartAutoplay);

// Timeupdate & Lyrics Sync
let currentActiveLyricIndex = -1;

if (spAudio) {
  spAudio.addEventListener("timeupdate", () => {
    const cur = spAudio.currentTime;
    const dur = spAudio.duration || 184;

    // Update Progress
    if (spSeekProgress) {
      spSeekProgress.style.width = `${(cur / dur) * 100}%`;
    }
    if (spTimeCurrent) spTimeCurrent.textContent = formatTime(cur);

    // Sync Lyrics
    let activeIdx = -1;
    for (let i = 0; i < spotifyLyrics.length; i++) {
      if (cur >= spotifyLyrics[i].time) {
        activeIdx = i;
      } else {
        break;
      }
    }

    if (activeIdx !== currentActiveLyricIndex && activeIdx !== -1) {
      currentActiveLyricIndex = activeIdx;
      const allItems = spLyricsContainer ? spLyricsContainer.querySelectorAll(".sp-lyric-item") : [];
      allItems.forEach((el, idx) => {
        if (idx === activeIdx) {
          el.classList.add("active-lyric");
          // Center the active line smoothly
          const containerHeight = spLyricsContainer.clientHeight;
          const targetTop = el.offsetTop - spLyricsContainer.offsetTop - (containerHeight / 2) + (el.clientHeight / 2);
          spLyricsContainer.scrollTo({
            top: targetTop,
            behavior: "smooth"
          });
        } else {
          el.classList.remove("active-lyric");
        }
      });
    }
  });

  spAudio.addEventListener("loadedmetadata", () => {
    if (spTimeTotal) spTimeTotal.textContent = formatTime(spAudio.duration);
  });

  spAudio.addEventListener("ended", () => {
    if (spPlayIcon) spPlayIcon.className = "fa-solid fa-play";
    if (spStatusBadge) spStatusBadge.textContent = "READY TO PLAY";
  });
}

// Scrubber Click
if (spSeekRail) {
  spSeekRail.addEventListener("click", (e) => {
    if (!spAudio || isNaN(spAudio.duration)) return;
    const rect = spSeekRail.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, clickX / rect.width));
    spAudio.currentTime = pct * spAudio.duration;
  });
}

// Controls: Prev / Next / Shuffle / Repeat
if (spBtnPrev) {
  spBtnPrev.addEventListener("click", () => {
    if (spAudio) {
      spAudio.currentTime = 0;
      playSpotifyAudio();
    }
  });
}

if (spBtnNext) {
  spBtnNext.addEventListener("click", () => {
    if (spAudio) {
      spAudio.currentTime = Math.min((spAudio.duration || 184) - 2, spAudio.currentTime + 15);
    }
  });
}

if (spBtnShuffle) {
  spBtnShuffle.addEventListener("click", () => {
    spBtnShuffle.classList.toggle("active");
  });
}

if (spBtnRepeat) {
  spBtnRepeat.addEventListener("click", () => {
    if (spAudio) {
      spAudio.loop = !spAudio.loop;
      spBtnRepeat.classList.toggle("active", spAudio.loop);
    }
  });
}

// Heart / Liked button toggle
if (spHeartBtn) {
  spHeartBtn.addEventListener("click", () => {
    spHeartBtn.classList.toggle("active");
    spHeartBtn.style.transform = "scale(1.3)";
    setTimeout(() => {
      spHeartBtn.style.transform = "scale(1)";
    }, 200);
  });
}

// Volume Controls
if (spVolSlider) {
  spVolSlider.addEventListener("input", (e) => {
    const val = parseFloat(e.target.value);
    if (spAudio) spAudio.volume = val;
    updateVolIcon(val);
  });
}

let lastVolume = 0.85;
function updateVolIcon(val) {
  if (!spVolIcon) return;
  if (val === 0) {
    spVolIcon.className = "fa-solid fa-volume-xmark";
  } else if (val < 0.5) {
    spVolIcon.className = "fa-solid fa-volume-low";
  } else {
    spVolIcon.className = "fa-solid fa-volume-high";
  }
}

if (spVolMuteBtn) {
  spVolMuteBtn.addEventListener("click", () => {
    if (!spAudio) return;
    if (spAudio.volume > 0) {
      lastVolume = spAudio.volume;
      spAudio.volume = 0;
      if (spVolSlider) spVolSlider.value = 0;
      updateVolIcon(0);
    } else {
      spAudio.volume = lastVolume || 0.85;
      if (spVolSlider) spVolSlider.value = spAudio.volume;
      updateVolIcon(spAudio.volume);
    }
  });
}

// 5. DIRECT WHATSAPP MESSENGER
document.querySelectorAll(".template-chip").forEach(chip => {
  chip.addEventListener("click", () => {
    const textarea = document.getElementById("waReplyText");
    if (textarea) {
      textarea.value = chip.textContent;
      textarea.focus();
    }
  });
});

const btnSendWaMessage = document.getElementById("btnSendWaMessage");
if (btnSendWaMessage) {
  btnSendWaMessage.addEventListener("click", () => {
    const textVal = document.getElementById("waReplyText").value.trim() || "Terima kasih banyak ya sayang buat web portofolio cerita kita, aku bahagia banget bersamamu 💖";
    let phone = currentConfig.whatsappNumber || "6289527243318";
    phone = phone.replace(/[^0-9]/g, "");
    if (phone.startsWith("08")) {
      phone = "628" + phone.slice(2);
    }
    const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(textVal)}`;
    window.open(waUrl, "_blank");
  });
}

// 6. SETTINGS MODAL & FORM LOGIC
const settingsModal = document.getElementById("settingsModal");
const btnOpenSettings = document.getElementById("btnOpenSettings");
const btnCloseSettings = document.getElementById("btnCloseSettings");
const settingsForm = document.getElementById("settingsForm");
const btnResetSettings = document.getElementById("btnResetSettings");

if (btnOpenSettings) {
  btnOpenSettings.onclick = () => {
    const maleInput = document.getElementById("cfgMaleName");
    if (maleInput) maleInput.value = currentConfig.maleName || "xRed";
    const malePhotoInput = document.getElementById("cfgMalePhoto");
    if (malePhotoInput) malePhotoInput.value = currentConfig.malePhoto || "xred.jpg";
    document.getElementById("cfgName").value = currentConfig.name || "Zakiya";
    document.getElementById("cfgPhoto").value = currentConfig.photo || "zakiya.jpg";
    document.getElementById("cfgPhone").value = currentConfig.whatsappNumber || "089527243318";
    document.getElementById("cfgDate").value = currentConfig.anniversaryDate.split("T")[0];
    document.getElementById("cfgLetter").value = currentConfig.letter;
    settingsModal.classList.add("active");
  };
}

if (btnCloseSettings) {
  btnCloseSettings.onclick = () => settingsModal.classList.remove("active");
}

if (settingsModal) {
  settingsModal.querySelector(".settings-backdrop").onclick = () => settingsModal.classList.remove("active");
}

if (settingsForm) {
  settingsForm.onsubmit = (e) => {
    e.preventDefault();
    const maleInput = document.getElementById("cfgMaleName");
    const maleName = maleInput ? maleInput.value.trim() : (currentConfig.maleName || "xRed");
    const malePhotoInput = document.getElementById("cfgMalePhoto");
    const malePhoto = malePhotoInput ? malePhotoInput.value.trim() : (currentConfig.malePhoto || "xred.jpg");
    const name = document.getElementById("cfgName").value.trim() || currentConfig.name || "Zakiya";
    const photo = document.getElementById("cfgPhoto").value.trim() || currentConfig.photo || "zakiya.jpg";
    const phone = document.getElementById("cfgPhone").value.trim() || currentConfig.whatsappNumber;
    const date = document.getElementById("cfgDate").value;
    const letter = document.getElementById("cfgLetter").value.trim() || currentConfig.letter;

    saveConfig({
      ...currentConfig,
      name: name,
      maleName: maleName,
      photo: photo,
      malePhoto: malePhoto,
      whatsappNumber: phone,
      anniversaryDate: date ? date + "T00:00:00" : currentConfig.anniversaryDate,
      letter: letter
    });

    settingsModal.classList.remove("active");
  };
}

if (btnResetSettings) {
  btnResetSettings.onclick = () => {
    if (confirm("Kembalikan data ke awal (xRed & Zakiya)?")) {
      localStorage.removeItem("our_everlasting_story_v2");
      currentConfig = defaultStoryConfig;
      applyConfigToUI();
      settingsModal.classList.remove("active");
    }
  };
}

// 8. APPLY CONFIG TO DOM
function applyConfigToUI() {
  const brandName = document.getElementById("navBrandName");
  if (brandName) brandName.textContent = `${currentConfig.maleName || 'xRed'} & ${currentConfig.name || 'Zakiya'}`;

  const maleNameEl = document.getElementById("profileMaleName");
  if (maleNameEl) maleNameEl.textContent = currentConfig.maleName || "xRed";

  const femaleName = document.getElementById("profileFemaleName");
  if (femaleName) femaleName.textContent = currentConfig.name || "Zakiya";

  const letterRecipient = document.getElementById("letterPartnerRecipient");
  if (letterRecipient) letterRecipient.textContent = currentConfig.name || "Zakiya";

  const letterSender = document.getElementById("letterSenderSign");
  if (letterSender) letterSender.textContent = `- ${currentConfig.maleName || 'xRed'}`;

  const footerPartner = document.getElementById("footerPartnerName");
  if (footerPartner) footerPartner.textContent = currentConfig.name || "Zakiya";

  const spPlaylistEl = document.getElementById("spPlaylistPartner");
  if (spPlaylistEl) spPlaylistEl.textContent = `${currentConfig.maleName || 'xRed'} & ${currentConfig.name || 'Zakiya'} Forever`;

  // Apply male photo
  const profileMaleImg = document.getElementById("profileMaleImg");
  if (profileMaleImg) {
    let src = currentConfig.malePhoto || "xred.jpg";
    if (src === "xred.jpg") src = "xred.jpg?v=2";
    profileMaleImg.src = src;
  }

  // Apply female photo
  document.querySelectorAll(".person-photo-src").forEach(img => {
    let src = currentConfig.photo || "zakiya.jpg";
    if (src === "zakiya.jpg") src = "zakiya.jpg?v=2";
    img.src = src;
  });

  // Apply letter prose
  const letterEl = document.getElementById("letterMainText");
  if (letterEl) letterEl.textContent = currentConfig.letter;

  // Display WhatsApp Target Phone
  const displayPhone = document.getElementById("displayTargetPhone");
  if (displayPhone) {
    let p = currentConfig.whatsappNumber || "089527243318";
    if (p.startsWith("62")) p = "0" + p.slice(2);
    displayPhone.textContent = p.replace(/(\d{4})(\d{4})(\d{4})/, "$1-$2-$3");
  }

  updateRelationshipCounter();
}

// Initial Call
applyConfigToUI();
