var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var button = document.getElementById("generateButton");
var userList = document.getElementById("userList");
var numUsers = 400;
console.log('全社員数：' + numUsers);
userList.innerHTML = "";
var users = Array.from({ length: numUsers }, function (_, i) { return ({ id: i + 1, name: "\u30E6\u30FC\u30B6\u30FC".concat(i + 1) }); });
var prevUserIndexes = [];
var prevPrevUserIndexes = [];
button.addEventListener("click", function () {
    var MaxAttempts = 1000;
    var shuffleCount = 0;
    var uniqueTeams = [];
    while (uniqueTeams.length === 0 && shuffleCount < MaxAttempts) {
        shuffleCount++;
        var shuffledUsers = shuffleArray(users);
        var teamSize_1 = 10;
        var teams = [];
        for (var i = 0; i < shuffledUsers.length; i += teamSize_1) {
            var team = shuffledUsers.slice(i, i + teamSize_1);
            teams.push(team);
        }
        var teamUserIndexes = teams.flatMap(function (team) { return team.map(function (user) { return user.id - 1; }); });
        // 前回と前々回のチーム結果と被らないかチェック
        if (!hasDuplicateUsers(teamUserIndexes, prevUserIndexes) && !hasDuplicateUsers(teamUserIndexes, prevPrevUserIndexes)) {
            uniqueTeams = teams;
        }
    }
    //重複チェック結果のメッセージ
    if (uniqueTeams.length === 0) {
        console.log("".concat(MaxAttempts, "\u56DE\u306E\u518D\u8A66\u884C\u3067\u524D\u56DE\u3068\u524D\u3005\u56DE\u306E\u30C1\u30FC\u30E0\u3068\u88AB\u3089\u306A\u3044\u7D44\u307F\u5408\u308F\u305B\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3067\u3057\u305F\u3002"));
    }
    /*
    ■メモ
    shuffleCount % numUsers は、シャッフル回数 (shuffleCount) を全ユーザー数 (numUsers) で割った余りを計算します。これにより、シャッフル回数がユーザー数を超えた場合にも正しいシャッフルが行えます。
    
    users.slice(shuffleCount % numUsers) は、元の users 配列から計算した余りの位置から末尾までの部分配列を取得する。
    そして、シャッフルされたユーザーが配列の最初にくるようになる。
    users.slice(0, shuffleCount % numUsers) は、元の users 配列から先頭から余りの位置までの部分配列を取得する。
    これにより、シャッフルされたユーザーの残り部分が配列の末尾にくるようになります。
    shiftedUsers 配列は、上記の2つの部分配列を連結して作成される。
    これにより、元の users 配列の要素がシャッフルされた形の順序で格納される。
    最後に、元の users 配列を空にクリア (users.length = 0) し、その後 shiftedUsers 配列の要素を users 配列にコピーします
    (users.push(...shiftedUsers))。これにより、元の users 配列がシャッフルされた状態に更新されます。
    */
    // ユーザーデータを一つずつずらす
    var shiftedUsers = __spreadArray(__spreadArray([], users.slice(shuffleCount % numUsers), true), users.slice(0, shuffleCount % numUsers), true);
    users.length = 0; //ユーザ配列の中身を空にする
    users.push.apply(//ユーザ配列の中身を空にする
    users, shiftedUsers);
    // 表示するメイン情報
    userList.innerHTML = "";
    uniqueTeams.forEach(function (team, index) {
        var teamListItem = document.createElement("li");
        var teamUserNames = team.map(function (user) { return user.name; }).join(", ");
        teamListItem.textContent = "\u30C1\u30FC\u30E0No: ".concat(index + 1, ": ").concat(teamUserNames, " (\u5408\u8A08\u4EBA\u6570: ").concat(team.length, "\u4EBA)");
        userList.appendChild(teamListItem);
    });
    prevPrevUserIndexes = prevUserIndexes; //チームパターン情報を更新
    prevUserIndexes = uniqueTeams.flatMap(function (team) { return team.map(function (user) { return user.id - 1; }); }); //配列同士を結合
    console.log("\u30B7\u30E3\u30C3\u30D5\u30EB\u56DE\u6570: ".concat(shuffleCount));
});
function shuffleArray(array) {
    var _a;
    var shuffled = array.slice();
    for (var i = shuffled.length - 1; i > 0; i--) { //ユーザー情報をユーザー（社員数）分ランダムに割り当て
        var j = Math.floor(Math.random() * (i + 1));
        _a = [shuffled[j], shuffled[i]], shuffled[i] = _a[0], shuffled[j] = _a[1];
    }
    return shuffled; //シャッフル後のユーザーIDが社員数分格納されている
}
function hasDuplicateUsers(currentIndexes, prevIndexes) {
    return currentIndexes.some(function (index) { return prevIndexes.includes(index); });
}
/*-----------------これ以降上記の処理に関係ないコード群----------------------*/
/*--------------
デバッグ機能
--------------*/
// ユーザーデータの数とチームサイズを定義
var numUsers = 400; // 全ユーザー数
var teamSize = 10; // チームサイズ
console.log('-------------デバッグ結果--------------');
// ユーザーデータを生成
var users = [];
for (var i = 1; i <= numUsers; i++) {
    var user = { id: i, name: "\u30E6\u30FC\u30B6\u30FC".concat(i) };
    users.push(user);
}
// 前回のチームメンバーのIDを保持する配列
var prevTeamMemberIds = [];
// チーム再生成の試行回数
var attempts = 0;
var maxAttempts = 10000;
// チーム生成のメインロジック
while (attempts < maxAttempts) {
    var teams = [];
    var userIndex = 0;
    for (var i = 0; i < numUsers / teamSize; i++) {
        var team = [];
        var availableUserIds = users
            .filter(function (user) { return !prevTeamMemberIds.includes(user.id); })
            .map(function (user) { return user.id; });
        if (availableUserIds.length < teamSize) {
            // 前回のチームメンバーを含むユーザーが少なすぎる場合は再試行
            break;
        }
        var _loop_1 = function (j) {
            var randomIndex = Math.floor(Math.random() * availableUserIds.length);
            var selectedUserId = availableUserIds.splice(randomIndex, 1)[0];
            var selectedUser = users.find(function (user) { return user.id === selectedUserId; });
            if (selectedUser) {
                team.push(selectedUser);
                prevTeamMemberIds.push(selectedUserId);
            }
        };
        for (var j = 0; j < teamSize; j++) {
            _loop_1(j);
        }
        teams.push(team);
    }
    if (teams.length === numUsers / teamSize) {
        // 正常にチームが生成された場合
        console.log("\u30C1\u30FC\u30E0\u518D\u751F\u6210\u306B\u6210\u529F\u3057\u307E\u3057\u305F\uFF08\u8A66\u884C\u56DE\u6570: ".concat(attempts + 1, "\u56DE\uFF09"));
        break;
    }
    // チーム再生成がうまくいかない場合は、前回のチームメンバーをクリアして再試行
    prevTeamMemberIds = [];
    attempts++;
}
if (attempts >= maxAttempts) {
    console.log("\u6307\u5B9A\u3055\u308C\u305F\u8A66\u884C\u56DE\u6570\u5185\u3067\u30C1\u30FC\u30E0\u518D\u751F\u6210\u304C\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F");
}
// 生成したチームを表示
teams.forEach(function (team, index) {
    var teamNames = team.map(function (user) { return user.name; }).join(", ");
    console.log("\u30C1\u30FC\u30E0No: ".concat(index + 1, ": ").concat(teamNames));
});
