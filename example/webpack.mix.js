let mix = require('laravel-mix');
require('../index');

const BASE_URL = 'https://example.com';

mix.sitemap({
  baseUrl: BASE_URL,
  distDir: 'dist',
  defaultChangefreq: 'daily',
  defaultPriority: 0.5,
});