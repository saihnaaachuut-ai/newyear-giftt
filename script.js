// ===== Countdown to New Year =====
function updateCountdown(){
  const now = new Date();
  const target = new Date(now.getFullYear() + 1, 0, 1); // next Jan 1
  const diff = target - now;

  const days  = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins  = Math.floor((diff / (1000 * 60)) % 60);
  const secs  = Math.floor((diff / 1000) % 60);

  document.getElementById("days").textContent  = String(days).padStart(2,"0");
  document.getElementById("hours").textContent = String(hours).padStart(2,"0");
  document.getElementById("mins").textContent  = String(mins).padStart(2,"0");
  document.getElementById("secs").textContent  = String(secs).padStart(2,"0");
}
setInterval(updateCountdown, 1000);
updateCountdown();


// ===== Snow Effect =====
const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");
let W, H;

function resize(){
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

const flakes = Array.from({length: 120}).map(()=>({
  x: Math.random() * W,
  y: Math.random() * H,
  r: Math.random() * 2.2 + 0.6,
  s: Math.random() * 1.6 + 0.35,
  a: Math.random() * Math.PI * 2
}));

function snow(){
  ctx.clearRect(0,0,W,H);
  ctx.globalAlpha = 0.85;

  for(const f of flakes){
    ctx.beginPath();
    ctx.arc(f.x, f.y, f.r, 0, Math.PI*2);
    ctx.fillStyle = "white";
    ctx.fill();

    f.y += f.s;
    f.x += Math.sin(f.a) * 0.5;
    f.a += 0.01;

    if(f.y > H + 10){
      f.y = -10;
      f.x = Math.random() * W;
    }
  }
  requestAnimationFrame(snow);
}
snow();


// ===== Modal Helpers =====
const openModal = (id) => document.getElementById(id).classList.add("show");
const closeModal = (id) => document.getElementById(id).classList.remove("show");

// Secret modal
document.getElementById("openSecret").addEventListener("click", () => openModal("modal"));
document.getElementById("closeModal").addEventListener("click", () => closeModal("modal"));
document.getElementById("modal").addEventListener("click", (e) => {
  if(e.target.id === "modal") closeModal("modal");
});

// Gift popup modal
document.getElementById("openGiftPopup").addEventListener("click", (e) => {
  openModal("giftPopup");
  sparkle(e.clientX, e.clientY);
  randomGiftText();
});
document.getElementById("closeGiftPopup").addEventListener("click", () => closeModal("giftPopup"));
document.getElementById("giftPopup").addEventListener("click", (e) => {
  if(e.target.id === "giftPopup") closeModal("giftPopup");
});
document.getElementById("newGiftText").addEventListener("click", (e) => {
  sparkle(e.clientX, e.clientY);
  randomGiftText();
});


// ===== Random Gift Messages =====
const giftMessages = [
  "🎆 Чиний хичээл зүтгэл заавал үр дүнгээ өгнө шүү за💙",
  "❄️ Хол байсан ч дулаан бодол үргэлж ойрхон байдаг шүү 🌙",
  "🎁 2026 ондоо алаад өгье за ✨",
  "💗 Өөртөө итгээрэй. Чи бодсоноосоо хүчтэй хүн шүү😊"
];

function randomGiftText(){
  const el = document.getElementById("giftText");
  el.innerHTML = giftMessages[Math.floor(Math.random()*giftMessages.length)]
    .replaceAll("\n","<br>");
}


// ===== Sparkle effect =====
function sparkle(x, y){
  const bursts = 22;
  for(let i=0;i<bursts;i++){
    const el = document.createElement("div");
    el.className = "spark";
    el.style.left = x + "px";
    el.style.top  = y + "px";
    el.style.setProperty("--dx", (Math.random()*280 - 140) + "px");
    el.style.setProperty("--dy", (Math.random()*280 - 170) + "px");
    document.body.appendChild(el);
    setTimeout(()=> el.remove(), 900);
  }
}


// ===== Celebration Button (Fireworks) =====
document.getElementById("fireworks").addEventListener("click", () => {
  const x = window.innerWidth / 2;
  const y = window.innerHeight / 2;
  sparkle(x, y);
  sparkle(x - 150, y + 30);
  sparkle(x + 150, y + 30);
});
