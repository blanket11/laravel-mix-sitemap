let mix = require('laravel-mix');
const SitemapGenerator = require('../index');

const BASE_URL = 'https://example.com';

// サイトマップの生成
mix.after(async () => {
  const generator = new SitemapGenerator();
  generator.register({
    baseUrl: BASE_URL,
    distDir: 'dist',
    defaultChangefreq: 'daily',
    defaultPriority: 0.5,
  });
  generator.webpackDone();
});
