//予約語や数値や文字列や変数をキーにする%。
const interests = 'アイウエオ';
const person = {
    name: 'tokio',
    age: 30,
    greeting: function() {},//メソッド、オブジェクトの関数
    const: 'const',//オブジェクトのキーには
    'hello everyone': '',//キーを文字列にできる。何がいいのか？スペースや数字を入れることができる。
    3: 3,
    3.1: 3.1,
    '-3': -3,
    [interests]: ['music', 'travel']//キーを動的な値にしたい場合、式を使うこともできる。構文として、キーを角括弧で囲う。
};

console.log(person);

//プロパティにアクセスする2つの方法
//オブジェクトのプロパティにアクセスするには？
//person.3やperson.'current city'はエラーになってしまう。
//.と[]を使う保２つの方法がある。
console.log(person[3]);
console.log(person[interests]);
console.log(person['age']);//なぜageは文字列なのか？⇨[]は式が入る構文なので、ageという変数を探してしまうから。

//全てのキーはどのようにして文字列と扱われるか
//オブジェクトのキーは文字列として扱われる
for (const key in person) {
    console.log(key);//全部文字列で出てくる。
}
console.log(person['3']);//これでも3にアクセスできる。

//Object.keys
console.log(Object.keys(person));//オブジェクトのキーを配列で取得できる。

for (let key of Object.keys(person)) {//配列をfor of文で回している。
    console.log(key);
}
//Object.values
console.log(Object.values(person));//値が配列で返ってくる。

//Object.entries
console.log(Object.entries(person));//配列の中にキーと値がセットの配列が返ってくる。

