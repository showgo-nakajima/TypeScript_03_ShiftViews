// 商品データの型定義
interface Product {
  id: number;
  name: string;
  price: number;
  isSale: boolean;
  isFreeShipping: boolean;
}

// 商品データ
const products: Product[] = [
  { id: 1, name: "商品A", price: 1000, isSale: true, isFreeShipping: false },
  { id: 2, name: "商品B", price: 800, isSale: false, isFreeShipping: true },
  { id: 3, name: "商品C", price: 1200, isSale: true, isFreeShipping: true },
  // 他の商品データも追加
];

// ソート関数
function sortProducts(products: Product[], sortMethod: string): Product[] {
  if (sortMethod === "priceLowToHigh") {
    return products.slice().sort((a, b) => a.price - b.price);
  }
  // その他のソート方法を追加できます
  return products; // デフォルトは変更なし
}

// 初期表示関数
function displayProducts() {
  // 商品一覧をクリア
  const productList = document.getElementById("productList");
  productList.innerHTML = "";

  // 絞り込み条件を取得
  const isSaleChecked = (document.getElementById("saleCheckbox") as HTMLInputElement).checked;
  const isFreeShippingChecked = (document.getElementById("freeShippingCheckbox") as HTMLInputElement).checked;

  // 並び替え方法を取得
  const sortMethod = (document.getElementById("sortSelect") as HTMLSelectElement).value;

  // 商品を絞り込み
  const filteredProducts = products.filter((product) => {
    if (isSaleChecked && !product.isSale) {
      return false;
    }
    if (isFreeShippingChecked && !product.isFreeShipping) {
      return false;
    }
    return true;
  });

  let sortedProducts; // ソート後の商品リストを格納する変数を宣言

  // 並び替え方法に応じてソート
  if (sortMethod === "priceLowToHight") {
    sortedProducts = sortProducts(filteredProducts, "priceLowToHigh"); // 価格が安い順にソート
  } else {
    sortedProducts = [...filteredProducts]; // 何もしない（標準の順番）
  }

  // 商品を表示
  sortedProducts.forEach((product) => {
    const row = productList.insertRow();
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);
    const cell5 = row.insertCell(4);

    cell1.innerHTML = product.id.toString();
    cell2.innerHTML = product.name;
    cell3.innerHTML = product.price.toString();
    cell4.innerHTML = product.isFreeShipping ? "送料無料" : "送料あり";
    cell5.innerHTML = product.isSale ? "セール" : "";

    // ここでセルにスタイルやクラスを追加することができます
  });
}

// 初期表示
displayProducts();

// 絞り込み条件や並び替え方法が変更された場合に再表示
document.getElementById("saleCheckbox")!.addEventListener("change", displayProducts);
document.getElementById("freeShippingCheckbox")!.addEventListener("change", displayProducts);
document.getElementById("sortSelect")!.addEventListener("change", displayProducts);
