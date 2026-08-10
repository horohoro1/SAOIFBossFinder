# GitHub Pages で公開する手順

このリポジトリには、静的サイトを GitHub Pages に公開するワークフローが含まれています。公開時には `index.html`、`script.js`、`style.css`、`bosses.json`、`images/`、`fonts/` だけが配信されます。

## 初回のみ

1. このフォルダを GitHub のリポジトリへ push します。ブランチ名は `main` または `master` にしてください。
2. GitHub のリポジトリで **Settings → Pages** を開き、**Build and deployment** の **Source** に **GitHub Actions** を選びます。
3. push 後、**Actions** タブの「Deploy site to GitHub Pages」が成功するまで待ちます。
4. 成功した実行の **Deploy to GitHub Pages** から表示される URL をスマホのブラウザで開きます。以後はホーム画面へ追加すると、アプリのように起動できます。

## 更新方法

`main` または `master` へ push するたびに再公開されます。GitHub の **Actions** タブから手動実行することもできます。

## 注意

GitHub Pages は公開サイトです。GitHub Free では公開リポジトリが必要なため、公開したくないファイルはリポジトリへ push しないでください。
