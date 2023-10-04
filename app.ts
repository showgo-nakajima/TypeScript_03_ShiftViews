// ブログ記事クラス
class BlogPost {
  constructor(public id: number, public title: string, public content: string, public update: string) {}
}

// ブログアプリケーションクラス
class BlogApp {
  private blogPosts: BlogPost[] = [];

  constructor() {
      const addButton = document.getElementById('add-button');
      addButton.addEventListener('click', () => this.addBlogPostFromInput());
  }

  // ブログ記事を表示する関数
  displayAllBlogPosts() {
      const blogList = document.getElementById('blog-list');
      blogList.innerHTML = ''; // 既存の内容をクリア

      this.blogPosts.forEach((post) => {
          // ブログ記事を表示する要素を作成
          const li = document.createElement('li');
          const title = document.createElement('h2');
          title.textContent = `【${post.title}】`;
          const dateTime = document.createElement('p');
          const date = new Date(post.update).toLocaleDateString(); // 日付の取得
          const time = new Date(post.update).toLocaleTimeString(); // 時間の取得
          dateTime.textContent = `作成日時: ${date} ${time}`; // 日付と時間を表示
          const content = document.createElement('p');
          content.textContent = `内容: ${post.content}`;

          // 削除ボタンを作成
          const deleteButton = document.createElement('button');
          deleteButton.textContent = '削除';
          deleteButton.addEventListener('click', () => this.deleteBlogPost(post.id));

          //背景色を指定したクラスを追加
          li.classList.add('gray-background');
        
          // 記事の要素をリストに追加
          li.appendChild(title);
          li.appendChild(dateTime);
          li.appendChild(content);
          li.appendChild(deleteButton);
          blogList.appendChild(li);
      });
  }

  // ブログ記事を追加するメソッド
  addBlogPost(post: BlogPost) {
      this.blogPosts.push(post);
      this.displayAllBlogPosts(); // 記事を追加後、更新した記事一覧を表示
  }

  // ユーザーからの入力からブログ記事を追加するメソッド
  addBlogPostFromInput() {
      const titleInput = document.getElementById('title') as HTMLInputElement;
      const contentInput = document.getElementById('content') as HTMLTextAreaElement;
      const title = titleInput.value.trim();
      const content = contentInput.value.trim();

      //タイトル&内容の入力チェック
      if (!title || !content) {
          alert('タイトルと記事内容を入力してください。');
          return;
      }

      const dateTime = new Date().toLocaleString(); // 投稿日時（現在の日付と時間）を取得
      const newPost = new BlogPost(null, title, content, dateTime);
      this.addBlogPost(newPost);

      // 入力フィールドをクリア
      titleInput.value = '';
      contentInput.value = '';
  }

  // 指定したIDのブログ記事を削除するメソッド
  deleteBlogPost(postId: number) {
      const index = this.blogPosts.findIndex((post) => post.id === postId);
      if (index !== -1) {
          this.blogPosts.splice(index, 1);
          this.displayAllBlogPosts(); // 記事を削除後、更新した記事一覧を表示
      }
  }

  // 初期表示時にブログ記事一覧を表示
  run() {
      this.displayAllBlogPosts();
  }
}

const blogApp = new BlogApp();

// アプリケーションの実行を開始
blogApp.run();
