var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// 商品データ
var products = [
    { id: 1, name: "商品A", price: 1000, isSale: true, isFreeShipping: false },
    { id: 2, name: "商品B", price: 800, isSale: false, isFreeShipping: true },
    { id: 3, name: "商品C", price: 1200, isSale: true, isFreeShipping: true },
    // 他の商品データも追加
];
// ソート関数
function sortProducts(products, sortMethod) {
    if (sortMethod === "priceLowToHigh") {
        return products.slice().sort(function (a, b) { return a.price - b.price; });
    }
    // その他のソート方法を追加できます
    return products; // デフォルトは変更なし
}
// 初期表示関数
function displayProducts() {
    // 商品一覧をクリア
    var productList = document.getElementById("productList");
    productList.innerHTML = "";
    // 絞り込み条件を取得
    var isSaleChecked = document.getElementById("saleCheckbox").checked;
    var isFreeShippingChecked = document.getElementById("freeShippingCheckbox").checked;
    // 並び替え方法を取得
    var sortMethod = document.getElementById("sortSelect").value;
    // 商品を絞り込み
    var filteredProducts = products.filter(function (product) {
        if (isSaleChecked && !product.isSale) {
            return false;
        }
        if (isFreeShippingChecked && !product.isFreeShipping) {
            return false;
        }
        return true;
    });
    var sortedProducts; // ソート後の商品リストを格納する変数を宣言
    // 並び替え方法に応じてソート
    if (sortMethod === "priceLowToHight") {
        sortedProducts = sortProducts(filteredProducts, "priceLowToHigh"); // 価格が安い順にソート
    }
    else {
        sortedProducts = __spreadArray([], filteredProducts, true); // 何もしない（標準の順番）
    }
    // 商品を表示
    sortedProducts.forEach(function (product) {
        var row = productList.insertRow();
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
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
document.getElementById("saleCheckbox").addEventListener("change", displayProducts);
document.getElementById("freeShippingCheckbox").addEventListener("change", displayProducts);
document.getElementById("sortSelect").addEventListener("change", displayProducts);
