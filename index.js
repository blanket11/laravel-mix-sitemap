const fs = require('fs');
const path = require('path');
let mix = require('laravel-mix');

/**
 * SitemapGenerator - サイトマップを生成するクラス
 */
class SitemapGenerator {
  /**
   * オプションの登録: 基本設定（baseUrl、出力先ディレクトリ、初期値など）
   * @param {Object} options - サイトマップ生成に必要なオプション
   */
  register(options = {}) {
    this.baseUrl = options.baseUrl || 'https://example.com'; // ベースURL
    this.distDir = path.resolve(process.cwd(), options.distDir || 'dist'); // 出力フォルダのパス
    this.defaultChangefreq = options.defaultChangefreq || 'weekly'; // 更新頻度の初期値
    this.defaultPriority = options.defaultPriority || 0.8; // 優先度の初期値
  }

  /**
   * サイトマップの生成を開始
   * - ディレクトリが存在するか確認し、存在すればサイトマップを生成
   */
  generate() {
    // 出力ディレクトリが存在しない場合はエラーメッセージを表示して終了
    if (!fs.existsSync(this.distDir)) {
      console.error(`Error: Directory ${this.distDir} does not exist.`);
      return;
    }

    // サイトマップ用のURLリストを取得
    const urls = this.getUrls(this.distDir);

    // URLリストからサイトマップを生成
    const sitemap = this.buildSitemap(urls);

    // sitemap.xml ファイルを書き込み
    fs.writeFileSync(path.join(this.distDir, 'sitemap.xml'), sitemap);
  }

  /**
   * 再帰的にディレクトリ内のPHPおよびHTMLファイルを探索し、URLリストを生成
   * @param {string} dir - 現在探索しているディレクトリのパス
   * @param {string} subPath - サブディレクトリのパス
   * @returns {string[]} - URLの配列
   */
  getUrls(dir, subPath = '') {
    const entries = fs.readdirSync(dir, { withFileTypes: true }); // ディレクトリ内のエントリを取得

    let urls = []; // URLを格納する配列
    for (const entry of entries) {
      const entryPath = path.join(dir, entry.name); // 各エントリのフルパス
      const relativePath = path.join(subPath, entry.name); // サブパス付きのパス

      if (entry.isDirectory()) {
        // ディレクトリなら再帰的に探索
        urls = urls.concat(this.getUrls(entryPath, relativePath));
      } else if (
        entry.isFile() &&
        (entry.name.endsWith('.php') || entry.name.endsWith('.html'))
      ) {
        // PHPまたはHTMLファイルならURLを生成
        let urlPath = `/${relativePath}`.replace(/\\/g, '/'); // パスを正規化

        // `index.php`または`index.html`ならディレクトリ形式に変換
        if (urlPath.endsWith('index.php') || urlPath.endsWith('index.html')) {
          urlPath = urlPath.replace(/\/index\.(php|html)$/, '/');
        }

        // URL情報を配列に追加
        urls.push(
          `<url><loc>${this.baseUrl}${urlPath}</loc><changefreq>${this.defaultChangefreq}</changefreq><priority>${this.defaultPriority}</priority></url>`
        );
      }
    }
    return urls; // URLの配列を返す
  }

  /**
   * サイトマップXMLを構築
   * @param {string[]} urls - URLの配列
   * @returns {string} - サイトマップXML文字列
   */
  buildSitemap(urls) {
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;
  }
}

// Laravel Mix用の拡張機能を作成
mix.extend('sitemap', new (class {
  /**
   * Laravel Mixの拡張機能としての初期設定
   * @param {Object} options - サイトマップ生成に必要なオプション
   */
  register(options) {
    this.options = options; // オプションを保持

    // Laravel Mixのビルド完了後に実行される処理を登録
    mix.after(() => {
      const generator = new SitemapGenerator();
      generator.register(this.options); // オプションを登録
      generator.generate(); // サイトマップを生成
    });
  }
})());
