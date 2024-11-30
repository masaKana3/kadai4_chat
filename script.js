// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
import { getDatabase, ref, push, set, onChildAdded, onValue, remove, onChildRemoved }
    from "https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app); //RealtimeDBに接続
const dbRef = ref(db, "chat"); //RealtimeDB内の"chat"を使う

$("#text").on("input", function () {
  const keyword = $(this).val().toLowerCase().trim();
  const $output = $("#output");
  let imageUrl = "";

  if (keyword.includes("クリスマス")) {
    imageUrl = "./img/christmas.png"; 
  } else if (keyword.includes("ハピバ")) {
    imageUrl = "./img/hbd.png";
  } else {
    imageUrl = ""; // デフォルトで背景画像なし
  }
  $output.css({
    "background-image": imageUrl ? `url(${imageUrl})` : "none",
    "background-size": "cover",
    "background-position": "center",
  });
});

//send_1: そのまま保存
$("#send_1").on("click", function() {
    const msg = {
        uname: $("#uname").val(),
        text: $("#text").val()
    }
    const newPostRef = push(dbRef);
    set(newPostRef, msg);
    $("#text").val("");
});

// send_2: ていねいに変換
$("#send_2").on("click", function () {
  const originalText = $("#text").val();

  // 記号の置き換え定義
  const symbolReplacements = {
    "！": "🤗",
    "。": "🤗",
  };
  // 固定フレーズの置き換え定義
  const wordReplacements = {
    ありがとう: "ありがとうございます🙇",
    すごい: "ステキです✨✨",
    うれしい: "とてもうれしいです😊",
    またね: "またお会いしましょう😉",
    カワイイ: "カワイイ💕",
    すみません: "ごめんなさい💦",
    行く: "行きます🚶",
    行きたい: "連れて行って🚗",
    迎えにきて: "迎えに来てください🚗",
    食べたい: "食べたいです😋",
    寝る: "寝ます🥱",
    頑張れ: "無理しすぎないでね🥺",
  };

  // テキストを一括置き換えする関数
  const replaceText = (text, replacements) => {
    return Object.entries(replacements).reduce(
      (updatedText, [target, replacement]) => {
        const regex = new RegExp(target, "g"); // グローバル置換の正規表現
        return updatedText.replace(regex, replacement);
      },
      text
    );
  };

  // 記号を置き換え
  let convertedText = replaceText(originalText, symbolReplacements);

  // 固定フレーズを置き換え
  convertedText = replaceText(convertedText, wordReplacements);

    // Firebaseに保存して入力欄を空にする
    const msg = {
        uname: $("#uname").val(),
        text: convertedText,
    };

    const newPostRef = push(dbRef);
    set(newPostRef, msg);
    $("#text").val("");
});

// 3.単語で入力したら絵文字が出る
$("#send_3").on("click", function () {
    const originalText = $("#text").val();
    // キーワード
    const sweets = [
        "スタバ",
        "ミスド",
        "お菓子",
        "おやつ",
        "スイーツ",
        "ケーキ",
        "ドーナツ",
        "アイス",
        "クレープ",
        "パンケーキ",
        "ドリンク",
        "飴",
    ];
    const foods = [
        "マック",
        "ごはん",
        "ランチ",
        "お寿司",
        "焼肉",
        "たこ焼き",
        "ハンバーガー",
        "ラーメン",
        "カレー",
        "パン",
        "パスタ",
    ];
    const shop = ["フランフラン", "イオン", "コストコ", "無印", "ユニクロ", "GU"];
    const positive = [
        "食べる",
        "食べたい",
        "欲しい",
        "行く",
        "行きたい",
        "見たい",
        "かわいい",
        "カワイイ",
        "よき"
    ];
    const negative = [
        "ムリ",
        "やばい",
        "ヤバイ",
        "ムカつく",
        "悲しい",
        "最悪",
        "ブサイク",
        "眠い",
        "つまらん",
        "ひどい",
        "寒い"
    ];

    // 絵文字定義
    const sweetEmoji = ["🍰", "🍦", "🍩", "🍪", "🥤", "🍎", "🍓"];
    const foodEmoji = ["🍔", "🍣", "🍽️", "🍜", "🍝", "🍚", "🍞"];
    const shopEmoji = ["👖", "🧦", "💖", "🍀", "✨"];
    const positiveEmoji = ["🤗", "😊", "😋", "🥰", "👶", "✨", "💓", "💕", "💖"];
    const negativeEmoji = ["😭", "😢", "😱", "😖", "🥶", "⤵️", "💢", "🥱", "😑"];

    // ランダムに絵文字を追加する関数
    const getRandomEmoji = (emojiList) => {
        return emojiList[Math.floor(Math.random() * emojiList.length)];
    };

    // キーワードが存在するか確認して絵文字を追加
    let resultText = originalText;
    if (sweets.some((word) => originalText.includes(word))) {
        resultText += getRandomEmoji(sweetEmoji);
    }
    if (foods.some((word) => originalText.includes(word))) {
        resultText += getRandomEmoji(foodEmoji);
    }
    if (shop.some((word) => originalText.includes(word))) {
        resultText += getRandomEmoji(shopEmoji);
    }
    if (positive.some((word) => originalText.includes(word))) {
      resultText += getRandomEmoji(positiveEmoji);
    }
    if (negative.some((word) => originalText.includes(word))) {
      resultText += getRandomEmoji(negativeEmoji);
    }
    // Firebaseに保存して入力欄を空にする
    const msg = {
        uname: $("#uname").val(),
        text: resultText,
    };

    const newPostRef = push(dbRef);
    set(newPostRef, msg);
    $("#text").val("");
});

//最初にデータ取得＆onSnapshotでリアルタイムにデータを取得
// テンプレートリテラル
onChildAdded(dbRef, function (data) {
    const msg = data.val();
    const key = data.key;

    let h = `
        <div id=${key}>
            <p>${msg.uname}</p>
            <p>${msg.text}</p>
        </div>
    `;

    // jQueryを使って画面に表示しましょう🤗
    $("#output").append(h);

// 初期化
let isCleared = false;

$("#clear").on("click", function () { 
    // alert("すべて消去します");
    isCleared = true;
    $("#uname").val(""),
    $("#text").val("");
    
    // set(dbRef, null);

    $("#output").html("");
    
});
    
  // この下消さない
});
