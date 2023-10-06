// ボタン要素を取得
const button = document.getElementById("generateButton") as HTMLButtonElement;

// ユーザーリスト要素を取得
const userList = document.getElementById("userList") as HTMLUListElement;

// ユーザー情報の配列を生成（ユーザー数は変更可能）
const numUsers = 430; // 全ユーザー数
const users: { id: number; name: string }[] = [];
for (let i = 1; i <= numUsers; i++) {
  users.push({ id: i, name: `ユーザー${i}` });
}

// チーム数を計算（ユーザー数とチームサイズから動的に計算）
const teamSize = 10;
const numTeams = Math.ceil(numUsers / teamSize);

console.log('全社員数：' + numUsers);
console.log('チーム数：' + numTeams);
console.log('1チームの最大人数：' + teamSize);

// 前回に生成したチームのIDを保持する変数
let prevTeamId = -1;//1回目に作成されたチームのIDを、0とする為

// 生成したチームの組み合わせを保持する変数
let teamCombinations: string[] = [];

// ボタンクリック時の処理
button.addEventListener("click", () => {
  // 10人ずつのチームに分ける関数
  function createTeams(users: { id: number; name: string }[], teamSize: number): { id: number; name: string }[][] {
    const teams: { id: number; name: string }[][] = [];
    for (let i = 0; i < users.length; i += teamSize) {
      const team = users.slice(i, i + teamSize);
      teams.push(team);
    }
    return teams;
  }

  // ユーザーをシャッフルする関数
  function shuffleUsers(users: { id: number; name: string }[]): { id: number; name: string }[] {
    const shuffledUsers = [...users];
    for (let i = shuffledUsers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledUsers[i], shuffledUsers[j]] = [shuffledUsers[j], shuffledUsers[i]];
    }
    return shuffledUsers;
  }

  // チームをシャッフルする関数
  function shuffleTeams(teams: { id: number; name: string }[][]): { id: number; name: string }[][] {
    const shuffledTeams = [...teams];
    for (let i = shuffledTeams.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledTeams[i], shuffledTeams[j]] = [shuffledTeams[j], shuffledTeams[i]];
    }
    return shuffledTeams;
  }

  // ユーザーリストをクリア
  userList.innerHTML = "";

  let isDuplicate = true;
  let newTeamCombinations: string[];
  while (isDuplicate) {//重複する限り、繰り返しシャッフルして新規の組み合わせを生成し続ける
    // ユーザーをシャッフル
    const shuffledUsers = shuffleUsers(users);
    // チームを生成
    const teams = createTeams(shuffledUsers, teamSize);
    // チームをシャッフル
    const shuffledTeams = shuffleTeams(teams);
    newTeamCombinations = shuffledTeams.map((team) => team.map((user) => user.name).join(", "));
    isDuplicate = teamCombinations.some((combination) => {
      return combination === newTeamCombinations.join(" | ");
    });
  }

  // 選択したチームを表示
  shuffledTeams.forEach((team, index) => {
    const teamListItem = document.createElement("li");
    teamListItem.textContent = `チームNo: ${index + 1}: ${team.map((user) => user.name).join(", ")} (合計人数: ${team.length}人)`;
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
