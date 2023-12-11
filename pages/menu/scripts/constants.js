const productId = Symbol("productId");
const imageFilesDirectory = "../../assets/images/menu";
const imageSize = 340;
const menuListContainer = document.getElementById("menu-list-container");
const productsUrl = "./data/products.json";

export {
  productId,
  imageFilesDirectory,
  imageSize,
  menuListContainer,
  productsUrl,
};
