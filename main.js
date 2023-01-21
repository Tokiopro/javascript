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

sayHI = (name) => （{
    test: 'name',
});

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
