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

//キーの順番はこうなっている
//for inとobject.keysは順番が同じ。
//どういう順番で配列は並ぶのか？二つのブロックに分かれる。
//keyが0以上の整数が入っているブロックを数字順に（0, 1, 2, 3, 4)
//その後のブロックは文字列とFloat型が定義されている順番で出力される。
//EcmaScriptの仕様書上では、keyは文字列として振る舞うと定義されているので、keyの3⇨'3'にしても整数としてみなされ、一つ目のブロックに入る。

//delete演算子でプロパティを削除する方法
person.name = 'Jack';
person.gender = 'man';
//peronオブジェクトのadeプロパティを削除したい。
delete person.age;
//.ではなくperson['age']でも削除できる
console.log(person);

//オブジェクトの省略記法（プロパティの省略記法はこう使う）

const name = 'Espresso';
const size = 350;
const coffee4 = {
    name,
    size,
    //name: name, size: size,と上記は同じ意味。
};
console.log(coffee4);

//スプレッド構文を使ってオブジェクトをコピーする方法
//{}で囲んで...を追記するだけ。
const coffee5 = coffee4;
console.log(coffee4 === coffee5);//falseになる。
//プロパティ追加もできる。
const coffee6 = {
    ...coffee4,
    isHot: true,
    name: 'Latte',//nameプロパティも変更されている。
}
console.log(coffee6);
const coffee7 = {
    isHot: true,
    name: 'Latte',//この場合、nameプロパティは入れ替わっていない。
    ...coffee4,
};
console.log(coffee7);
//なぜか？後から書いたものが優先されるようになっているから。
//スプレッドコピーはシャローコピーになっている。
//シャローコピー（浅い)⇆ディープコピー（深い）
//違いは？オブジェクトの中にあるオブジェクトをコピーするか、アドレスを指定するかの違い。
//シャローコピーはオブジェクトの中にあるオブジェクトまではコピーしていない。
//シャローコピーはオブジェクトを共有してしまう。
const obj = {
    name,
    size,
    obj2: {
        calories: 5,
        sugars: 0,
    },
};
const objCopy = {
    ...obj,//同じアドレスを共有してしまう。
    isHot: true,
    name: 'Latte',
};
objCopy.obj2.calories = 180;//スプレッド構文でコピーしたobjの中にあるobj2のcalorieを180にしている・
//コピーしているので、開発者側はコピー元であるobjの中にあるobj2のcalorieは5であってほしい。
//シャローコピーはアドレスをコピーしてしまっているので、コピー元も変更されてしまっている。
//ディープにするには？
const objDeep = {
    ...obj,//同じアドレスを共有してしまう。
    isHot: true,
    name: 'Latte',
    obj2: {
        ...obj.obj2,//オブジェクトの中でもう一度スプレッド構文を使う。
    },
};

//Object.assignメソッドを使ってオブジェクトを拡張する方法
//オブジェクト同士を合体させるメソッド。
const o1 = {a: 1};
const o2 = {b: 2};
Object.assign(o1, o2);//一つ目の引数に、基準となるオブジェクトをつける。二つ目の引数に合体させたいオブジェクトを入れる。
//スプレッドは新しいオブジェクトに既存のオブジェクトを入れ込んでいる。
//assignは既存のオブジェクトに既存のオブジェクトを入れ込んでいる。
const o3 = {a: 2, b: 2};
Object.assign(o1, o3);//o1のa: 1は入ってこない。
//右側の引数のオブジェクトの方が優先される。

//Object.assignは入れ込むオブジェクトを無限に取れる。
//一番左側とそれ以外というオブジェクトと言う考え方。
Object.assign(o1, o2, o3);
//一番右側のo3が優先される。（オブジェクトがどんどん拡張されていくという考え方。）
const newObj = Object.assign(o1, o2, o3);
console.log(o1 === newObj);//true 拡張されたo1が入っている。
//スプレッド構文と同じようにできる
const newObject = Object.assign({}, coffee4, { isHot: true});
console.log(newObject === coffee4);//false　スプレッド構文と同じ、新しいオブジェクトに既存のオブジェクトを入れている。

//分割代入はこうなっている。

const book = {
    title: 'JavaScript course',
    price: 9.99,
};
// ↓const title = book.title;同じ意味になる。
// const { title } = book;
//波括弧で囲むことでオブジェクトのプロパティが取得できる。
// const { title, price } = book;
//console.log(title, price);//JavaScript course 9.99
//複雑な性質を持つ
//①別名を付けることができる。
//const { title: bookTitle, price } = book;//コロンをつけて別名にしている。
// console.log(bookTitle, price);

const book2 = {
    title: 'JavaScript course',
    price: 9.99,
    author: {
        firstName: 'tokio',
        lastName: 'book',
    },
    description: 'aaaa',
};
//const { title: bookTitle, price, author: {firstName, lastName} } = book2;//もう一度{}の中にオブジェクトを書くことができる。
//console.log(bookTitle, price, firstName, lastName);//JavaScript course 9.99 tokio book

const { //let varでも分割代入はできる。 
    title: bookTitle,
    price, 
    author: {firstName, lastName},
    publisher = 'tokio inc',//デフォルト値をつけることもできる。undefinedにならない。
    //publisher: pub = 'tokio inc'で名前を変えることもできる。
    ...etc//取得しない残り全てのものが入る。JavaScript course 9.99 tokio book tokio inc {description: 'aaaa'}
} = book2;
console.log(bookTitle, price, firstName, lastName, publisher, etc);

//関数のパラメーターにも同じルールを適用できる。

const sayBook= ({//関数のパラメーターに分割代入を適用する。
    title: bookTitle,//別名は複雑になってしまう場合がある。
    price,
    author: {firstName, lastName},
    publisher = 'tokio inc',//初期値はあまり定義しない
    ...etc//スプレッド構文もあまり使用しない。
}) => {
    console.log(bookTitle, price, firstName, lastName, publisher, etc);
};
sayBook(book2);//引数を指定しなかった場合エラーになることに注意
//関数のパラメーターに分割代入すると言うのはよく使われる手法
//関数を見た瞬間に、どのプロパティにアクセスしているのか、と言うことがわかるから。
//複雑になりすぎないように注意する必要はある。

//in演算子を利用してプロパティの有無を調べる方法
//trueかfalseが返却される。
console.log('hello' in book);//false
book.title = undefined;
//if(book.title !== undefined)とほぼ同じだが、以下の場合は異なる。
if ('title' in book) {//inはtrueになる。titleは存在するから。
    console.log(book.title);
}

//?.オプショナルチェーンについて
//前の式がnullかundefinedなら後の式は評価せずに、その式を返す（null or undefined)エラーを回避できる。
//使いすぎるとどこがnullかundefinedかわからなくなるので注意。
const user = undefined;
console.log(user?.name);//undefined
//deleteでも使える。
console.log(delete user?.address);//true
//左辺には使えない。
//user?.address = 'hello';//error Invalid left-hand side in assignment

//thisとグローバルオブジェクト
// le レキシカル環境
// -global object
// - this: global object　グローバルオブジェクトはthisというものも持っている。
//thisもグローバルオブジェクトである。
//関数が呼び出される時にレキシカル環境が作られるが、thisというものもある。
//thisの値がどうやってその関数が呼び出されるかによって異なる。
console.log(this);
let sayThis = function() {//レキシカル環境が作られる。
    console.log(this);
};
// le
// outerEnv: global
// this: global object
//実は一緒？ではない！
//use strictを使ったときは、関数の外にあるthisはグローバルオブジェクトを指していて、
//関数の中にあるthisはundefinedになっている。
this.alert = 'hello';//これはできる、グローバルオブジェクトなので
//this='hello'はエラーになる。thisは書き換えられない。

//メソッドの中でthisはこうなっている。

// const car = {
//     color: 'red',
//     sayThis,
//     changeColor: function (color) {
//         this.color = color;//car.colorをthisで定義できる。
//     }
// };
car.sayThis();//carのオブジェクトが返ってきている。
//メソッド(オブジェクトの中の関数)で呼び出した時のthisはそのオブジェクトになる。
// le - (car.sayThis())
// - outerEnv: global
// - this: car

//thisのメリット
const car2 = { ...car };
car2.changeColor('white');//
// const car = {
//     color: 'red',
//     sayThis,
//     changeColor: function (color) {
//         car.color = color;thisではない場合,常にcarになってしまう。
//     }
// };
//console.log(car2);red
//console.log(car);white←carのcolorが変わってしまう。

//thisを使えば色々なオブジェクトに対応できる。柔軟に対応できる。

const tempObj = {
    car,
};
tempObj.car.sayThis();//この場合はcarを指している。どれだけオブジェクトがネストしていても
//メソッドのthisは一つ左のオブジェクトを指している。

//アロー関数のthis
//アロー関数のthisは違う。
//結論＝アロー関数で作られた関数が呼び出されたときはthisを一切持たない。
let sayThisArrow = () => {
    console.log(this);
};
car.sayThisArrow();//global objectを返している。outerEnvを見ている。
//sayThis()でもglobal objectを返している。

//なぜこういう仕様にしているのか？
//どんなメリットがあるのか？
//メソッドの中でコールバック関数を書くとき
let logging = (cb) => {
    console.log(cb());
};
// const car = {
//     color: 'red',
//     sayThis,
//     changeColor: function (color) {
//         logging(function () {
//             return this.color;//このthisはundefinedになる。なぜか？
//         });
//         this.color = color;
//     }
// };
// le - (logging)
// - outerEnv: global
//let logging()を指している。関数が呼び出された場所でレキシカル環境は作られるから。
//アロー関数なのでthisも持たない。

// le - (cb())
// - outerEnv: car.changeColor()
// - this: obj.の呼び出され方じゃないのでundefinedになる。

//メソッドの中に、何かの関数呼び出しがあって、そこの引数がコールバック関数になってることは非常に良くある。

//アロー関数にすれば、全て解決する。
const car = {
    color: 'red',
    sayThis,
    changeColor: function (color) {
        logging(() => {
            return this.color;// 一つ外側のthisを採用するようになる。
        });
        this.color = color;
    }
};
//アロー関数なのでloggingはthisを持たない。outerEnvを見る。

// le - (logging())
// - outerEnv: global

// le - (cb())
// - outerEnv: car.changeColor()

// le - (car.changeColor())
// - outerEnv: global
// - this: car

//アロー関数がないときはどうしていた？
// let that = this;としていた。thisを別の変数に置いていた。
// return that.colorで外側のthisを指し示す。

//applyとcallを使ってthisを指定して関数を呼び出す方法
//thisは関数の呼び出され方によって、javascriptが自動的に値を割り当てるもの
//特定のオブジェクトに指定することもできる。

sayThis = function (a, b) {
    console.log(this, a, b);
};
sayThis.call({ hello: 'hello'}, 1, 2);
//第一引数に好きなオブジェクトを入れることができる。
//このとき、thisはhelloになる。
//callとapplyの引数の渡し方の違い、後ろが配列かどうかの違い。
sayThis.apply({hello: 'hello'}, [1, 2]);
//アロー関数の時は使えない。thisを持っていないから。
//無名関数の時に使う。




