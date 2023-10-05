// ユーザー情報の配列
const users: string[] = [];

// ユーザー情報を生成して配列に追加
for (let i = 1; i <= 400; i++) {
    const userName = `ユーザー${i}`;
    users.push(userName);
}

// 一度に表示するユーザー数（10人固定）
const usersPerDisplay = 10;

// 一個前と前々回に表示したユーザーリストを保持する変数
let prevUsers: string[] = [];//一個前に表示したパターンを格納する配列
let prevPrevUsers: string[] = [];//二個前に表示したパターンを格納する配列

// ボタン要素を取得
const button = document.getElementById("generateButton") as HTMLButtonElement;

// ユーザーリスト要素を取得
const userList = document.getElementById("userList") as HTMLUListElement;

// ボタンクリック時の処理
button.addEventListener("click", () => {
    // ユーザー名をシャッフル
    const shuffledUsers = shuffleArray(users);

    // 前回と前々回と異なるパターンのユーザーを取得
    const startIndex = getRandomIndex(users.length);
    let selectedUsers: string[] = [];

    for (let i = 0; i < usersPerDisplay; i++) {
        const index = (startIndex + i) % users.length;
        const userName = shuffledUsers[index];
        if (!prevUsers.includes(userName) && !prevPrevUsers.includes(userName)) {
            selectedUsers.push(userName);
        }
    }

    //セレクトされたユーザー数が10人かチェック → もし10人未満・以上である場合は、処理を終わる（何も出力しない）
    if (selectedUsers.length != usersPerDisplay) {
        // selectedUsers.lengthが10になるようにデータを追加
        while (selectedUsers.length < usersPerDisplay) {
            const remainingUsers = shuffledUsers.filter(userName => !selectedUsers.includes(userName));
            selectedUsers.push(remainingUsers[0]);
        }
    }

    // ユーザーリストをクリア
    userList.innerHTML = "";

    // ユーザー名を表示
    selectedUsers.forEach(userName => {
        const listItem = document.createElement("li");
        listItem.textContent = userName;
        userList.appendChild(listItem);
    });

    // 前回と前々回に表示したユーザーリストを更新
    prevPrevUsers = prevUsers;
    prevUsers = selectedUsers;
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
