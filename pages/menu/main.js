import { productId, menuListContainer } from "./scripts/constants.js";
import populateMenuItems from "./scripts/populate-menu-items.js";
import getProductItems from "./scripts/fetch-products.js";

let menuItems;
const menuTypeButtons = document.querySelectorAll(".menu-type-button");
let currentProductCategoryId = 0;

function showMenuItems(productCategory) {
  getProductItems(productCategory).then((productsDataWithIds) => {
    menuItems = productsDataWithIds;
    populateMenuItems(menuItems);
  });
}

function removeMenuItems() {
  let lastMenuItem = menuListContainer.lastElementChild;
  while (lastMenuItem) {
    menuListContainer.removeChild(lastMenuItem);
    lastMenuItem = menuListContainer.lastElementChild;
  }
}

function changeMenuCategory(newCategoryId) {
  console.log("click", newCategoryId);
  if (newCategoryId !== currentProductCategoryId) {
    menuTypeButtons[currentProductCategoryId].classList.remove(
      "menu-type-button_selected",
    );
    currentProductCategoryId = newCategoryId;
    menuTypeButtons[currentProductCategoryId].classList.add(
      "menu-type-button_selected",
    );
    removeMenuItems();
    showMenuItems(menuTypeButtons[currentProductCategoryId].dataset.category);
  }
}

menuTypeButtons.forEach((menuTypeButton, idx) =>
  menuTypeButton.addEventListener("click", () => changeMenuCategory(idx)),
);

showMenuItems(menuTypeButtons[currentProductCategoryId].dataset.category);