/**
 * 流动渐变球体背景动画
 * 根据当前主题自动调整球体亮度
 */
(function () {
  'use strict';

  var canvas = document.getElementById('bgCanvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');

  var W, H;
  var orbs = [];
  var mouse = { x: -1000, y: -1000 };
  var raf;
  var alphaMultiplier = 1;
  var isRunning = false;
  var targetFps = 30;
  var frameInterval = 1000 / targetFps;
  var lastFrameTime = 0;

  var ORB_CONFIGS = [
    { r: 280, color: [99, 102, 241],  baseAlpha: .18 },
    { r: 240, color: [168, 85, 247],  baseAlpha: .15 },
    { r: 220, color: [236, 72, 153],  baseAlpha: .12 },
    { r: 200, color: [59, 130, 246],  baseAlpha: .14 },
    { r: 180, color: [20, 184, 166],  baseAlpha: .10 },
    { r: 160, color: [245, 158, 11],  baseAlpha: .08 },
  ];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function Orb(cfg) {
    this.baseR = cfg.r * (0.6 + Math.random() * 0.5);
    this.r = this.baseR;
    this.color = cfg.color;
    this.baseAlpha = cfg.baseAlpha;
    this.alpha = this.baseAlpha * alphaMultiplier;
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.3;
    this.phase = Math.random() * Math.PI * 2;
    this.speed = 0.003 + Math.random() * 0.005;
  }

  Orb.prototype.update = function () {
    this.phase += this.speed;
    this.x += this.vx + Math.sin(this.phase) * 0.3;
    this.y += this.vy + Math.cos(this.phase * 0.7) * 0.2;
    this.r = this.baseR + Math.sin(this.phase * 1.5) * 20;

    var targetAlpha = this.baseAlpha * alphaMultiplier;
    this.alpha += (targetAlpha - this.alpha) * 0.02;

    var dx = this.x - mouse.x;
    var dy = this.y - mouse.y;
    var dist = Math.sqrt(dx * dx + dy * dy);
    if (dist > 0 && dist < 300) {
      var force = (300 - dist) / 300 * 0.8;
      this.x += dx / dist * force;
      this.y += dy / dist * force;
    }

    var pad = this.r;
    if (this.x < -pad) this.x = W + pad;
    if (this.x > W + pad) this.x = -pad;
    if (this.y < -pad) this.y = H + pad;
    if (this.y > H + pad) this.y = -pad;
  };

  Orb.prototype.draw = function () {
    var gradient = ctx.createRadialGradient(
      this.x, this.y, 0,
      this.x, this.y, this.r
    );
    var c = this.color;
    gradient.addColorStop(0, 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + this.alpha + ')');
    gradient.addColorStop(0.5, 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + (this.alpha * 0.4) + ')');
    gradient.addColorStop(1, 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',0)');

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
  };

  function initOrbs() {
    orbs = [];
    var configs = window.innerWidth < 768 ? ORB_CONFIGS.slice(0, 3) : ORB_CONFIGS.slice(0, 4);
    configs.forEach(function (cfg) {
      orbs.push(new Orb(cfg));
    });
  }

  function animate(now) {
    if (!isRunning) return;
    if (now - lastFrameTime < frameInterval) {
      raf = requestAnimationFrame(animate);
      return;
    }
    lastFrameTime = now;

    ctx.clearRect(0, 0, W, H);
    for (var i = 0; i < orbs.length; i++) {
      orbs[i].update();
      orbs[i].draw();
    }
    raf = requestAnimationFrame(animate);
  }

  function updateTheme() {
    var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    alphaMultiplier = isDark ? 1 : 0.45;
  }

  function startAnimation() {
    if (isRunning) return;
    isRunning = true;
    lastFrameTime = 0;
    raf = requestAnimationFrame(animate);
  }

  function stopAnimation() {
    isRunning = false;
    if (raf) {
      cancelAnimationFrame(raf);
      raf = null;
    }
  }

  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', function (e) { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
  window.addEventListener('mouseleave', function () { mouse.x = -1000; mouse.y = -1000; });
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      stopAnimation();
    } else {
      startAnimation();
    }
  });

  // Listen for theme changes
  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (m) {
      if (m.attributeName === 'data-theme') updateTheme();
    });
  });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  function start() {
    resize();
    updateTheme();
    initOrbs();
    startAnimation();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
