/**
 * 站点配置文件
 * 更新域名或下载链接时，只需修改此文件即可。
 */
const SITE_CONFIG = {
  siteName: '免费ChatGPT',
  siteDescription: '免费使用 GPT-5.6-luna、Grok-4.5、DeepSeek、文心一言等众多 AI 模型',
  mainDomain: 'freegpt.tech',
  qqGroupUrl: 'https://qm.qq.com/q/emLOhFElj2',
  githubRepo: 'https://github.com/leadscloud/FreeGPT',
  releaseUrl: 'https://github.com/leadscloud/FreeGPT/releases',
  publishPageUrl: 'https://site.tinycms.xyz',

  // 当前可用域名列表
  // coupon: 填写兑换码后，卡片上会显示可点击复制的兑换码按钮；留空或不填则不显示
  activeDomains: [
    { url: 'standalone.freegpt.win:3001', label: '国内线路', note: '仅国内网络可连接', special: '独立的网站,速度快（仅国内可访问）', coupon: '' },
    { url: 'gov.freegpt.win', label: '国际线路 1', note: '', special: '', coupon: '' },
    { url: 'chata.freegpt.win', label: '国际线路 2', note: '', special: '', coupon: '' },
    // { url: 'chat.freegpt.pl', label: '旧站点备份', note: '不建议使用，请尽快切换新版本', special: '旧站点备份，需要梯子', coupon: '' },
    // { url: 'vip.freegpt.win', label: '国际线路 3', note: '部分地区无法访问', special: '', coupon: '' },
    // { url: 'chat2.freegpt.win', label: '国际线路 4', note: '部分地区无法访问', special: '', coupon: '' },
  ],

  // 已被封锁的域名
  blockedDomains: [
    { url: 'vip.freegpt.win', blockedDate: '2026-4' },
    { url: 'chat2.freegpt.win', blockedDate: '2026-4' },
    { url: 'chat.leadscloud.xyz', blockedDate: '2026-3' },
    { url: 'freegpt.be', blockedDate: '2025-12' },
    { url: 'chat.freegpt.win', blockedDate: '2025-11' },
    { url: 'freegpt.co.za', blockedDate: '2025-10' },
    { url: 'freegpt.pl', blockedDate: '2025-08' },
    { url: 'freegpt.es', blockedDate: '2025-06' },
  ],

  // 需要代理才能访问的域名
  proxyDomains: [
    { url: 'freegpt.tech', note: '主域名，需代理访问', coupon: '' },
  ],

  // 客户端下载 — 版本号在此统一管理
  clientVersion: '2.16.1',
  downloads: [
    {
      platform: 'Windows',
      icon: 'windows',
      items: [
        { label: '安装包 (.exe)', filename: 'FreeGPT_{v}_x64-setup.exe' },
      ],
    },
    {
      platform: 'macOS',
      icon: 'apple',
      items: [
        { label: '通用版 (.dmg)', filename: 'FreeGPT_{v}_universal.dmg' },
      ],
    },
    {
      platform: 'Linux',
      icon: 'linux',
      items: [
        { label: 'Debian/Ubuntu (.deb)', filename: 'FreeGPT_{v}_amd64.deb' },
        { label: 'AppImage', filename: 'FreeGPT_{v}_amd64.AppImage' },
      ],
    },
  ],

  // 公告信息（为空则不显示）
  announcement: '从2025年6月起，每隔2月就有域名在国内被阻断，请收藏本页或加入QQ群防止失联！',
};
