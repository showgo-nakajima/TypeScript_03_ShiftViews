// 03_ShitView.ts
const button = document.getElementById("generateButton") as HTMLButtonElement;
const userList = document.getElementById("userList") as HTMLUListElement;

// ローカルストレージから結果を読み込む関数
function loadResults(): User[][] {
    const savedResults = localStorage.getItem("teamResults");
    return savedResults ? JSON.parse(savedResults) : [];
}

userList.innerHTML = "";

type User = { id: number; name: string };
let numUsersInput = document.getElementById('numUsers') as HTMLInputElement;
let teamSizeInput = document.getElementById('teamSize') as HTMLInputElement;

button.addEventListener("click", () => {
  //tdの色
  // ul要素を取得
  const userList = document.getElementById("userList");

  // すべてのli要素を取得
  const liElements = userList.querySelectorAll("li");

  // 奇数番号のliに背景色を設定
  for (let i = 0; i < liElements.length; i++) {
    if (i % 2 === 0) {
      // 偶数番号の場合
      liElements[i].style.backgroundColor = "blue";
    } else {
      // 奇数番号の場合
      liElements[i].style.backgroundColor = "red";
    }
  }

  const numUsers: number = parseInt(numUsersInput.value, 10); // テキストボックスからユーザー数を取得
  const teamSize: number = parseInt(teamSizeInput.value, 10); // テキストボックスからチーム数を取得

  if (isNaN(numUsers) || isNaN(teamSize)) {
      alert('有効な数値を入力してください.');
      return;
  }

  const MaxAttempts: number = 10000;
  let shuffleCount: number = 0;
  let uniqueTeams: User[][] = [];

  // 保存された結果を読み込み
  const savedResults = loadResults();

  // ユーザー生成をこのスコープに移動
  const users = Array.from({ length: numUsers }, (_, i) => ({ id: i + 1, name: `ユーザー${i + 1}` }));

  while (uniqueTeams.length === 0 && shuffleCount < MaxAttempts) {
      shuffleCount++;
      const shuffledUsers = shuffleArray(users);
      const teams: User[][] = [];

      for (let i = 0; i < shuffledUsers.length; i += teamSize) {
          const team = shuffledUsers.slice(i, i + teamSize);
          teams.push(team);
      }

      // 新しいチーム生成時に、過去の結果と重複しないかチェック
      const isUniqueTeam = savedResults.some((result) =>
          result.some((user) => teams.every(newUser => !newUser.some(u => u.id === user.id)))
      );

      if (isUniqueTeam) {
          uniqueTeams = teams;
          savedResults.push(teams); // 結果を保存
          saveResults(savedResults); // 保存された結果を更新
      }
  }

  // if (uniqueTeams.length === 0) {
  //     console.log(`${MaxAttempts}回の再試行で重複しない組み合わせが見つかりませんでした.`);
  // }

  // 以前のチームが被らないように表示
  userList.innerHTML = "";
  uniqueTeams.forEach((team, index) => {
      const teamListItem = document.createElement("li");
      const teamUserNames: string = team.map(user => user.name).join(", ");
      teamListItem.textContent = `チームNo: ${index + 1}: ${teamUserNames} (合計人数: ${team.length}人)`;
      userList.appendChild(teamListItem);
  });
});


// 配列をシャッフルする関数
function shuffleArray<T>(array: T[]): T[] {
    const shuffled = array.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// ローカルストレージに結果を保存する関数
function saveResults(results: User[][]): void {
    localStorage.setItem("teamResults", JSON.stringify(results));
}
