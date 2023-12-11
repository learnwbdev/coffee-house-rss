const sliderList = document.querySelector(".slider-list");
const sliderItems = document.querySelectorAll(".slider-list__item");
const selectBars = document.querySelectorAll(".select-bar");
const sliderImages = document.querySelectorAll(".slider-item__image");
const deltaSliderToNext = 1;
const deltaSliderToPrev = -1;

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

// arrow buttons event listeners
buttonSliderPrev.addEventListener("click", () => {
  swipeSlider(deltaSliderToPrev);
});

buttonSliderNext.addEventListener("click", () => {
  swipeSlider(deltaSliderToNext);
});

// swipe by touch / mouse
let isSwiping = false;
let swipePositionXStart;
let swipePositionXEnd;

sliderImages.forEach((sliderImage) =>
  sliderImage.addEventListener("dragstart", (e) => e.preventDefault()),
);

function getSwipePositionX(event) {
  const positionX = event.type.includes("touch")
    ? event.touches[0].clientX
    : event.clientX;
  return positionX;
}

function swipeStart(event) {
  isSwiping = true;
  swipePositionXStart = getSwipePositionX(event);
  sliderList.style.cursor = "grabbing";
}

function swipeMove(event) {
  if (isSwiping) {
    swipePositionXEnd = getSwipePositionX(event);
  }
}

function swipeEnd() {
  if (isSwiping) {
    sliderList.style.cursor = "grab";
    const swipeDelta = swipePositionXEnd - swipePositionXStart;
    const shortSwipeLength = 100;
    const isShortSwipe = Math.abs(swipeDelta) > shortSwipeLength;
    const isSwipeToNext = swipeDelta < 0;
    if (isShortSwipe) {
      if (isSwipeToNext) {
        swipeSlider(deltaSliderToNext);
      } else {
        swipeSlider(deltaSliderToPrev);
      }
    }
  }
  isSwiping = false;
}

// Mouse Events
sliderList.addEventListener("mouseenter", () => {
  sliderList.style.cursor = "grab";
});
sliderList.addEventListener("mousedown", (e) => swipeStart(e));
sliderList.addEventListener("mouseup", swipeEnd);
sliderList.addEventListener("mouseleave", swipeEnd);
sliderList.addEventListener("mousemove", (e) => swipeMove(e));
// Touch Events
sliderList.addEventListener("touchstart", (e) => swipeStart(e), {
  passive: true,
});
sliderList.addEventListener("touchend", swipeEnd);
sliderList.addEventListener("touchcancel", swipeEnd);
sliderList.addEventListener("touchmove", (e) => swipeMove(e), {
  passive: true,
});

// auto slider
const sliderSwitchTimeInMs = 6000;
let currentTimeoutId;

function autoSwipeSlider() {
  swipeSlider(deltaSliderToNext);
  currentTimeoutId = setTimeout(autoSwipeSlider, sliderSwitchTimeInMs);
}

autoSwipeSlider();
