// スケジュールの一覧
var schedules = [];
// フォームと一覧要素への参照を取得
var scheduleForm = document.getElementById("scheduleForm");
var titleInput = document.getElementById("title");
var dateInput = document.getElementById("date");
var descriptionInput = document.getElementById("description");
var scheduleList = document.getElementById("scheduleList");
var errorDisplay = document.getElementById("errorDisplay");
var completionMessage = document.getElementById("completionMessage");
var messageDisplayTime = 5000; // メッセージを表示する時間（ミリ秒）
// フォームの送信時の処理
scheduleForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var title = titleInput.value.trim();
    var dateString = dateInput.value;
    var description = descriptionInput.value.trim();
    if (title && dateString) {
        var date = new Date(dateString);
        if (!isNaN(date.getTime())) {
            addSchedule(title, date, description);
        }
        else {
            displayError("Invalid date format. Please use YYYY-MM-DD.");
        }
    }
    else {
        displayError("Title and date are required.");
    }
    // 入力フォームをクリア
    titleInput.value = "";
    dateInput.value = "";
    descriptionInput.value = "";
});
// スケジュールを追加する関数
function addSchedule(title, date, description) {
    var newSchedule = {
        id: schedules.length + 1,
        title: title,
        date: date,
        description: description,
        deleted: false,
    };
    schedules.push(newSchedule);
    displaySchedules();
}
// スケジュールを削除する関数
function deleteSchedule(id) {
    console.log("deleteSchedule called with id: ".concat(id));
    var deletedIndex = -1;
    for (var i = 0; i < schedules.length; i++) {
        if (schedules[i].id === id) {
            deletedIndex = i;
            break;
        }
    }
    if (deletedIndex !== -1) {
        var deletedSchedule = schedules.splice(deletedIndex, 1)[0]; // スケジュールを削除し、削除されたスケジュールを取得
        // 削除メッセージを表示
        completionMessage.textContent = "\"".concat(deletedSchedule.title, "\"\u306F\u5B8C\u4E86\u3057\u307E\u3057\u305F\u306D\uFF01");
        completionMessage.style.display = "block";
        // メッセージを非表示にするタイマーを設定
        setTimeout(function () {
            completionMessage.style.display = "none";
        }, messageDisplayTime);
        // コンソールに削除メッセージを表示
        console.log("\"".concat(deletedSchedule.title, "\" \u304C\u524A\u9664\u3055\u308C\u307E\u3057\u305F"));
    }
    displaySchedules();
}
// スケジュールを表示する関数
function displaySchedules() {
    scheduleList.innerHTML = "";
    var _loop_1 = function (schedule) {
        var listItem = document.createElement("li");
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "削除";
        // 削除ボタンのクリックイベントリスナを追加
        deleteButton.addEventListener("click", function () {
            deleteSchedule(schedule.id);
            // クリックされたボタンの親要素である <li> を非表示にする
            listItem.style.display = "none";
        });
        listItem.innerHTML += "Title: ".concat(schedule.title, ", Date: ").concat(schedule.date.toLocaleDateString(), ", Description: ").concat(schedule.description);
        if (schedule.deleted) {
            listItem.style.textDecoration = "line-through";
        }
        // <li> をリストに追加
        scheduleList.appendChild(listItem);
        listItem.appendChild(deleteButton);
    };
    for (var _i = 0, schedules_1 = schedules; _i < schedules_1.length; _i++) {
        var schedule = schedules_1[_i];
        _loop_1(schedule);
    }
}
// エラーメッセージを表示する関数
function displayError(message) {
    errorDisplay.textContent = message;
    errorDisplay.style.display = "block";
}
// 初期表示
displaySchedules();
