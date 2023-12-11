const sliderList = document.querySelector(".slider-list");
const sliderItems = document.querySelectorAll(".slider-list__item");
const selectBars = document.querySelectorAll(".select-bar");

const buttonSliderPrev = document.querySelector(
  ".slider-favorite__control_previous",
);
const buttonSliderNext = document.querySelector(
  ".slider-favorite__control_next",
);

let currentItem = 0;
const qtyItems = sliderItems.length;
const translateDelta = (100 / qtyItems).toFixed(2);

function getSliderNextPosition(targetItem) {
  currentItem = (qtyItems + targetItem) % qtyItems;
  const nextPosition = translateDelta * currentItem;
  return nextPosition;
}

function changeSliderToNextPosition(nextPosition) {
  sliderList.style.translate = `-${nextPosition}%`;
}

function removeActiveSelectBar() {
  selectBars[currentItem].classList.remove("select-bar_active");
}

function addActiveSelectBar() {
  selectBars[currentItem].classList.add("select-bar_active");
}

function swipeSlider(swipeDelta) {
  removeActiveSelectBar();
  currentItem += swipeDelta;
  const nextPosition = getSliderNextPosition(currentItem);
  changeSliderToNextPosition(nextPosition);
  addActiveSelectBar();
}

buttonSliderPrev.addEventListener("click", () => {
  swipeSlider(-1);
});

buttonSliderNext.addEventListener("click", () => {
  swipeSlider(1);
});
