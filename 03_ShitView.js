var button = document.getElementById("generateButton");
var userList = document.getElementById("userList");
var numUsers = 20;
console.log('全社員数：' + numUsers);
userList.innerHTML = "";
var users = Array.from({ length: numUsers }, function (_, i) { return ({ id: i + 1, name: "\u30E6\u30FC\u30B6\u30FC".concat(i + 1) }); });
button.addEventListener("click", function () {
    var MaxAttempts = 10000;
    var shuffleCount = 0;
    var uniqueTeams = [];
    while (uniqueTeams.length === 0 && shuffleCount < MaxAttempts) {
        shuffleCount++;
        var shuffledUsers = shuffleArray(users);
        var teamSize = 5;
        var teams = [];
        for (var i = 0; i < shuffledUsers.length; i += teamSize) {
            var team = shuffledUsers.slice(i, i + teamSize);
            teams.push(team);
        }
        // 新しいチーム生成時に、過去のチームのユーザーと被らないかチェック
        var isUniqueTeam = !uniqueTeams.some(function (existingTeam) {
            return existingTeam.some(function (user) { return team.some(function (newUser) { return newUser.id === user.id; }); });
        });
        if (isUniqueTeam) {
            uniqueTeams = teams;
        }
    }
    if (uniqueTeams.length === 0) {
        console.log("".concat(MaxAttempts, "\u56DE\u306E\u518D\u8A66\u884C\u3067\u524D\u56DE\u3068\u524D\u3005\u56DE\u306E\u30C1\u30FC\u30E0\u3068\u88AB\u3089\u306A\u3044\u7D44\u307F\u5408\u308F\u305B\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3067\u3057\u305F\u3002"));
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
function shuffleArray(array) {
    var _a;
    var shuffled = array.slice();
    for (var i = shuffled.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        _a = [shuffled[j], shuffled[i]], shuffled[i] = _a[0], shuffled[j] = _a[1];
    }
    return shuffled;
}
