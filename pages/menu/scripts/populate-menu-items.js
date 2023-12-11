import {
  productId,
  imageFilesDirectory,
  imageSize,
  menuListContainer,
} from "./constants.js";

function createMenuItemDiv(itemProductId) {
  const divMenuItem = document.createElement("div");
  divMenuItem.classList.add("menu-item", "menu-list__item");

  const isMobileHidden = itemProductId > 3;
  if (isMobileHidden) {
    divMenuItem.classList.add("menu-item_hidden-mobile");
  }

  divMenuItem.dataset.productId = itemProductId;

  return divMenuItem;
}

function createMenuItemImage(productCategory, imageFileName) {
  const divMenuItemImage = document.createElement("div");
  divMenuItemImage.classList.add("menu-item__image");

  const imgMenuItemImage = document.createElement("img");
  imgMenuItemImage.classList.add("menu-item__image-file");
  imgMenuItemImage.src = `${imageFilesDirectory}/${productCategory}/${imageFileName}`;
  imgMenuItemImage.width = `${imageSize}`;
  imgMenuItemImage.height = `${imageSize}`;

  divMenuItemImage.appendChild(imgMenuItemImage);

  return divMenuItemImage;
}

function createMenuItemName(menuItemName) {
  const divMenuItemName = document.createElement("h3");
  divMenuItemName.classList.add("menu-item__title", "heading-3");
  divMenuItemName.textContent = menuItemName;

  return divMenuItemName;
}

function createMenuItemDescription(menuItemDescription) {
  const divMenuItemDescription = document.createElement("p");
  divMenuItemDescription.classList.add("menu-item__description", "text-medium");
  divMenuItemDescription.textContent = menuItemDescription;

  return divMenuItemDescription;
}

function createMenuItemPrice(menuItemPrice) {
  const divMenuItemPrice = document.createElement("p");
  divMenuItemPrice.classList.add("menu-item__price", "heading-3");
  divMenuItemPrice.textContent = `$${menuItemPrice}`;

  return divMenuItemPrice;
}

function createMenuItemAbout(menuItemName, menuItemDescription, menuItemPrice) {
  const divMenuItemAbout = document.createElement("div");
  divMenuItemAbout.classList.add("menu-item__about");

  const divMenuItemName = createMenuItemName(menuItemName);
  const divMenuItemDescription = createMenuItemDescription(menuItemDescription);
  const divMenuItemPrice = createMenuItemPrice(menuItemPrice);

  divMenuItemAbout.appendChild(divMenuItemName);
  divMenuItemAbout.appendChild(divMenuItemDescription);
  divMenuItemAbout.appendChild(divMenuItemPrice);

  return divMenuItemAbout;
}

function createSingleMenuItem(menuItem) {
  const divMenuItem = createMenuItemDiv(menuItem[productId]);
  const divMenuItemImage = createMenuItemImage(
    menuItem.category,
    menuItem["image-filename"],
  );
  const divMenuItemAbout = createMenuItemAbout(
    menuItem.name,
    menuItem.description,
    menuItem.price,
  );

  divMenuItem.appendChild(divMenuItemImage);
  divMenuItem.appendChild(divMenuItemAbout);

  return divMenuItem;
}

function populateMenuItems(menuItemsToPopulate) {
  const menuItemsArrayDivs = menuItemsToPopulate.map((menuItem) =>
    createSingleMenuItem(menuItem),
  );

  menuItemsArrayDivs.forEach((menuItemDiv) =>
    menuListContainer.appendChild(menuItemDiv),
  );
}

export default populateMenuItems;
