"use strict";
{
  const clue = document.getElementById('showClue');
  const pictures = document.getElementById('showEfuda');
  const btn= document.getElementById('btn');

  // 札番号
  let no = 0;
  // 正解数
  let score = 0;
  // ???
  let isAnswered;

  //配列データ
  const karuta = shuffle([
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
    
  ]).splice(0,4);
  //↑のsplice絵札の表示枚数を設定（開始場所, 採用枚数）
  
  //ゲーム開始
  btn.addEventListener("click", () => {
    showClue();
    init();
    /* setTimeout(player, 5000);  */
  });

  
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
  const shuffledCard = shuffle([...karuta]);
 shuffledCard.forEach((card, index) => {

  //karuta.forEach((card, index) => {
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

      document.querySelectorAll("img")[index].style.visibility = "hidden";
      
      //正解札を、札場から消す
      /* img.classList.add('erase');
      document.querySelector("img")[index].style.visibility = "hidden"; */
    
      //正解札を、札場から消す：▲（札Aしか消せない。a.pngではなく、配列のefudaを挿入したい）
      /* const image = document.querySelector("img[src = 'images/a.png']");
      image.classList.add("erase"); */
      
      //お手付きの場合（ポップアップ内容）
    } else {
      // console.log ('wrong');
      //ポップアップ表示
      document.getElementById("touch").classList.remove("hidden");
      //メッセージ表示（ポップアップ上）
      document.getElementById("touchMessage").innerHTML =
        "残念、取られました！";
      // 正解札を表示（ポップアップ上）
      document.getElementById("touchImage").src = karuta[no].efuda;
      //正解札を、札場から消す：▲（札Bしか消せない。b.pngではなく、配列のefudaを挿入したい）
      /* const image = document.querySelector("img[src = 'images/b.png']");
      image.classList.add("erase");
        */
    }
   }
  });
  
// 相手プレーヤー：
function player() {
         
  //相手が取った絵札を消す：▲（札Aしか消せない。a.pngではなく、配列のefudaを挿入したい）
  /* document.querySelector("img").style.visibility="hidden" */
  /* document.querySelector("img"[src="karuta[no].efuda"]).style.visibility = "hidden"; */
   
 //以下結果画面は、読み上げ毎に正しく表示される。
  //ポップアップ表示
  document.getElementById("touch").classList.remove("hidden");
  //メッセージ表示(ポップアップ上）
  document.getElementById("touchMessage").innerHTML = "残念、取られました！";
  //正解札を表示(ポップアップ上）S
  document.getElementById("touchImage").src = karuta[no].efuda;

  document.querySelector("img").style.visibility("hidden") = karuta[no].efuda;

 /*  const image = document.querySelector("img[src = karuta[no].efuda]");
      image.classList.add("erase"); */
}
   
  //読み句、結果を表示する

  function showClue() {
    //札をタッチ
       isAnswered = false;

    //次の読み句がある場合は、表示する
    if (no < karuta.length - 1) {
      document.read.field.value = karuta[no].clue;
    }
  }  
  

  }  
