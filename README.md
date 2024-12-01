# ①課題番号-プロダクト名

人にやさしいチャットアプリ

## ②課題内容（どんな作品か）

- 簡素な文を絵文字を使った文章（おばさん構文）に変換して、やんわりと表現します。
- 授業で習ったことをベースにしており、事前に登録したキーワードを入力すると絵文字がランダムで出ます。が、ランダムなので完全一致しないところがじわっときます。
- そのままボタンは入力した通り、ていねいボタン、かんたんボタンはキーワードで変換します。
- キーワードは高校生の娘とのLINEのやりとりを参考にしてセレクトしました。基本はお願いばかりです。

## ③DEMO

なし

## ④作ったアプリケーション用のIDまたはPasswordがある場合

- ID: なし
- PW: なし

## ⑤工夫した点・こだわった点

- 追加、削除のメンテナンスがしやすいよう辞書化してキーワードを定義づけしました。
- 分岐を細かく設定したり、replaceで置き換えるなど処理は多めです。
- 小さいお子さんにもわかりやすいよう、ボタンをひらがなにしました。
以下12/1追加
- 本文に"クリスマス""ハピバ"と入力すると背景が変わるように設定しました。

## ⑥難しかった点・次回トライしたいこと(又は機能)

- 入力した文字を消すことはできても、下に出力した文字を消すのが完璧ではありません。リロードしたら文字が復活してしまうので、dbRefのsetをnullで取り消したら、案の定Firebaseも全て消えてしまいました。Firebaseに残しつつ、出力を消す方法を見つけ出したいと思います。
- 今回は辞書化しましたが、キーワードが増えると使いにくいと思いました。
- エラーが出て動かないときはchatGPTに質問しながらコードの修正をかけていきました。APIでchatGPTとチャットアプリを紐付けたらもっと自由に、もっと内容にフィットした会話ができると思います。
以下12/1追加
- .gigignore問題は物理的に解決しました。別のscriptファイルを読み込ませました。
- なまえごとにoutputを右寄せ、左寄せにしましたが、リロードすると戻ってしまう問題が発生中です。

## ⑦質問・疑問・感想、シェアしたいこと等なんでも

- [感想]何気なく使っているスマートフォンアプリは、結構複雑なことをしているのだとわかりました。「UXを向上させる=地道な努力の積み重ね」だと実感します。
- 案の定gitignoreが効かず、通常のファイルとしてscript.jsがプッシュされてしまった際に、GitHubからアラートメールが届きました。きちんと監視されているのが改めてわかったのが小さな気づきでした。
- [参考記事]
  - 1. slackでみなさんが教えてくださった記事は大変参考になりました。ありがたいです。