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
let swipePositionYStart;
let swipePositionYEnd;

sliderImages.forEach((sliderImage) =>
  sliderImage.addEventListener("dragstart", (e) => e.preventDefault()),
);

function getSwipePosition(event) {
  const position = event.type.includes("touch")
    ? [event.touches[0].clientX, event.touches[0].clientY]
    : [event.clientX, event.clientY];
  return position;
}

function swipeStart(event) {
  isSwiping = true;
  [swipePositionXStart, swipePositionYStart] = getSwipePosition(event);
  sliderList.style.cursor = "grabbing";
}

function swipeMove(event) {
  if (isSwiping) {
    [swipePositionXEnd, swipePositionYEnd] = getSwipePosition(event);
  }
}

function swipeEnd() {
  if (isSwiping) {
    sliderList.style.cursor = "grab";
    const swipeDeltaX = swipePositionXEnd - swipePositionXStart;
    const swipeDeltaY = swipePositionYEnd - swipePositionYStart;
    const shortSwipeXLength = 100;
    const longSwipeYLength = 200;
    const isShortSwipeX = Math.abs(swipeDeltaX) > shortSwipeXLength;
    const isLongSwipeY = Math.abs(swipeDeltaY) > longSwipeYLength;
    const isSwipeToNext = swipeDeltaX < 0;
    if (!isLongSwipeY && isShortSwipeX) {
      if (isSwipeToNext) {
        swipeSlider(deltaSliderToNext);
      } else {
        swipeSlider(deltaSliderToPrev);
      }
    }
  }
  isSwiping = false;
}

// auto slider
const sliderSwitchTimeInMs = 6000;
let currentTimeoutId;

function autoSwipeSlider() {
  swipeSlider(deltaSliderToNext);
  currentTimeoutId = setTimeout(autoSwipeSlider, sliderSwitchTimeInMs);
}

autoSwipeSlider();

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
