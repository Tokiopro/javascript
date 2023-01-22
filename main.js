// 関数はオブジェクトなので、オブジェクトのVALUEに関数を入れることができる（関数式）
const person = {
    name: 'tokio',
    sayHi: function () {
        return 'hi';
    },
}
console.log(person.sayHi());// hiが出力される

const person2 = {
    name: 'tokio',
    sayHi: function () {
        return {
            a: 'a',//　このようにプロパティを入れることもできる。
            sayHello: function() {},
        };
    },
}

//　オブジェクトのバリューの関数のことをメソッドという。
// プロパティというのはkeyとvalueのセットのこと。

// アロー関数について

// 無名関数の置き換えになる。

sayHi = function() {}//冗長的
sayHi = () => {}//ぱっと見関数っぽく見える。（矢印＝アロー）
//アロー関数では、関数宣言文を書けない、式文になる。
// では、無名関数とアロー関数の違いはなんなのか？
// 三つある。
// ①一つの式をリターンする場合、波括弧とリターンを消せる。
// ↓正規の書き方
sayHi = (name) => {
    return `Hi $(name)!`;
};
//省略版
sayHi = (name) => `Hi $(name)!`;//←return文も波括弧も消す位ことができる。一つの式のみを返す時のみ。
console.log(sayHi);

//②パラメーターが一つだけの場合、丸括弧を省略することができる。
sayHi = name => `Hi $(name)!`;
//パラメーターが一つのみの場合

//③this(後の動画);
//注意点：オブジェクトをreturnしたい場合は？
sayHI = (name) => {
    name: name;
};
//上記のコードの場合だとundefinedが帰ってくる。なぜか？
//波括弧から始まった場合は。アロー関数というものはオブジェクトではなくて、アロー関数のキーワードの波括弧であると考えてしまう。
//上記の場合はnameをラベル文と見て、ラベル文の右に書くべき文がnameになっているのでスキップされている。
//ではどうすればいいか？
//波括弧から始めずにオブジェクトをリターンすればいい。
//丸括弧をつけてあげる、優先してくれる演算子
// 何かの式を返していると認識してくれる。

// sayHI = (name) => （{
//     test: 'name',
// });

//デフォルトパラメーターについて

console.log(sayHI());//←何も渡さなかった場合。undefinedになる。
// 何も渡されなかった場合、どうするか？
sayHI = (name = 'user') => `Hi $(name)!`;
//userという文字列が入る。

console.log(sayHI(undefined));//undefinedを渡したときもデフォルトパラメーターが入る。
//他のfalsyはそのまま渡される。

//複数のパラメーターが渡される場合。
sayHI = (name = 'User', message) => `Hi $(name)! $(message)`;

console.log(sayHI(undefined, 'I like chocolate'));
//↑かなり冗長的になっている。↓どう改善するか？
//デフォルトパラメーターは最後につける。
sayHI = (name, message = 'I like cake') => `Hi $(name)! $(message)`;

console.log(sayHI('Tokio'));
//引数を入れすぎた場合は、全て無視される。
//引数が一つだけでも、デフォルトパラメーターがある場合は()を省略できない。

// レストパラメーターで無限の引数を使う場合
// 引数を無限個取りたい。
// 配列を引数に渡す。配列、使いたくない場合は？
let sum = (nums) => {
    let total = 0;
    for (num of nums) {
        total += num;
    }
    return total;
};
console.log(sum([1, 3, 5]))

// レストパラメーターを使う！(レスト＝残りの、残余引数ともいう)
//　パラメーターの手前にドットを3つ付ける。

let sums = (...nums) => {// ←numsは配列になっている。
    let total = 0;
    for (num of nums) {
        total += num;
    }
    return total;
};
console.log(sum(1, 3, 5));//引数が配列にする必要がない。

//argumentsオブジェクトを使ってやる方法もある、ES6以前の方法
//配列のようなオブジェクトになっている。
// アロー関数では使えない。古い書き方なので、基本的に使わないようにする。

// 引数に渡せるコールバック関数について
// 引数に関数を入れることができるというもの。
let subtract = (a, b, callback) => {
    let result = a - b;
    callback(result);//7が↓のresultという引数に入る。
};
subtract(10, 3, (result) => {
    console.log(result);// ←10, 3という引数がa, bに入り、callbackのresultに入っている7がresultに入る。
});
subtract(10, 4, (result) => {
    alert(result);
});

// 無名関数と名前付き関数式に違い
// デバッグ時に名前付き関数式がわかりやすい。
// chromeは関数のnameプロパティを見ている。
let sayHI = function () {
    return 'hi';
};
console.dir(saiHi);

//javascriptでは、変数に無名関数やアロー関数を入れた場合、プロパティ名がNAMEプロパティに推測される。
//同じようにオブジェクトのプロパティとして使用される場合。

//パラメーターというものは後から代入できる、変数という扱いになる。
//typeof演算子でfunctionかオブジェクトか判定できる。
