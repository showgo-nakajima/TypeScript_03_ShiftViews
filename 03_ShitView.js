var button = document.getElementById("generateButton");
var userList = document.getElementById("userList");
// ローカルストレージから結果を読み込む関数
function loadResults() {
    var savedResults = localStorage.getItem("teamResults");
    return savedResults ? JSON.parse(savedResults) : [];
}
userList.innerHTML = "";
var numUsersInput = document.getElementById('numUsers');
var teamSizeInput = document.getElementById('teamSize');
button.addEventListener("click", function () {
    //tdの色
    // ul要素を取得
    var userList = document.getElementById("userList");
    // すべてのli要素を取得
    var liElements = userList.querySelectorAll("li");
    // 奇数番号のliに背景色を設定
    for (var i = 0; i < liElements.length; i++) {
        if (i % 2 === 0) {
            // 偶数番号の場合
            liElements[i].style.backgroundColor = "blue";
        }
        else {
            // 奇数番号の場合
            liElements[i].style.backgroundColor = "red";
        }
    }
    var numUsers = parseInt(numUsersInput.value, 10); // テキストボックスからユーザー数を取得
    var teamSize = parseInt(teamSizeInput.value, 10); // テキストボックスからチーム数を取得
    if (isNaN(numUsers) || isNaN(teamSize)) {
        alert('有効な数値を入力してください.');
        return;
    }
    var MaxAttempts = 10000;
    var shuffleCount = 0;
    var uniqueTeams = [];
    // 保存された結果を読み込み
    var savedResults = loadResults();
    // ユーザー生成をこのスコープに移動
    var users = Array.from({ length: numUsers }, function (_, i) { return ({ id: i + 1, name: "\u30E6\u30FC\u30B6\u30FC".concat(i + 1) }); });
    var _loop_1 = function () {
        shuffleCount++;
        var shuffledUsers = shuffleArray(users);
        var teams = [];
        for (var i = 0; i < shuffledUsers.length; i += teamSize) {
            var team = shuffledUsers.slice(i, i + teamSize);
            teams.push(team);
        }
        // 新しいチーム生成時に、過去の結果と重複しないかチェック
        var isUniqueTeam = savedResults.some(function (result) {
            return result.some(function (user) { return teams.every(function (newUser) { return !newUser.some(function (u) { return u.id === user.id; }); }); });
        });
        if (isUniqueTeam) {
            uniqueTeams = teams;
            savedResults.push(teams); // 結果を保存
            saveResults(savedResults); // 保存された結果を更新
        }
    };
    while (uniqueTeams.length === 0 && shuffleCount < MaxAttempts) {
        _loop_1();
    }
    // 以前のチームが被らないように表示
    userList.innerHTML = "";
    uniqueTeams.forEach(function (team, index) {
        var teamListItem = document.createElement("li");
        var teamUserNames = team.map(function (user) { return user.name; }).join(", ");
        teamListItem.textContent = "\u30C1\u30FC\u30E0No: ".concat(index + 1, ": ").concat(teamUserNames, " (\u5408\u8A08\u4EBA\u6570: ").concat(team.length, "\u4EBA)");
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
// ローカルストレージに結果を保存する関数
function saveResults(results) {
    localStorage.setItem("teamResults", JSON.stringify(results));
}
