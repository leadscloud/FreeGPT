/**
 * FreeGPT 地址发布页 — 交互逻辑
 * 依赖 config.js 中的 SITE_CONFIG
 */
(function () {
  'use strict';

  const C = SITE_CONFIG;

  // --- SVG 图标 ---
  const ICONS = {
    arrow: '<svg class="arrow-icon" width="16" height="16" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd"/></svg>',
    download: '<svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a1 1 0 011 1v8.586l2.293-2.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L9 11.586V3a1 1 0 011-1z"/><path d="M3 15a1 1 0 011 1v1h12v-1a1 1 0 112 0v1a2 2 0 01-2 2H4a2 2 0 01-2-2v-1a1 1 0 011-1z"/></svg>',
    windows: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 5.548l7.065-.966v6.822H3V5.548zm0 12.904l7.065.966v-6.822H3v5.856zm7.935 1.083L21 21V12.6H10.935v6.935zM10.935 4.465V11.4H21V3l-10.065 1.465z"/></svg>',
    apple: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>',
    linux: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.368 1.884 1.43.868.065 1.544-.387 1.87-1.2.088-.277.14-.426.225-.734.096-.202.236-.379.37-.559.142-.189.271-.381.338-.613.133-.39.06-.838-.122-1.057-.237-.254-.468-.483-.833-.6-.012-.168-.101-.337-.241-.51-.149-.18-.303-.341-.446-.543-.232-.44-.088-.94.26-1.328.127-.142.263-.271.368-.413.204-.234.352-.486.352-.851v-.009c.002-.236-.082-.558-.26-.876-.177-.325-.427-.627-.647-.856-1.023-1.095-2.064-2.853-1.381-5.449.142-.546.227-1.142.168-1.725-.126-1.385-.796-2.465-1.704-3.194C15.007.547 13.783.043 12.504 0z"/></svg>',
    coupon: '<svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor"><path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 100 4v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2a2 2 0 100-4V6z"/></svg>',
  };

  // --- 初始化 ---
  function init() {
    initTheme();
    renderDescription();
    renderAnnouncement();
    renderActiveDomains();
    renderProxyDomains();
    renderBlockedDomains();
    renderDownloads();
    renderFooterLinks();
    bindEvents();
    testLatency();
  }

  // --- 主题切换 ---
  function initTheme() {
    var saved = localStorage.getItem('theme');
    if (saved) {
      applyTheme(saved);
    } else {
      var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      applyTheme(prefersDark ? 'dark' : 'light');
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
      if (!localStorage.getItem('theme')) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }

  function toggleTheme() {
    var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    var next = isDark ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('theme', next);
  }

  // --- 描述 ---
  function renderDescription() {
    setText('siteDescription', C.siteDescription);
  }

  // --- 公告 ---
  function renderAnnouncement() {
    if (!C.announcement) return;
    var el = document.getElementById('announcement');
    el.hidden = false;
    let renderedText = C.announcement;
    if (C.announcement.includes('QQ群')) {
      renderedText = C.announcement.replace('QQ群', '<a href="' + C.qqGroupUrl + '" target="_blank" rel="noopener">QQ群</a>');
    }
    setHtml('announcementText', renderedText);
  }

  // --- 可用域名 ---
  function renderActiveDomains() {
    var list = document.getElementById('activeDomainList');
    setText('activeCount', C.activeDomains.length + ' 个可用');

    C.activeDomains.forEach(function (d, i) {
      var card = document.createElement('a');
      card.className = 'domain-card';
      card.href = 'https://' + d.url;
      card.target = '_blank';
      card.rel = 'noopener';
      card.style.animationDelay = (i * 0.06) + 's';
      card.setAttribute('data-url', d.url);

      var couponHtml = d.coupon ? (
        '<div class="domain-coupon-wrap">' +
          '<span class="coupon-desc">凭此兑换码可免费体验订阅权限一天</span>' +
          '<button class="domain-coupon-btn" data-coupon="' + escapeHtml(d.coupon) + '" title="点击复制兑换码">' +
            ICONS.coupon +
            '<span class="coupon-code">' + escapeHtml(d.coupon) + '</span>' +
            '<span class="coupon-hint">点击复制</span>' +
          '</button>' +
        '</div>'
      ) : '';

      card.innerHTML =
        '<div class="domain-card-left">' +
          '<span class="domain-status active"></span>' +
          '<div>' +
            '<div class="domain-url">' + escapeHtml(d.url) + '</div>' +
            '<div class="domain-label">' + escapeHtml(d.label + (d.note ? ' · ' + d.note : '')) + '</div>' +
            couponHtml +
          '</div>' +
        '</div>' +
        (d.special && d.special.length > 0 ? (
          '<div class="domain-card-special">' + d.special + '</div>'
        ) : '') +
        '<div class="domain-card-right">' +
          '<span class="latency testing" data-latency="' + escapeHtml(d.url) + '">检测中…</span>' +
          ICONS.arrow +
        '</div>';

      list.appendChild(card);
    });
  }

  // --- 需代理域名 ---
  function renderProxyDomains() {
    if (!C.proxyDomains || C.proxyDomains.length === 0) {
      document.getElementById('proxySection').style.display = 'none';
      return;
    }
    var list = document.getElementById('proxyDomainList');
    C.proxyDomains.forEach(function (d, i) {
      var card = document.createElement('a');
      card.className = 'domain-card';
      card.href = 'https://' + d.url;
      card.target = '_blank';
      card.rel = 'noopener';
      card.style.animationDelay = (i * 0.06) + 's';

      var couponHtml = d.coupon ? (
        '<div class="domain-coupon-wrap">' +
          '<span class="coupon-desc">凭此兑换码可免费体验订阅权限一天</span>' +
          '<button class="domain-coupon-btn" data-coupon="' + escapeHtml(d.coupon) + '" title="点击复制兑换码">' +
            ICONS.coupon +
            '<span class="coupon-code">' + escapeHtml(d.coupon) + '</span>' +
            '<span class="coupon-hint">点击复制</span>' +
          '</button>' +
        '</div>'
      ) : '';

      card.innerHTML =
        '<div class="domain-card-left">' +
          '<span class="domain-status proxy"></span>' +
          '<div>' +
            '<div class="domain-url">' + escapeHtml(d.url) + '</div>' +
            '<div class="domain-label">' + escapeHtml(d.note || '') + '</div>' +
            couponHtml +
          '</div>' +
        '</div>' +
        '<div class="domain-card-right">' +
          '<span class="latency" style="background:var(--c-proxy-bg);color:var(--c-proxy-text);">需代理</span>' +
          ICONS.arrow +
        '</div>';

      list.appendChild(card);
    });
  }

  // --- 已封锁域名 ---
  function renderBlockedDomains() {
    var list = document.getElementById('blockedDomainList');
    setText('blockedCount', C.blockedDomains.length + ' 个已封');

    C.blockedDomains.forEach(function (d, i) {
      var item = document.createElement('div');
      item.className = 'blocked-item';
      item.style.animationDelay = (i * 0.05) + 's';
      item.innerHTML =
        '<span class="blocked-item-url"><a href="https://' + d.url + '" target="_blank" rel="noopener">' + escapeHtml(d.url) + '</a></span>' +
        '<span class="blocked-item-date">封锁于 ' + escapeHtml(d.blockedDate) + '</span>';
      list.appendChild(item);
    });
  }

  // --- 下载 ---
  function renderDownloads() {
    var grid = document.getElementById('downloadGrid');
    var ver = C.clientVersion;
    setText('versionTag', 'v' + ver);

    C.downloads.forEach(function (platform, pi) {
      var card = document.createElement('div');
      card.className = 'download-card';
      card.style.animationDelay = (pi * 0.08) + 's';

      var iconSvg = ICONS[platform.icon] || '';
      var btns = '';
      platform.items.forEach(function (item) {
        var filename = item.filename.replace(/\{v\}/g, ver);
        var officialUrl = C.releaseUrl + '/download/v' + ver + '/' + filename;
        var accelerateUrl1 = officialUrl.replace('https://github.com', 'https://cdn.gh-proxy.com/https://github.com');
        var accelerateUrl2 = officialUrl.replace('https://github.com', 'https://hk.gh-proxy.com/https://github.com');

        btns +=
          '<div class="download-link-group">' +
            '<div class="download-link-title">' + escapeHtml(item.label) + '</div>' +
            '<a class="download-btn" href="' + officialUrl + '" target="_blank" rel="noopener">' +
              ICONS.download + ' 官方下载' +
            '</a>' +
            '<div class="download-accelerated">' +
              '<a class="download-btn download-btn-accelerated" href="' + accelerateUrl1 + '" target="_blank" rel="noopener">' +
                ICONS.download + ' 加速下载 1' +
              '</a>' +
              '<a class="download-btn download-btn-accelerated" href="' + accelerateUrl2 + '" target="_blank" rel="noopener">' +
                ICONS.download + ' 加速下载 2' +
              '</a>' +
            '</div>' +
          '</div>';
      });

      card.innerHTML =
        '<div class="download-platform-icon">' + iconSvg + '</div>' +
        '<div class="download-platform-name">' + escapeHtml(platform.platform) + '</div>' +
        '<div class="download-links">' + btns + '</div>';

      grid.appendChild(card);
    });
  }

  // --- Footer ---
  function renderFooterLinks() {
    var qqLink = document.getElementById('qqGroupLink');
    var ghLink = document.getElementById('githubLink');
    if (qqLink) qqLink.href = C.qqGroupUrl;
    if (ghLink) ghLink.href = C.githubRepo;
  }

  // --- Events ---
  function bindEvents() {
    var closeBtn = document.getElementById('announcementClose');
    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        document.getElementById('announcement').hidden = true;
      });
    }

    var themeBtn = document.getElementById('themeToggle');
    if (themeBtn) {
      themeBtn.addEventListener('click', toggleTheme);
    }

    // 兑换码点击复制（事件委托，防止触发卡片跳转）
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('.domain-coupon-btn');
      if (!btn) return;
      e.preventDefault();
      e.stopPropagation();

      var code = btn.getAttribute('data-coupon');
      var hint = btn.querySelector('.coupon-hint');

      function showFeedback(success) {
        if (!hint) return;
        btn.classList.add(success ? 'copied' : 'copy-fail');
        hint.textContent = success ? '已复制!' : '复制失败';
        setTimeout(function () {
          btn.classList.remove('copied', 'copy-fail');
          hint.textContent = '点击复制';
        }, 2000);
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(code).then(
          function () { showFeedback(true); },
          function () { showFeedback(false); }
        );
      } else {
        // 兼容旧浏览器
        try {
          var ta = document.createElement('textarea');
          ta.value = code;
          ta.style.position = 'fixed';
          ta.style.opacity = '0';
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
          showFeedback(true);
        } catch (err) {
          showFeedback(false);
        }
      }
    });
  }

  // --- 延迟检测 ---
  function testLatency() {
    C.activeDomains.forEach(function (d) {
      pingDomain(d.url);
    });
  }

  function pingDomain(domain) {
    var el = document.querySelector('[data-latency="' + domain + '"]');
    if (!el) return;

    var start = Date.now();
    var img = new Image();
    var timeout = setTimeout(function () {
      img.src = '';
      el.textContent = '超时';
      el.className = 'latency error';
    }, 8000);

    img.onload = img.onerror = function () {
      clearTimeout(timeout);
      var ms = Date.now() - start;
      el.textContent = ms + ' ms';
      if (ms < 300) {
        el.className = 'latency fast';
      } else if (ms < 800) {
        el.className = 'latency medium';
      } else {
        el.className = 'latency slow';
      }
    };

    img.src = 'https://' + domain + '/favicon.ico?_t=' + start;
  }

  // --- Helpers ---
  function setText(id, text) {
    var el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  function setHtml(id, html) {
    var el = document.getElementById(id);
    if (el) el.innerHTML = html;
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  // --- 启动 ---
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
