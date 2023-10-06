var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// ボタン要素を取得
var button = document.getElementById("generateButton");
// ユーザーリスト要素を取得
var userList = document.getElementById("userList");
// ユーザー情報の配列を生成（ユーザー数は変更可能）
var numUsers = 430; // 全ユーザー数
var users = [];
for (var i = 1; i <= numUsers; i++) {
    users.push({ id: i, name: "\u30E6\u30FC\u30B6\u30FC".concat(i) });
}
// チーム数を計算（ユーザー数とチームサイズから動的に計算）
var teamSize = 10;
var numTeams = Math.ceil(numUsers / teamSize);
console.log('全社員数：' + numUsers);
console.log('チーム数：' + numTeams);
console.log('1チームの最大人数：' + teamSize);
// 前回に生成したチームのIDを保持する変数
var prevTeamId = -1;
// 生成したチームの組み合わせを保持する変数
var teamCombinations = [];
// ボタンクリック時の処理
button.addEventListener("click", function () {
    // 10人ずつのチームに分ける関数
    function createTeams(users, teamSize) {
        var teams = [];
        for (var i = 0; i < users.length; i += teamSize) {
            var team = users.slice(i, i + teamSize);
            teams.push(team);
        }
        return teams;
    }
    // ユーザーをシャッフルする関数
    function shuffleUsers(users) {
        var _a;
        var shuffledUsers = __spreadArray([], users, true);
        for (var i = shuffledUsers.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            _a = [shuffledUsers[j], shuffledUsers[i]], shuffledUsers[i] = _a[0], shuffledUsers[j] = _a[1];
        }
        return shuffledUsers;
    }
    // チームをシャッフルする関数
    function shuffleTeams(teams) {
        var _a;
        var shuffledTeams = __spreadArray([], teams, true);
        for (var i = shuffledTeams.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            _a = [shuffledTeams[j], shuffledTeams[i]], shuffledTeams[i] = _a[0], shuffledTeams[j] = _a[1];
        }
        return shuffledTeams;
    }
    // ユーザーリストをクリア
    userList.innerHTML = "";
    var isDuplicate = true;
    var newTeamCombinations;
    while (isDuplicate) { //重複する限り、繰り返しシャッフルして新規の組み合わせを生成し続ける
        // ユーザーをシャッフル
        var shuffledUsers = shuffleUsers(users);
        // チームを生成
        var teams = createTeams(shuffledUsers, teamSize);
        // チームをシャッフル
        var shuffledTeams = shuffleTeams(teams);
        newTeamCombinations = shuffledTeams.map(function (team) { return team.map(function (user) { return user.name; }).join(", "); });
        isDuplicate = teamCombinations.some(function (combination) {
            return combination === newTeamCombinations.join(" | ");
        });
    }
    // 選択したチームを表示
    shuffledTeams.forEach(function (team, index) {
        var teamListItem = document.createElement("li");
        teamListItem.textContent = "\u30C1\u30FC\u30E0No: ".concat(index + 1, ": ").concat(team.map(function (user) { return user.name; }).join(", "), " (\u5408\u8A08\u4EBA\u6570: ").concat(team.length, "\u4EBA)");
        userList.appendChild(teamListItem);
    });
    // 重複がない場合、現在のチームの組み合わせを保存
    teamCombinations.push(newTeamCombinations.join(" | "));
    // チームIDを更新（循環する）
    //prevTeamIdは前回表示したチームのID
    // 前回表示したチームのIDを保持し、次に新規のチームを生成するとき、
    // そのIDのチームを表示しないようにする。
    prevTeamId = (prevTeamId + 1) % shuffledTeams.length;
    console.log(prevTeamId);
});
