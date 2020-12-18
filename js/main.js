"use strict";
{
  // 札番号
  let no = 0;
  // 正解数
  let score = 0;
  // ???
  let isAnswered;

  //配列データ
  const karuta = /*shuffle(*/ [
    {
      clue: "Amazing giant green trees in a park with an ocean view.",
      efuda: "images/a.png",
      onsei: "sounds/A.mp3",
    },
    {
      clue: "Bing Bong, everyone looks at the clock.",
      efuda: "images/b.png",
      onsei: "sounds/B.mp3",
    },
    {
      clue: "Continue the walk all the way looking the paintings on the wall.",
      efuda: "images/c.png",
      onsei: "sounds/C.mp3",
    },
    {
      clue: "Down at the seaside the spnning white blade",
      efuda: "images/d.png",
      onsei: "sounds/D.mp3",
    },
    {
      clue: "Enjoy antiques in the 16th century.",
      efuda: "images/e.png",
      onsei: "sounds/E.mp3",
    },
    // {
    //   clue: "Feel at peace Mother nature",
    //   efuda: "images/f.png",
    //   onsei: "sounds/F.mp3",
    // },
    // {
    //   clue: "Great guiding ships safely round the rocks.",
    //   efuda: "images/g.png",
    //   onsei: "sounds/G.mp3",
    // },
  ]; /*)*/

  //絵札の表示枚数を設定（削除場所, 削除枚数）
  // karuta.splice(5, 2);

  //ゲーム開始
  document.querySelector("button").addEventListener("click", () => {
    showClue();
    init();
    setTimeout(player, 8000);
  });

  // 相手プレーヤー：
  function player() {
    //取った絵札を消す：▲（札Aしか消せない。a.pngではなく、配列のefudaを挿入したい）
    // const image = document.querySelector("img[src = 'mages/a.png']");
    // image.classlist.add('erase');
    document.querySelector("img[src = 'images/a.png']").style.visibility ="hidden"
    //ポップアップ表示
    document.getElementById("touch").classList.remove("hidden");
    //メッセージ表示(ポップアップ上）
    document.getElementById("touchMessage").innerHTML = "残念、取られました！";
    //正解札を表示(ポップアップ上）
    //document.getElementById("touchImage").src = karuta[no].efuda;
  }

  // 句の読み上げ
  let music = new Audio();

  function init() {
    if (no < karuta.length - 1) {
      music.preload = "auto";
      music.src = karuta[no].onsei;
      music.load();
      music.loop = false;
      music.play();
    }
  }
  //？？
  function stop() {
    music.pause();
    music.currentTime = 0;
  }

  //シャッフル
  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  }

  //絵札の表示・タッチ

  karuta.forEach((card, index) => {
    //画像srcを作成
    const img = document.createElement("img");
    img.src = card.efuda;
    //liに画像を追加
    const li = document.createElement("li");
    li.appendChild(img);
    //ulに子要素liを追加（これで初めてHTMLに表示）
    const fuda = document.querySelector("ul");
    fuda.appendChild(li);
   //札をタッチ
   img.addEventListener("click", () => {
    judge(card);
    });
    console.log(card, index);
  });
  

   
  //読み句、結果を表示する

  function showClue() {
    //札をタッチ
       isAnswered = false;

    //次の読み句がある場合は、表示する
    if (no < karuta.length - 1) {
      document.read.field.value = karuta[no].clue;
    } else {
      //ゲーム終了→ポップアップ表示（結果）
      document.getElementById("result").classList.remove("hidden");
      //メッセ―ジ表示「（　枚取りました」--（勝ち負けに関わらず共通）
      document.getElementById("maisu").innerHTML = `(${score}枚取りました)`;
      // 取札の数が過半数の場合
      if (score >= karuta.length * 0.5) {
        //メッセージ表示「勝ちました」
        document.getElementById("resultMessage").innerHTML = "勝ちました！";
        //画像表示（金色のトロフィー）表示
        document.getElementById("resultImage").src = "images/gold.png";
        // 過半数以下の場合
      } else {
        //メッセ―ジ表示「残念、負けました」
        document.getElementById("resultMessage").innerHTML = "残念、負けました";
        //画像表示（銀のトロフィー）
        document.getElementById("resultImage").src = "images/silver.png";
      }
    }
  }
  // // 取り札の正誤判定を行う
  function judge(card) {
    if (isAnswered) {
      return;
    }
    isAnswered = true;
    //ポップアップ表示
    document.getElementById("touch").classList.remove("hidden");
    //取り札が正しい場合
    if (card.efuda === karuta[no].efuda) {
      //メッセージを表示（ポップアップ上）
      document.getElementById("touchMessage").innerHTML = "取りました！";
      // 正解札を表示（ポップアップ上）
      document.getElementById("touchImage").src = karuta[no].efuda;
      //正解札を、札場から消す：▲（札Aしか消せない。a.pngではなく、配列のefudaを挿入したい）
      const image = document.querySelector("img[src = 'images/a.png']");
      image.classList.add("erase");
      //スコア加点
      score++;
      //最後から2枚目を取った場合、最後の札ももらえる（計2点）
      if (no === karuta.length - 2) {
        score++;
      }
      //お手付きの場合（ポップアップ内容）
    } else {
      // console.log ('wrong');
      //ポップアップ表示
      document.getElementById("touch").classList.remove("hidden");
      //メッセージ表示（ポップアップ上）
      document.getElementById("touchMessage").innerHTML =
        "残念、取られました！";
      //正解札を、札場から消す：▲（札Aしか消せない。a.pngではなく、配列のefudaを挿入したい）
      const image = document.querySelector("img[src = 'images/a.png']");
      image.className = "erase";
    }
    //ボタンの言葉表示（札が残り2枚となった時）
    if (no === karuta.length - 3) {
      touchBtn.textContent =
        "次が最後の回。次に正しい札を取ったら、最後の1枚ももらえます";
    }
    //ボタンの言葉表示（最後から2番目の札をタッチした時）
    if (no === karuta.length - 2) {
      touchBtn.textContent = "結果を見る";
    }
  }

  //1回目の情報を消し、次の読み句を読む
  touchBtn.addEventListener("click", () => {
    //ボックス内の読み句を消す
    document.read.field.value = "";
    //ポップアップを消す
    document.getElementById("touch").classList.add("hidden");
    //▲正しい札を場から消す

    //最後に残った札を消す
    if (no === karuta.length - 2) {
      document.querySelectorAll("img")[karuta.length - 1].style.visibility =
        "hidden";
    }
    no++;
    showClue();
    init();
    //player();
  });

  //document.querySelector('button').addEventListener('click', () => {
  // 基本（配列無し）→うまく作動
  // const imageNode = document.querySelectorAll("img")[0];
  // imageNode.className='my-color';
  //srcで限定（配列無し）→うまく作動（a.png画像が表示される限り）
  // const imageNode = document.querySelector("img[src = 'images/a.png']");
  // imageNode.className='my-color';

  //CSS使わない場合、作動
  //  const imageNode = document.querySelector("img[src = 'images/a.png']");
  //  imageNode.style.visibility ='hidden';
  //CSS使わない場合→作動しない
  // const imageNode = document.querySelector("img[src = ['karuta[0].efuda']]");
  // imageNode.style.visibility ='hidden';

  // srcで限定（配列あり）→作動しない
  // const imageNode = document.querySelector("img [src = 'karuta.efuda']");
  // imageNode[0].className ='my-color';

  //srcで限定（配列あり）→作動しない
  // const imageNode = document.querySelector("img[src = '['karuta[0].efuda]']");
  // imageNode.classList.add('my-color');

  // if (imageNode.classList.contains('my-display') === true){
  //     imageNode.classList.remove('my-display');
  // }else {
  //     imageNode.classList.add('my-color')
  // }
  //})
}
