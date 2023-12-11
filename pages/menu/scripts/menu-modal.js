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

const sizeButtons = [modalButtonSizeS, modalButtonSizeM, modalButtonSizeL];
const additiveButtons = [
  modalButtonAdditive1,
  modalButtonAdditive2,
  modalButtonAdditive3,
];

function fillMenuItemDataInModal(menuItem) {
  modalImage.src = `${imageFilesDirectory}/${menuItem.category}/${menuItem["image-filename"]}`;
  modalName.textContent = menuItem.name;
  modalDescription.textContent = menuItem.description;
  modalButtonSizeSText.textContent = menuItem.sizes.s.size;
  modalButtonSizeMText.textContent = menuItem.sizes.m.size;
  modalButtonSizeLText.textContent = menuItem.sizes.l.size;
  modalButtonSizeSText.dataset.price = menuItem.sizes.s["add-price"];
  modalButtonSizeMText.dataset.price = menuItem.sizes.m["add-price"];
  modalButtonSizeLText.dataset.price = menuItem.sizes.l["add-price"];
  modalButtonAdditive1Text.textContent = menuItem.additives[0].name;
  modalButtonAdditive2Text.textContent = menuItem.additives[1].name;
  modalButtonAdditive3Text.textContent = menuItem.additives[2].name;
  modalButtonAdditive1Text.dataset.price = menuItem.additives[0]["add-price"];
  modalButtonAdditive2Text.dataset.price = menuItem.additives[1]["add-price"];
  modalButtonAdditive3Text.dataset.price = menuItem.additives[2]["add-price"];
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
  restoreButtonsStateToDefault();
}

function calculateTotalPrice() {
  const basePrice = Number(modalTotalPrice.dataset.basePrice);
  const sizePrice = sizeButtons.reduce((sum, button) => {
    const priceCurrent =
      Number(button.dataset.isSelected) * Number(button.dataset.price);
    return sum + priceCurrent;
  }, 0);
  const additivePrice = additiveButtons.reduce((sum, button) => {
    const priceCurrent =
      Number(button.dataset.isSelected) * Number(button.dataset.price);
    return sum + priceCurrent;
  }, 0);
  const totalPrice = (basePrice + sizePrice + additivePrice).toFixed(2);

  modalTotalPrice.textContent = `$${totalPrice}`;
  modalTotalPrice.dataset.totalPrice = totalPrice;
}

function changeSizeButtonState(buttonId) {
  sizeButtons.forEach((button, idx) => {
    if (idx === buttonId) {
      button.classList.add("modal-button-active");
      button.dataset.isSelected = "1";
    } else {
      button.classList.remove("modal-button-active");
      button.dataset.isSelected = "0";
    }
  });
}

function changeSizeButtonToActive(buttonId) {
  changeSizeButtonState(buttonId);
  calculateTotalPrice();
}

function toggleAdditiveButtonState(buttonId) {
  additiveButtons[buttonId].classList.toggle("modal-button-active");
  additiveButtons[buttonId].dataset.isSelected =
    additiveButtons[buttonId].dataset.isSelected === "0" ? "1" : "0";
  calculateTotalPrice();
}

function restoreButtonsStateToDefault() {
  const sizeActiveButtonIndex = 0;
  changeSizeButtonState(sizeActiveButtonIndex);

  additiveButtons.forEach((button) => {
    button.classList.remove("modal-button-active");
    button.dataset.isSelected = "0";
  });
}

function addEventListenersToModalButtons() {
  sizeButtons.forEach((button, idx) =>
    button.addEventListener("click", (e) => {
      e.preventDefault();
      changeSizeButtonToActive(idx);
    }),
  );

  additiveButtons.forEach((button, idx) =>
    button.addEventListener("click", (e) => {
      e.preventDefault();
      toggleAdditiveButtonState(idx);
    }),
  );
}

export {
  showModalMenuItem,
  hideModalMenuItem,
  addEventListenersToModalButtons,
};
