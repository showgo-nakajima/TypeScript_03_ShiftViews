// ブログ記事クラス
var BlogPost = /** @class */ (function () {
    function BlogPost(id, title, content, update) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.update = update;
    }
    return BlogPost;
}());
// ブログアプリケーションクラス
var BlogApp = /** @class */ (function () {
    function BlogApp() {
        var _this = this;
        this.blogPosts = [];
        var addButton = document.getElementById('add-button');
        addButton.addEventListener('click', function () { return _this.addBlogPostFromInput(); });
    }
    // ブログ記事を表示する関数
    BlogApp.prototype.displayAllBlogPosts = function () {
        var _this = this;
        var blogList = document.getElementById('blog-list');
        blogList.innerHTML = ''; // 既存の内容をクリア
        this.blogPosts.forEach(function (post) {
            // ブログ記事を表示する要素を作成
            var li = document.createElement('li');
            var title = document.createElement('h2');
            title.textContent = "\u3010".concat(post.title, "\u3011");
            var dateTime = document.createElement('p');
            var date = new Date(post.update).toLocaleDateString(); // 日付の取得
            var time = new Date(post.update).toLocaleTimeString(); // 時間の取得
            dateTime.textContent = "\u4F5C\u6210\u65E5\u6642: ".concat(date, " ").concat(time); // 日付と時間を表示
            var content = document.createElement('p');
            content.textContent = "\u5185\u5BB9: ".concat(post.content);
            // 削除ボタンを作成
            var deleteButton = document.createElement('button');
            deleteButton.textContent = '削除';
            deleteButton.addEventListener('click', function () { return _this.deleteBlogPost(post.id); });
            //背景色を指定したクラスを追加
            li.classList.add('gray-background');
            // 記事の要素をリストに追加
            li.appendChild(title);
            li.appendChild(dateTime);
            li.appendChild(content);
            li.appendChild(deleteButton);
            blogList.appendChild(li);
        });
    };
    // ブログ記事を追加するメソッド
    BlogApp.prototype.addBlogPost = function (post) {
        this.blogPosts.push(post);
        this.displayAllBlogPosts(); // 記事を追加後、更新した記事一覧を表示
    };
    // ユーザーからの入力からブログ記事を追加するメソッド
    BlogApp.prototype.addBlogPostFromInput = function () {
        var titleInput = document.getElementById('title');
        var contentInput = document.getElementById('content');
        var title = titleInput.value.trim();
        var content = contentInput.value.trim();
        //タイトル&内容の入力チェック
        if (!title || !content) {
            alert('タイトルと記事内容を入力してください。');
            return;
        }
        var dateTime = new Date().toLocaleString(); // 投稿日時（現在の日付と時間）を取得
        var newPost = new BlogPost(null, title, content, dateTime);
        this.addBlogPost(newPost);
        // 入力フィールドをクリア
        titleInput.value = '';
        contentInput.value = '';
    };
    // 指定したIDのブログ記事を削除するメソッド
    BlogApp.prototype.deleteBlogPost = function (postId) {
        var index = this.blogPosts.findIndex(function (post) { return post.id === postId; });
        if (index !== -1) {
            this.blogPosts.splice(index, 1);
            this.displayAllBlogPosts(); // 記事を削除後、更新した記事一覧を表示
        }
    };
    // 初期表示時にブログ記事一覧を表示
    BlogApp.prototype.run = function () {
        this.displayAllBlogPosts();
    };
    return BlogApp;
}());
var blogApp = new BlogApp();
// アプリケーションの実行を開始
blogApp.run();
