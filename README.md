# e-Gov Colorist

e-Gov法令検索サイトに拡張機能を追加します。

- [x] 条文内括弧範囲の強調表示
  - 条文の上で右クリック「条文の括弧を強調表示」
- [ ] 法令全体の括弧範囲の強調表示
- [ ] 強調表示の解除
- [ ] 括弧範囲をトーンダウン
- [ ] 条項ごとに背景色を変更
- [ ] 指定条項へ数字指定でジャンプ
- [ ] 条項をメモまたは公式機能の選択表示の状態を永続化
- [ ] シェアURLの生成


**Getting Started**

まだストアには公開されていないため、利用にはビルドと開発者モードでのインストールが必要です。

```
yarn install
yarn build
```

`dist` に出力されるのでブラウザに応じてインストール

- Firefox: https://extensionworkshop.com/documentation/develop/temporary-installation-in-firefox/
- Chrome: https://developer.chrome.com/docs/extensions/mv3/overview/
  - 拡張機能ページでデベロッパーモードをOnにして拡張機能を読み込み


**Scripts**

-   `yarn dev` - run `webpack` in `watch` mode
-   `yarn storybook` - runs the Storybook server
-   `yarn build` - builds the production-ready unpacked extension
-   `yarn test -u` - runs Jest + updates test snapshots
-   `yarn lint` - runs EsLint
-   `yarn prettify` - runs Prettier

----

This extension used the [react-typescript-web-extension-starter](https://github.com/aeksco/react-typescript-web-extension-starter) kit.
