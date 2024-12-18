# Laravel Mix Sitemap

`laravel-mix-sitemap` は、Laravel Mix を使ったビルドプロセスにおいて、サイトマップを自動生成するための拡張機能です。

## インストール

### 1. npm でパッケージをインストール

```bash
npm install laravel-mix-sitemap --save-dev
```

## 使い方
webpack.mix.js に以下の設定を追加して、サイトマップを生成します。

```javascript
let mix = require('laravel-mix');
require('laravel-mix-sitemap'); // 拡張機能を読み込む

const BASE_URL = 'https://example.com'; // あなたのベースURLを設定
const distPath = 'dist'; // サイトマップの出力先ディレクトリ

mix.sitemap({
  baseUrl: BASE_URL, // サイトのベースURL
  distDir: distPath, // サイトマップを生成するディレクトリ
  defaultChangefreq: 'daily', // 各ページの更新頻度
  defaultPriority: 0.5, // 各ページの優先度
});
```

これにより、ビルド後に指定したディレクトリ（例：dist）に sitemap.xml が生成されます。

## オプション
register() メソッドに渡すオプションは以下の通りです。

- baseUrl (string): サイトマップのベースとなるURL。必須項目です。
- distDir (string): サイトマップの出力先ディレクトリ。デフォルトは dist です。
- defaultChangefreq (string): 各ページの更新頻度。デフォルトは weekly です。
- defaultPriority (number): 各ページの優先度。デフォルトは 0.8 です。