//ここからは関数の発展的な内容。
//レキシカル環境(LexicalEnvironment)　仕様書で出てくる言葉

let apple = 'apple';
let banana = 'banana';
{
    let mango = 'mango';
    console.log(?);//←ここには一体何が入る？apple,banana,mangoは入れることができる。グローバルオブジェクトにアクセスできる。
    {
        let orange = 'orange'
    }
}

//コードを読み始める前にレキシカル環境が作られる。。
//キーとバリューがセットになっている小さなデータベース（オブジェクト）のような感じ・
//グローバルオブジェクトを格納している
let apple = 'apple';
let banana = 'banana';
// レキシカル環境(global)
// global Object
// apple: 'apple'
// banana: 'banana'
// 変数が定義されている文を読み込んだ場合、キーとバリューをレキシカル環境に登録する。

//ブロック文が見つかった場合は？
//新しいブロック文用のレキシカル環境を作る。
{
    let mango = 'mango';
    console.log(?)//←ブロック文に対応したレキシカル環境にあるなら、mangoを返す。だが、なかったら、outerEnvが指し示すレキシカル環境の中を探す。
    //チェーン状外側のブロックに探しにいく。
}
//outerEnvというプロパティを定義するとEcmascriptの仕様書に書いてある。
//その外側のレキシカル環境をアドレスで指定する。
//なぜ、レキシカル環境について学ぶのか？関数の応用の仕方に繋がるから。

//単純な仕組みにおけるレキシカル環境の仕組み

//関数はいつレキシカル環境が作られる？定義？呼び出し？
let outerFunc = (a) => {
    let mango = 'mango'
    let innerFunc = () => {
        let orange = 'orange'
    }
    innerFunc()
}
//答えは関数を呼び出したとき=ブロック文と違うところ。。
outerFunc('hello')

let outerFunc2 = () => {
    let mango = 'mango';
    return () => {
        let orange = 'orange';
        console.log(?);//←関数の中にreturnを定義すると？
    }
}
let innerFunc = outerFunc2()//←この関数呼び出しで一度レキシカル環境が作られる。
innerFunc()
//②returnでinnnerFuncに関数オブジェクトを代入する。
//③innerFunc呼び出しで新しいレキシカル環境が作られる。
//アドレスはmangoを指し示す。
//関数オブジェクトは様々なプロパティを持っている
//その中にEnviromentoというプロパティがある。
//これは、何を示すか？
//その関数オブジェクトが作られた場所のレキシカル環境を指し示す。
//innerFuncはreturn(outerFunc)で作られた関数だから。
//関数は持ち運びできてしまうので、複雑なデータの動きをする。ブロック文はチェーン、単純。

//レキシカル環境① global object,outerFunc,innerFunc
//レキシカル環境② outerEnv, mango
//レキシカル環境③ outerEnv,orange
//レキシカル環境同士の流れ、③→①⇨②→①

//クロージャについて
//外部の変数の情報を持った関数のこと
//javascript内で言えば、レキシカル環境を指し示す関数オブジェクトのこと

//レキシカル環境を理解する上で3つの注意点
//①レキシカル環境というものはアドレスの考え方で定義されている。

let fluit = 'apple';
let sayFluit = () => {
    console.log(fluit);
}
fluit = 'banana';//←ECMASCRIPTは反映される。

//②レキシカル環境は呼び出し式が二つ書かれた場合、レキシカル環境が2つ作られる。

//③理論上はレキシカル環境は一生のこり続ける。
let createCounter = () => {
    let count = 0
    return () => {
        count += 1
        console.log(count)
    }
}

let counter = createCounter()
counter()

//常に同じアドレスを指し示す。

//クロージャを使ってプライベート変数を作る方法
//そもそもレキシカル環境は何のために作られたか？
//コンソールログでどんな変数を使うことができるのかというのをわかりやすくECMASCRIPTの主要署にかくため。
//変数を探すためのツールをプライベートの変数を使うために利用することができる。
//レキシカル環境はあくまでも内側から外側にはアクセスできる。
//ただし、一つだけ抜け穴がある。
//関数の中でリターンされたものが関数だった場合、レキシカル環境の外側から内側にアクセスできる。
//いつ、アクセスできるのか？
//createCounter()が呼び出された時に変更している。
//現にcountという変数は、順に変数の中身が変わっている。
//一個ずつカウントされている。←プライベートな変数
//管理しやすい

let generatePerson = () => {
    let age = 0;
    return {
        name: 'tokio',
        incrementAge: () => {//←returnで関数を返却している。
            age += 1;
            return age;
        }
    };
};

// const tokio = generatePerson();
console.log(tokio)

//簡単に変更されないようにするには？

let generatePerson = (name) => {//引数にnameを定義
    let age = 0;
    return {
        getName: () => name,
        getAge: () => age,
        incrementAge: () => {//←returnで関数を返却している。
            age += 1;
        }
    };
};

const tokio = generatePerson('tokio');
console.log(tokio.getAge());
tokio.incrementAge();
console.log(tokio.getAge());
console.log(getName());
const tom = generatePerson('Tom');
tom.incrementAge();

//ブラウザ上でクロージャはどう動くのか？
//メモリに保存されている。
//ブラウザではレキシカル環境は一生残るのか？
//そんなことはない。
//①ガーベジコレクション
//②最適化が行われている。
//なくなってもいい、使用されていないレキシカル環境は削除されている。

//IIFE(即時実行関数式)を使って、関数の定義と呼出式を組み合わせる方法

//直接、関数を定義して、すぐに呼び出す。

const counter2 = (() => {
    let count = 0;
    return () => {
        count += 1;
    };
})();//←丸括弧で区切るとできる。

//昔はvarしかないので、外側から変数にアクセスできてしまう。そのため、
(function () {
    var hello = 'hello';
})();
//のような関数の定義をしていた。(IIFE イーフィ)という名前がついた。

//自分自身を呼び出す再帰関数を使って、効率よくループ処理をする。
let factorial = (n) => {
    if (n === 0) return 1;
    return n * factorial(n - 1);
};
console.log(factorial(3))

console.log(20000);//←エラーになる。なぜか？

//実行コンテキストスタックについて
//関数の動きを伝えるために作ったシステム

const c = () => {
    return 'hello'
}
const b = () => {
    return c()
}
const a = () => {
    return b()
}
a()

//スタックというものが用意される。
//実行する関数（関数オブジェクト）、状態（その関数がどのくらい実行されているのか）、レキシカル環境、主にこれらが管理される。
//溜まった情報のことを実行コンテキストという。（execution context)
//関数を実行するたびに、タイムリーに状態を管理している。
//上記でreturn b()で関数を呼び出しているので、スタックは積み上げられる。
//ECMASCRIPTは使用上、無限にスタックを積み上げられる。
//一方、ブラウザは保存できる量に限界があるので、スタックエラーが起きる。
//ブラウザではコールスタックという名前になっている。
//実は既にanonymousという無名関数が一つスタック上に管理されている。

//レキシカル環境＝環境レコード（environment record)という名前になった。

