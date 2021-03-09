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

`irozaro init`を実行するとアクセストークンの入力画面が現れます。
入力されたアクセストークンはホームディレクトリに`.irozaro`というファイルで保存されます。

3. Go!

```bash
irozaro -m "<message>" -i "<imageURL>"
```

## Usage
```bash
irozaro --help
```