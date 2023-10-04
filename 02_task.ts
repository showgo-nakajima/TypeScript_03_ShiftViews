// スケジュールの型定義
interface Schedule {
  id: number;
  title: string;
  date: Date;
  description: string;
  deleted?: boolean; // 削除状態を管理するプロパティ
}

// スケジュールの一覧
const schedules: Schedule[] = [];

// フォームと一覧要素への参照を取得
const scheduleForm = document.getElementById("scheduleForm") as HTMLFormElement;
const titleInput = document.getElementById("title") as HTMLInputElement;
const dateInput = document.getElementById("date") as HTMLInputElement;
const descriptionInput = document.getElementById("description") as HTMLInputElement;
const scheduleList = document.getElementById("scheduleList") as HTMLUListElement;
const errorDisplay = document.getElementById("errorDisplay") as HTMLDivElement;
const completionMessage = document.getElementById("completionMessage") as HTMLDivElement;
const messageDisplayTime = 5000; // メッセージを表示する時間（ミリ秒）

// フォームの送信時の処理
scheduleForm.addEventListener("submit", function (e: Event) {
  e.preventDefault();

  const title = titleInput.value.trim();
  const dateString = dateInput.value;
  const description = descriptionInput.value.trim();

  if (title && dateString) {
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      addSchedule(title, date, description);
    } else {
      displayError("Invalid date format. Please use YYYY-MM-DD.");
    }
  } else {
    displayError("Title and date are required.");
  }

  // 入力フォームをクリア
  titleInput.value = "";
  dateInput.value = "";
  descriptionInput.value = "";
});

// スケジュールを追加する関数
function addSchedule(title: string, date: Date, description: string): void {
  const newSchedule: Schedule = {
    id: schedules.length + 1,
    title,
    date,
    description,
    deleted: false,
  };
  schedules.push(newSchedule);
  displaySchedules();
}

// スケジュールを削除する関数
function deleteSchedule(id: number): void {
  console.log(`deleteSchedule called with id: ${id}`);

  let deletedIndex = -1;
  for (let i = 0; i < schedules.length; i++) {
    if (schedules[i].id === id) {
      deletedIndex = i;
      break;
    }
  }

  if (deletedIndex !== -1) {
    const deletedSchedule = schedules.splice(deletedIndex, 1)[0]; // スケジュールを削除し、削除されたスケジュールを取得

    // 削除メッセージを表示
    completionMessage.textContent = `"${deletedSchedule.title}"は完了しましたね！`;
    completionMessage.style.display = "block";

    // メッセージを非表示にするタイマーを設定
    setTimeout(() => {
      completionMessage.style.display = "none";
    }, messageDisplayTime);

    // コンソールに削除メッセージを表示
    console.log(`"${deletedSchedule.title}" が削除されました`);
  }

  displaySchedules();
}

// スケジュールを表示する関数
function displaySchedules(): void {
  scheduleList.innerHTML = "";

  for (const schedule of schedules) {
    const listItem = document.createElement("li");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "完了";

    // 削除ボタンのクリックイベントリスナを追加
    deleteButton.addEventListener("click", () => {
      deleteSchedule(schedule.id);
      // クリックされたボタンの親要素である <li> を非表示にする
      listItem.style.display = "none";
    });

    listItem.innerHTML += `Title: ${schedule.title}, Date: ${schedule.date.toLocaleDateString()}, Description: ${schedule.description}`;

    if (schedule.deleted) {
      listItem.style.textDecoration = "line-through";
    }

    // <li> をリストに追加
    scheduleList.appendChild(listItem);
    listItem.appendChild(deleteButton);
  }
}

// エラーメッセージを表示する関数
function displayError(message: string): void {
  errorDisplay.textContent = message;
  errorDisplay.style.display = "block";
}

// 初期表示
displaySchedules();
