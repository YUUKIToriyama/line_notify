# irozaro
LINE Notifyをコマンドライン上で用いるためのユーティリティです。
パソコンから短いテキストをスマフォに転送したいときなど、LINEクライアントを立ち上げることなくメッセージを遅れるので便利です。

## Installation
1. npmからインストール
グローバルインストールして下さい。
```bash
npm install -g irozaro
```
2. アクセストークンの設定
設定ファイルを開き、トークンをご自身のものに変更して下さい。
```bash
vim /usr/lib/node_modules/irozaro/src/accessToken.js
```
3. Go!
```bash
irozaro -m "<message>" -i "<imageURL>"
```

## Usage
```bash
node index.js --help
```
