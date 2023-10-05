// ユーザー情報の配列
var users = [];
// ユーザー情報を生成して配列に追加
for (var i = 1; i <= 400; i++) {
    var userName = "\u30E6\u30FC\u30B6\u30FC".concat(i);
    users.push(userName);
}
// 一度に表示するユーザー数（10人固定）
var usersPerDisplay = 10;
// 一個前と前々回に表示したユーザーリストを保持する変数
var prevUsers = []; //一個前に表示したパターンを格納する配列
var prevPrevUsers = []; //二個前に表示したパターンを格納する配列
// ボタン要素を取得
var button = document.getElementById("generateButton");
// ユーザーリスト要素を取得
var userList = document.getElementById("userList");
// ボタンクリック時の処理
button.addEventListener("click", function () {
    // ユーザー名をシャッフル
    var shuffledUsers = shuffleArray(users);
    // 前回と前々回と異なるパターンのユーザーを取得
    var startIndex = getRandomIndex(users.length);
    var selectedUsers = [];
    for (var i = 0; i < usersPerDisplay; i++) {
        var index = (startIndex + i) % users.length;
        var userName = shuffledUsers[index];
        if (!prevUsers.includes(userName) && !prevPrevUsers.includes(userName)) {
            selectedUsers.push(userName);
        }
    }
    //セレクトされたユーザー数が10人かチェック → もし10人未満・以上である場合は、処理を終わる（何も出力しない）
    if (selectedUsers.length != usersPerDisplay) {
        // selectedUsers.lengthが10になるようにデータを追加
        while (selectedUsers.length < usersPerDisplay) {
            var remainingUsers = shuffledUsers.filter(function (userName) { return !selectedUsers.includes(userName); });
            selectedUsers.push(remainingUsers[0]);
        }
    }
    // ユーザーリストをクリア
    userList.innerHTML = "";
    // ユーザー名を表示
    selectedUsers.forEach(function (userName) {
        var listItem = document.createElement("li");
        listItem.textContent = userName;
        userList.appendChild(listItem);
    });
    // 前回と前々回に表示したユーザーリストを更新
    prevPrevUsers = prevUsers;
    prevUsers = selectedUsers;
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
