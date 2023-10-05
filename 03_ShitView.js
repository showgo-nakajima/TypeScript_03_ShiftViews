// ユーザー情報の配列を生成（最大人数がユーザー数と同じ）
var minUsers = 400; // 最低でも400人
var numUsers = Math.floor(Math.random() * (999 - minUsers)) + minUsers;
var users = [];
for (var i = 1; i <= numUsers; i++) {
    users.push("\u30E6\u30FC\u30B6\u30FC".concat(i));
}
// チーム数計算
var maxUsersPerTeam = 10; // 1チームあたりの人数を10人に固定
var numTeams = Math.ceil(numUsers / maxUsersPerTeam);
console.log('全社員数：' + numUsers);
console.log('チーム数：' + numTeams);
console.log('1チームの最大人数：' + maxUsersPerTeam);
// 一個前と前々回に表示したユーザーリストを保持する変数
var prevUsers = [];
var prevPrevUsers = [];
// ボタン要素を取得
var button = document.getElementById("generateButton");
// ユーザーリスト要素を取得
var userList = document.getElementById("userList");
// ボタンクリック時の処理
button.addEventListener("click", function () {
    // ユーザー名をシャッフル
    var shuffledUsers = shuffleArray(users);
    // チームごとにユーザーリストを生成
    var teams = [];
    for (var i = 0; i < shuffledUsers.length; i += maxUsersPerTeam) {
        var team = shuffledUsers.slice(i, i + maxUsersPerTeam);
        teams.push(team);
    }
    // 前回と前々回に表示したユーザーリストを更新
    prevPrevUsers = prevUsers;
    prevUsers = teams.flat();
    // ユーザーリストをクリア
    userList.innerHTML = "";
    // チームごとにユーザー名と人数を表示
    teams.forEach(function (team, index) {
        var teamListItem = document.createElement("li");
        teamListItem.textContent = "\u30C1\u30FC\u30E0No: ".concat(index + 1, ": ").concat(team.join(", "), " (\u5408\u8A08\u4EBA\u6570: ").concat(team.length, "\u4EBA)");
        userList.appendChild(teamListItem);
    });
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
