// ユーザー情報の配列
var users = [
    "ユーザー1",
    "ユーザー2",
    "ユーザー3",
    "ユーザー4",
    "ユーザー5",
    "ユーザー6",
    "ユーザー7",
    "ユーザー8",
    "ユーザー9",
    "ユーザー10",
    "ユーザー11",
    "ユーザー12",
    "ユーザー13",
    "ユーザー14",
    "ユーザー15",
    "ユーザー16",
    "ユーザー17",
    "ユーザー18",
    "ユーザー19",
    "ユーザー20",
];
// 一個前に表示した配列のインデックスを保持する変数
var prevIndex = -1;
// ボタン要素を取得
var button = document.getElementById("generateButton");
// ユーザーリスト要素を取得
var userList = document.getElementById("userList");
// ボタンクリック時の処理
button.addEventListener("click", function () {
    // ユーザー名をシャッフル
    var shuffledUsers = shuffleArray(users);
    // 前回と異なるパターンの10人を取得
    var startIndex = getRandomIndex(users.length);
    var selectedUsers = [];
    for (var i = 0; i < 10; i++) {
        var index = (startIndex + i) % users.length;
        selectedUsers.push(shuffledUsers[index]);
    }
    // ユーザーリストをクリア
    userList.innerHTML = "";
    // ユーザー名を表示
    selectedUsers.forEach(function (userName) {
        var listItem = document.createElement("li");
        listItem.textContent = userName;
        userList.appendChild(listItem);
    });
    // 今回の表示が一個前と同じパターンかどうかをチェック
    var currentIndex = shuffledUsers.indexOf(selectedUsers[0]);
    if (currentIndex !== prevIndex) {
        prevIndex = currentIndex;
    }
    else {
        return 0;
    }
});
// 配列をシャッフルする関数
function shuffleArray(array) {
    var _a;
    var shuffled = array.slice();
    for (var i = shuffled.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        _a = [shuffled[j], shuffled[i]], shuffled[i] = _a[0], shuffled[j] = _a[1];
    }
    return shuffled;
}
// ランダムなインデックスを取得する関数
function getRandomIndex(max) {
    return Math.floor(Math.random() * max);
}
