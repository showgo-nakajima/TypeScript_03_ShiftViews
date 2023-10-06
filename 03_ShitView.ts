const button = document.getElementById("generateButton") as HTMLButtonElement;
const userList = document.getElementById("userList") as HTMLUListElement;

const numUsers: number = 400;
console.log('全社員数：' + numUsers);
userList.innerHTML = "";

const users: { id: number; name: string }[] = Array.from({ length: numUsers }, (_, i) => ({ id: i + 1, name: `ユーザー${i + 1}` }));
let prevUserIndexes: number[] = [];
let prevPrevUserIndexes: number[] = [];

button.addEventListener("click", () => {
  const MaxAttempts = 1000;
  let shuffleCount = 0;
  let uniqueTeams: { id: number; name: string }[][] = [];

  while (uniqueTeams.length === 0 && shuffleCount < MaxAttempts) {
    shuffleCount++;
    const shuffledUsers = shuffleArray(users);
    const teamSize = 10;
    const teams: { id: number; name: string }[][] = [];

    for (let i = 0; i < shuffledUsers.length; i += teamSize) {
      const team = shuffledUsers.slice(i, i + teamSize);
      teams.push(team);
    }

    const teamUserIndexes: number[] = teams.flatMap(team => team.map(user => user.id - 1));

    // 前回と前々回のチーム結果と被らないかチェック
    if (!hasDuplicateUsers(teamUserIndexes, prevUserIndexes) && !hasDuplicateUsers(teamUserIndexes, prevPrevUserIndexes)) {
      uniqueTeams = teams;
    }
  }
//重複チェック結果のメッセージ
  if (uniqueTeams.length === 0) {
    console.log(`${MaxAttempts}回の再試行で前回と前々回のチームと被らない組み合わせが見つかりませんでした。`);
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
  const shiftedUsers = [...users.slice(shuffleCount % numUsers), ...users.slice(0, shuffleCount % numUsers)];
  users.length = 0;//ユーザ配列の中身を空にする
  users.push(...shiftedUsers);

  // 表示するメイン情報
  userList.innerHTML = "";
  uniqueTeams.forEach((team, index) => {
    const teamListItem = document.createElement("li");
    const teamUserNames = team.map(user => user.name).join(", ");
    teamListItem.textContent = `チームNo: ${index + 1}: ${teamUserNames} (合計人数: ${team.length}人)`;
    userList.appendChild(teamListItem);
  });

  prevPrevUserIndexes = prevUserIndexes;//チームパターン情報を更新
  prevUserIndexes = uniqueTeams.flatMap(team => team.map(user => user.id - 1));//配列同士を結合

  console.log(`シャッフル回数: ${shuffleCount}`);
});

function shuffleArray<T>(array: T[]): T[] {//<T>にはteam情報が入る
  const shuffled = array.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {//ユーザー情報をユーザー（社員数）分ランダムに割り当て
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;//シャッフル後のユーザーIDが社員数分格納されている
}

function hasDuplicateUsers(
  currentIndexes: number[],
  prevIndexes: number[]
): boolean {
  return currentIndexes.some((index) => prevIndexes.includes(index));
}




/*-----------------これ以降上記の処理に関係ないコード群----------------------*/

/*--------------
デバッグ機能
--------------*/

// ユーザーデータの数とチームサイズを定義
const numUsers: number = 400; // 全ユーザー数
const teamSize: number = 10; // チームサイズ
console.log('-------------デバッグ結果--------------')
// ユーザーデータを生成
const users: { id: number; name: string }[] = [];
for (let i = 1; i <= numUsers; i++) {
  const user = { id: i, name: `ユーザー${i}` };
  users.push(user);
}

// 前回のチームメンバーのIDを保持する配列
let prevTeamMemberIds: number[] = [];

// チーム再生成の試行回数
let attempts: number = 0;
const maxAttempts: number = 10000;

// チーム生成のメインロジック
while (attempts < maxAttempts) {
  const teams: { id: number; name: string }[][] = [];
  let userIndex: number = 0;

  for (let i = 0; i < numUsers / teamSize; i++) {
    const team: { id: number; name: string }[] = [];
    const availableUserIds = users
      .filter((user) => !prevTeamMemberIds.includes(user.id))
      .map((user) => user.id);

    if (availableUserIds.length < teamSize) {
      // 前回のチームメンバーを含むユーザーが少なすぎる場合は再試行
      break;
    }

    for (let j = 0; j < teamSize; j++) {
      const randomIndex = Math.floor(Math.random() * availableUserIds.length);
      const selectedUserId = availableUserIds.splice(randomIndex, 1)[0];
      const selectedUser = users.find((user) => user.id === selectedUserId);
      if (selectedUser) {
        team.push(selectedUser);
        prevTeamMemberIds.push(selectedUserId);
      }
    }

    teams.push(team);
  }

  if (teams.length === numUsers / teamSize) {
    // 正常にチームが生成された場合
    console.log(`チーム再生成に成功しました（試行回数: ${attempts + 1}回）`);
    break;
  }

  // チーム再生成がうまくいかない場合は、前回のチームメンバーをクリアして再試行
  prevTeamMemberIds = [];
  attempts++;
}

if (attempts >= maxAttempts) {
  console.log(`指定された試行回数内でチーム再生成ができませんでした`);
}

// 生成したチームを表示
teams.forEach((team, index) => {
  const teamNames = team.map((user) => user.name).join(", ");
  console.log(`チームNo: ${index + 1}: ${teamNames}`);
});
