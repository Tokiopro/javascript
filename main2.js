// これがグローバルオブジェクトだ！
// そもそもなぜconsoleやperseIntが使えるのか
// これはどこにあるのか？
// javascriptエンジンが最初にどこでも呼び出せるメソッドを管理している。
// グローバルオブジェクと呼ばれる、オブジェクトに一覧として管理している。

console.log(globalThis);
// ブラウザで確認するとwindowというものが表示される。
// その中にグローバルオブジェクトの一覧が管理されている。
//内部的にjavascriptエンジンがあらかじめ定義してくれている。

//グローバルオブジェクトに新しいプロパティは定義できる。
//登録されているプロパティは変数として認識される。

// ECMAScriptの仕様書に定義されているのか？
// 定義されていない。必要な最低限なメソッドやプロパティは定義してくれているが、プラスアルファは定義してね、と書いてある。
// 例えば、alertは定義されていない。ブラウザが定義している。MDMに書いてある。

//varとletの違い
// letやconstは2015年に登場した書き方
// varはほとんど使われていない。（使う理由がない）
// 4つ違いがある。
// ①varは同じ変数名を何度も再宣言できる（上書き）
// ②スコープが違う。letはブロックの外側から参照できない。varはグローバルスコープで使える。

var hello = 'hello';
hello = 'hi';

// ただ、一つ例外がある。関数の中にあるものは外側から参照できない。
// 従って、let, constはブロックスコープと呼ばれ、varは関数スコープと呼ばれる。
function sayTomato() {
    var tomato = 'tomato';
}
// ③varで定義された変数はグローバルオブジェクトの一部になる。
    var apple = 'apple';
    console.log(globalThis);//appleがグローバルオブジェクトの中にはいっている。ただし、関数の中に定義されていると入っていない。

//④ホイスティング（巻き上げ）
console.log(remon);//←エラーにならない。ただし,undefinedになる。
var remon = 'remon';
//なぜundefined?
//初期値は巻き上げず、変数だけ巻き上げているから。

//関数宣言文とvarはここが似ている。
//再宣言できる。関数宣言文も関数スコープ。関数宣言文もグローバルオブジェクトになる。
//巻き上げされるが、関数宣言は値の部分も巻き上げられる。

//なぜ最新にしないのか？
//後方互換性を保つため。昔に書いたコードをずっと動かせるようにする。
//昔に書いたコードをずっと動き続けることを保証しないといけない。

//use strictとは？ファイルの一番上に定義する。
'use strict';
//強制的に厳しいルールで開発者にjavascriptを書かせる。
//厳密には文ではない。厳密にはディレクティブ。
//<script>タグごとに書く必要がある。
//関数のみにuse strictをつけることもできる。
//ブラウザによって動き方が違う。関数宣言文の動き方が違う。
//if文や関数宣言文の中ではuse strictを使うべきではない。挙動が違うので、混乱しやすくなる。
//chromeの場合、関数宣言文はブロックの中で書かれた場合、全てバーで宣言されたような形と同じになる。

globalThis.banana= 'banana';
//↓の書き方でも実はグローバルオブジェクトの中に入っている。use strictなしで
grepe = 'grepe'

//プリミティブとオブジェクトについて
//プリミティブ＝原始的、基本型
//オブジェクト、配列、関数はオブジェクトで残りは全てプリミティブになる。
//なぜ分けられているのか？
//変数に代入されたときの動きが違う。
//変数はコンピューターメモリの中に格納されている。
//メモリ＝一時的に保存している場所。
//オブジェクトは保存方法が違う。オブジェクトは間接的。
//xに対応づけられた場所にxを保存する。200番地
//別のところにオブジェクトを作成して、そのオブジェクトの番地を指定して呼び出す。
//もし、x=yとしたとき、どうなる？
//番地を渡すだけ。アドレスが変数を渡している。（内部ではもっと複雑なことをしている。)
//プリミティブとリファレンス（参照）ということもある。
//オブジェクトはデータ型なので、引っ越しやすいようにしている。

//開発者は意識する必要がある？
//コーディングに影響するので意識する必要がある。２点。

const coffee= {
    name: 'Caffe Latte',
};
const coffee2 = coffee;
coffee2.name = 'Espresso';
console.log(coffee);//←①coffeeも espressoになってしまう。

const cofeee3 = {
    name: 'Caffe Latte',
};
console.log(coffee === coffee3);//←falseになる。全く同じだけど、別のアドレスを指しているから。

//注意点
//constは再代入を封じている。
//constでオブジェクトの値は変えることができる。
//オブジェクトはアドレスしか指していないので、本体の値を変えることができる。
//constは値が変わらないという認識は良くない。
//constで定義しても、値が変わるものをミュータブルという。可変
//プリミティブはイミュータブル(不可変)
//メモリの概念の理解が必須。

//ガベージコレクションについて
//メモリというのは空きがあればあるほど、高速に動く。
//javascriptは自動でデータを削除している。
//その仕組みをガレージコレクションという。
//具体的には？
//javascriptエンジンの中にあるガベージコレクターがコードの流れを監視している。
//こういうシステムが内部的に動いている。
