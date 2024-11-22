## acuaskey-js向け型生成モジュール

バックエンドが吐き出すOpenAPI準拠のapi.jsonからacuaskey-jsで使用される型エイリアスを生成するためのモジュールです。
このモジュールはacuaskey-jsそのものにバンドルされることは想定しておらず、生成物をacuaskey-jsのsrc配下にコピーして使用することを想定しています。

## 使い方

まず、acuaskeyのバックエンドからapi.jsonを取得する必要があります。任意のacuaskeyインスタンスの/api-docからダウンロードしても良いですし、
backendモジュール配下で`pnpm generate-api-json`を実行しても良いでしょう。

api.jsonを入手したら、このファイルがあるディレクトリに置いてください。

その後、以下コマンドを実行します。

```shell
pnpm generate
```

上記を実行することで、`./built`ディレクトリ配下にtsファイルが生成されます。
