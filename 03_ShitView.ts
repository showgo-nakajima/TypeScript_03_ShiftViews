// ユーザー情報の配列を生成（最大人数がユーザー数と同じ）
const minUsers = 400; // 最低でも400人
const numUsers = Math.floor(Math.random() * (999 - minUsers)) + minUsers;
const users: string[] = [];
for (let i = 1; i <= numUsers; i++) {
  users.push(`ユーザー${i}`);
}

// チーム数計算
const maxUsersPerTeam = 10; // 1チームあたりの人数を10人に固定
const numTeams = Math.ceil(numUsers / maxUsersPerTeam);

console.log('全社員数：' + numUsers);
console.log('チーム数：' + numTeams);
console.log('1チームの最大人数：' + maxUsersPerTeam);

// 一個前と前々回に表示したユーザーリストを保持する変数
let prevUsers: string[] = [];
let prevPrevUsers: string[] = [];

// ボタン要素を取得
const button = document.getElementById("generateButton") as HTMLButtonElement;

// ユーザーリスト要素を取得
const userList = document.getElementById("userList") as HTMLUListElement;

// ボタンクリック時の処理
button.addEventListener("click", () => {
  // ユーザー名をシャッフル
  const shuffledUsers = shuffleArray(users);

  // チームごとにユーザーリストを生成
  const teams: string[][] = [];
  for (let i = 0; i < shuffledUsers.length; i += maxUsersPerTeam) {
    const team = shuffledUsers.slice(i, i + maxUsersPerTeam);
    teams.push(team);
  }

  // 前回と前々回に表示したユーザーリストを更新
  prevPrevUsers = prevUsers;
  prevUsers = teams.flat();

  // ユーザーリストをクリア
  userList.innerHTML = "";

  // チームごとにユーザー名と人数を表示
  teams.forEach((team, index) => {
    const teamListItem = document.createElement("li");
    teamListItem.textContent = `チームNo: ${index + 1}: ${team.join(", ")} (合計人数: ${team.length}人)`;
    userList.appendChild(teamListItem);
  });
});

// 配列をシャッフルする関数
function shuffleArray(array: any[]): any[] {
  const shuffled = array.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
