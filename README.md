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
const SitemapGenerator = require('laravel-mix-sitemap'); // パッケージをインポート

const BASE_URL = 'https://example.com'; // あなたのベースURLを設定

mix.after(async () => {
  const generator = new SitemapGenerator();
  generator.register({
    baseUrl: BASE_URL,
    distDir: 'dist', // サイトマップを生成するディレクトリを指定
    defaultChangefreq: 'daily', // 更新頻度
    defaultPriority: 0.5, // 優先度
  });
  generator.webpackDone();
});
```

これにより、ビルド後に指定したディレクトリ（dist）に sitemap.xml が生成されます。

### 例
サンプルプロジェクトとして example フォルダを用意しています。example ディレクトリ内で以下のコマンドを実行することで、簡単に動作確認が可能です。

#### 1. 例の実行

```bash
npm run test-example
```


このコマンドを実行すると、example/dist/sitemap.xml にサイトマップが生成されます。

## オプション
register() メソッドに渡すオプションは以下の通りです。

- baseUrl (string): サイトマップのベースとなるURL。必須項目です。
- distDir (string): サイトマップの出力先ディレクトリ。デフォルトは dist です。
- defaultChangefreq (string): 各ページの更新頻度。デフォルトは weekly です。
- defaultPriority (number): 各ページの優先度。デフォルトは 0.8 です。