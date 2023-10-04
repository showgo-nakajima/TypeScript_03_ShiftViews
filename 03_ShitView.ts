// ユーザー情報の配列
const users: string[] = [
  "ユーザー1",
  "ユーザー2",
  "ユーザー3",
  "ユーザー4",
  "ユーザー5",
  "ユーザー6",
  "ユーザー7",
  "ユーザー8",
  "ユーザー9",
  "ユーザー10",
  "ユーザー11",
  "ユーザー12",
  "ユーザー13",
  "ユーザー14",
  "ユーザー15",
  "ユーザー16",
  "ユーザー17",
  "ユーザー18",
  "ユーザー19",
  "ユーザー20",
];

// 一個前に表示した配列のインデックスを保持する変数
let prevIndex = -1;

// ボタン要素を取得
const button = document.getElementById("generateButton") as HTMLButtonElement;

// ユーザーリスト要素を取得
const userList = document.getElementById("userList") as HTMLUListElement;

// ボタンクリック時の処理
button.addEventListener("click", () => {
  // ユーザー名をシャッフル
  const shuffledUsers = shuffleArray(users);

  // 前回と異なるパターンの10人を取得
  const startIndex = getRandomIndex(users.length);
  let selectedUsers: string[] = [];

  for (let i = 0; i < 10; i++) {
      const index = (startIndex + i) % users.length;
      selectedUsers.push(shuffledUsers[index]);
  }

  // ユーザーリストをクリア
  userList.innerHTML = "";

  // ユーザー名を表示
  selectedUsers.forEach(userName => {
      const listItem = document.createElement("li");
      listItem.textContent = userName;
      userList.appendChild(listItem);
  });

  // 今回の表示が一個前と同じパターンかどうかをチェック
  const currentIndex = shuffledUsers.indexOf(selectedUsers[0]);
  if (currentIndex !== prevIndex) {
      prevIndex = currentIndex;
  } else {
    return 0;
  }
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

// ランダムなインデックスを取得する関数
function getRandomIndex(max: number): number {
  return Math.floor(Math.random() * max);
}
