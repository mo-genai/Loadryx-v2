const root = document.getElementById('root');

const navItems = ['HOME', 'FEATURES', 'ROADMAP', 'ABOUT', 'CONTACT'];
const features = [
  ['PRECISION', 'Built for accuracy\nin every detail.'],
  ['PERFORMANCE', 'Optimized for speed\nand stability.'],
  ['RELIABILITY', 'Engineered for\nconsistent results.'],
  ['COMMUNITY', 'United by focus.\nDriven to win.'],
];

function render() {
  root.innerHTML = `
    <div class="app">
      <nav class="topnav">
        <a href="#home"><img class="logo" src="https://res.cloudinary.com/dmp1fo2j4/image/upload/v1779614344/LOADRYX_logo_transparent_4x_f01fwd.png" alt="LOADRYX" /></a>
        <div class="navlinks">${navItems.map((item, index) => `<button class="${index === 0 ? 'active' : ''}" data-tab="${item}">${item}</button>`).join('')}</div>
        <button class="launch" data-launch>LAUNCH APP</button>
        <button class="mobile" data-launch aria-label="Launch">☰</button>
      </nav>
      <div class="neonbar"></div>
      <main class="hero" id="home">
        <div class="media">
          <img class="bgimg" src="https://res.cloudinary.com/dmp1fo2j4/image/upload/v1779586221/IMG_5738234_ohn6zl.png" alt="" />
          <video class="bgvid" src="https://res.cloudinary.com/dmp1fo2j4/video/upload/v1779586226/IMG_5738234_iocpz3.mp4" autoplay muted loop playsinline></video>
          <div class="shade"></div><div class="grid"></div>
        </div>
        <canvas class="particles" id="particles"></canvas>
        <div class="hud"></div>
        <section class="content">
          <div class="kicker">LOADRYX RESPONSE SYSTEM</div>
          <h1 class="title"><span>LOADRYX</span><span class="blue">V2</span></h1>
          <p class="subtitle">Tuned for response. Built for focused players who need speed, control, and consistency under pressure.</p>
          <div class="actions"><button class="primary" data-launch>LAUNCH APP</button><button class="secondary" data-scroll="features">EXPLORE FEATURES</button></div>
          <div class="marker"><span>CONNECT_ID //</span><b>00:1A:2B:3C:4D:5E</b></div>
        </section>
        <section class="features" id="features">${features.map(([title, text]) => `<article class="feature"><h3>${title}</h3><p>${text}</p></article>`).join('')}</section>
      </main>
    </div>
  `;
  bindEvents();
  runParticles();
}

function bindEvents() {
  document.querySelectorAll('[data-scroll]').forEach((button) => {
    button.addEventListener('click', () => document.getElementById(button.dataset.scroll)?.scrollIntoView({ behavior: 'smooth' }));
  });
  document.querySelectorAll('[data-tab]').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelectorAll('[data-tab]').forEach((item) => item.classList.remove('active'));
      button.classList.add('active');
    });
  });
  document.querySelectorAll('[data-launch]').forEach((button) => button.addEventListener('click', openConsole));
}

function openConsole() {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="panel">
      <h3>SECURE UPLINK</h3>
      <p>Enter access passcode to establish interface link.</p>
      <div class="log" data-log>SEC_CORE_SYS: Initializing secure interface...<br>SEC_CORE_SYS: Access point established.</div>
      <form class="field"><input type="password" placeholder="PASSCODE" autofocus required /><button>AUTH</button></form>
      <button class="close" type="button">CLOSE</button>
    </div>
  `;
  document.body.appendChild(modal);
  const form = modal.querySelector('form');
  const input = modal.querySelector('input');
  const log = modal.querySelector('[data-log]');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = input.value.trim();
    if (value.toLowerCase() === 'admin' || value === '1337' || value.length >= 4) {
      log.innerHTML += '<br><span class="granted">SEC_CORE_SYS: ACCESS GRANTED. Interface connected.</span>';
    } else {
      log.innerHTML += '<br><span class="denied">ERROR: ACCESS DENIED.</span>';
    }
  });
  modal.querySelector('.close').addEventListener('click', () => modal.remove());
}

function runParticles() {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width = 0;
  let height = 0;
  let points = [];
  const mouse = { x: 0, y: 0, active: false };

  function resize() {
    const rect = canvas.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    const count = Math.max(40, Math.min(110, Math.floor(width * height / 24000)));
    points = Array.from({ length: count }, () => ({ x: Math.random() * width, y: Math.random() * height, vx: 0, vy: 0, r: Math.random() * 1.2 + 0.4 }));
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    points.forEach((point) => {
      if (mouse.active) {
        const dx = point.x - mouse.x;
        const dy = point.y - mouse.y;
        const distance = Math.hypot(dx, dy) || 1;
        if (distance < 160) {
          const power = (1 - distance / 160) * 0.16;
          point.vx += (dx / distance) * power;
          point.vy += (dy / distance) * power;
        }
      }
      point.vx *= 0.96;
      point.vy *= 0.96;
      point.x += point.vx;
      point.y += point.vy;
      if (point.x < 0 || point.x > width) point.vx *= -1;
      if (point.y < 0 || point.y > height) point.vy *= -1;
      ctx.beginPath();
      ctx.arc(point.x, point.y, point.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(3,131,244,.55)';
      ctx.shadowBlur = 8;
      ctx.shadowColor = 'rgba(3,131,244,.55)';
      ctx.fill();
    });
    ctx.shadowBlur = 0;
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', (event) => { mouse.x = event.clientX; mouse.y = event.clientY; mouse.active = true; }, { passive: true });
  window.addEventListener('mouseleave', () => { mouse.active = false; });
  resize();
  draw();
}

render();
