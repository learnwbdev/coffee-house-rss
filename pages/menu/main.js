import { menuListContainer } from "./scripts/constants.js";
import populateMenuItems from "./scripts/populate-menu-items.js";
import getProductItems from "./scripts/fetch-products.js";
import { hideModalMenuItem } from "./scripts/menu-modal.js";

let menuItems;
let menuItemsDiv;
const menuTypeButtons = document.querySelectorAll(".menu-type-button");
const loadButton = document.querySelector(".reload-button");
const modalButtonClose = document.querySelector(".modal-button-close");
const modalBackdrop = document.querySelector(".modal-backdrop");
let currentProductCategoryId = 0;
let isShownAllMenuItems = false;

function showLoadButton() {
  loadButton.classList.remove("load-button-hidden");
}

function hideLoadButton() {
  loadButton.classList.add("load-button-hidden");
}

function showMenuItems(productCategory) {
  getProductItems(productCategory).then((productsDataWithIds) => {
    menuItems = productsDataWithIds;
    if (menuItems.length > 4) {
      isShownAllMenuItems = false;
      showLoadButton();
    } else {
      isShownAllMenuItems = true;
      hideLoadButton();
    }
    menuItemsDiv = populateMenuItems(menuItems);
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

function showAllItems() {
  isShownAllMenuItems = true;
  hideLoadButton();
  menuItemsDiv.forEach((menuItem, idx) => {
    if (idx > 3) {
      menuItem.classList.remove("menu-item_hidden-mobile");
    }
  });
}

function hideAdditionalItems() {
  isShownAllMenuItems = false;
  showLoadButton();
  menuItemsDiv.forEach((menuItem, idx) => {
    if (idx > 3) {
      menuItem.classList.add("menu-item_hidden-mobile");
    }
  });
}

loadButton.addEventListener("click", showAllItems);

window.onresize = () => {
  if (isShownAllMenuItems && window.innerWidth > 768 && menuItems.length > 4) {
    hideAdditionalItems();
  }
};

modalButtonClose.addEventListener("click", (e) => {
  e.preventDefault();
  hideModalMenuItem();
});

modalBackdrop.addEventListener("click", (e) => {
  e.preventDefault();
  hideModalMenuItem();
});
