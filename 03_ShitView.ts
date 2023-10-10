const button = document.getElementById("generateButton") as HTMLButtonElement;
const userList = document.getElementById("userList") as HTMLUListElement;

const numUsers: number = 20;
console.log('全社員数：' + numUsers);
userList.innerHTML = "";

type User = { id: number; name: string };

const users: User[] = Array.from({ length: numUsers }, (_, i) => ({ id: i + 1, name: `ユーザー${i + 1}` }));

button.addEventListener("click", () => {
  const MaxAttempts: number = 10000;
  let shuffleCount: number = 0;
  let uniqueTeams: User[][] = [];

  while (uniqueTeams.length === 0 && shuffleCount < MaxAttempts) {
    shuffleCount++;
    const shuffledUsers = shuffleArray(users);
    const teamSize: number = 5;
    const teams: User[][] = [];

    for (let i = 0; i < shuffledUsers.length; i += teamSize) {
      const team = shuffledUsers.slice(i, i + teamSize);
      teams.push(team);
    }

    // 新しいチーム生成時に、過去のチームのユーザーと被らないかチェック
    const isUniqueTeam = !uniqueTeams.some((existingTeam) =>
      existingTeam.some((user) => team.some((newUser) => newUser.id === user.id))
    );

    if (isUniqueTeam) {
      uniqueTeams = teams;
    }
  }

  if (uniqueTeams.length === 0) {
    console.log(`${MaxAttempts}回の再試行で前回と前々回のチームと被らない組み合わせが見つかりませんでした。`);
  }

  // 以前のチームが被らないように表示
  userList.innerHTML = "";
  uniqueTeams.forEach((team, index) => {
    const teamListItem = document.createElement("li");
    const teamUserNames: string = team.map(user => user.name).join(", ");
    teamListItem.textContent = `チームNo: ${index + 1}: ${teamUserNames} (合計人数: ${team.length}人)`;
    userList.appendChild(teamListItem);
  });
});

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = array.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
