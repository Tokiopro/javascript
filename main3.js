//ここからは関数の発展的な内容。
//レキシカル環境(LexicalEnviroment)　仕様書で出てくる言葉

let apple = 'apple';
let banana = 'banana';
{
    let mango = 'mango';
    console.log(?);//←ここには一体何が入る？apple,banana,mangoは入れることができる。グローバルオブジェクトにアクセスできる。
    {
        let orange = 'orange'
    }
}

//コードを読み始める前にレキシカル環境を定義してください。
//キーとバリューがセットになっている小さなデータベース（オブジェクト）のような感じ・
//グローバルオブジェクトを格納している
let apple = 'apple';
let banana = 'banana;'

//ブロック文は？
//新しいブロック文用のレキシカル環境を作る。
{
    let mango = 'mango';
    console.log(?)//←ブロック文に対応したレキシカル環境にあるなら、mangoを返す。だが、なかったら、outerEnvが指し示すレキシカル環境の中を探す。
    //チェーン状外側のブロックに探しにいく。
}
//outerEnvというプロパティを定義してとEcmascriptの仕様書に書いてある。
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
