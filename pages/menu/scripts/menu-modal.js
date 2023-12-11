import { imageFilesDirectory, productId } from "./constants.js";

const modalDiv = document.querySelector(".modal-window");
const modalImage = document.querySelector(".modal-menu__image-file");
const modalName = document.querySelector(".modal-menu__name");
const modalDescription = document.querySelector(".modal-menu__description");

const modalButtonSizeS = document.querySelector(".modal-button_size-s");
const modalButtonSizeM = document.querySelector(".modal-button_size-m");
const modalButtonSizeL = document.querySelector(".modal-button_size-l");
const modalButtonSizeSText = document.querySelector(
  ".modal-button_size-s__text",
);
const modalButtonSizeMText = document.querySelector(
  ".modal-button_size-m__text",
);
const modalButtonSizeLText = document.querySelector(
  ".modal-button_size-l__text",
);

const modalButtonAdditive1 = document.querySelector(".modal-button_additive-1");
const modalButtonAdditive2 = document.querySelector(".modal-button_additive-2");
const modalButtonAdditive3 = document.querySelector(".modal-button_additive-3");
const modalButtonAdditive1Text = document.querySelector(
  ".modal-button_additive-1__text",
);
const modalButtonAdditive2Text = document.querySelector(
  ".modal-button_additive-2__text",
);
const modalButtonAdditive3Text = document.querySelector(
  ".modal-button_additive-3__text",
);
const modalTotalPrice = document.querySelector(".modal-total__price");

function fillMenuItemDataInModal(menuItem) {
  modalImage.src = `${imageFilesDirectory}/${menuItem.category}/${menuItem["image-filename"]}`;
  modalName.textContent = menuItem.name;
  modalDescription.textContent = menuItem.description;
  modalButtonSizeSText.textContent = menuItem.sizes.s.size;
  modalButtonSizeMText.textContent = menuItem.sizes.m.size;
  modalButtonSizeLText.textContent = menuItem.sizes.l.size;
  modalButtonAdditive1Text.textContent = menuItem.additives[0].name;
  modalButtonAdditive2Text.textContent = menuItem.additives[1].name;
  modalButtonAdditive3Text.textContent = menuItem.additives[2].name;
  modalTotalPrice.textContent = `$${menuItem.price}`;
  modalTotalPrice.dataset.basePrice = menuItem.price;
  modalTotalPrice.dataset.totalPrice = menuItem.price;
}

function showModalMenuItem(menuItem) {
  fillMenuItemDataInModal(menuItem);
  modalDiv.classList.add("modal-window-open");
  htmlBody.classList.add("is-no-scroll");
}

function hideModalMenuItem() {
  modalDiv.classList.remove("modal-window-open");
  htmlBody.classList.remove("is-no-scroll");
}

export { showModalMenuItem, hideModalMenuItem };
