const sliderList = document.querySelector(".slider-list");
const sliderItems = document.querySelectorAll(".slider-list__item");
const selectBars = document.querySelectorAll(".select-bar");
const sliderImages = document.querySelectorAll(".slider-item__image");
const deltaSliderToNext = 1;
const deltaSliderToPrev = -1;
let activeSelectBar;

// variables for the Auto Slider
const sliderSwitchTimeInMs = 6000;
const oneStepAnimationInMs = 6;
let currentTimerId;
let currentTimerStartTime;
let isAutoSwipePaused = false;
let swipePauseStartTime;
let resumeTimerDurationTime;
let currentStepsAnimation;
let currentSliderTimeShown;

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
  currentStepsAnimation = 0;
  currentSliderTimeShown = 0;
}

function swipeSlider(swipeDelta) {
  removeActiveSelectBar();
  currentItem += swipeDelta;
  const nextPosition = getSliderNextPosition(currentItem);
  changeSliderToNextPosition(nextPosition);
  addActiveSelectBar();
  activeSelectBar = document.querySelector(".select-bar_active");
}

function autoSwipeSlider() {
  swipeSlider(deltaSliderToNext);
  currentTimerId = setTimeout(autoSwipeSlider, sliderSwitchTimeInMs);
  currentTimerStartTime = Date.now();
}

function manualSwipeSlider(swipeDelta) {
  clearInterval(currentTimerId);
  swipeSlider(swipeDelta);
  currentTimerId = setTimeout(autoSwipeSlider, sliderSwitchTimeInMs);
  currentTimerStartTime = Date.now();
}

// arrow buttons event listeners
buttonSliderPrev.addEventListener("click", () => {
  manualSwipeSlider(deltaSliderToPrev);
});

buttonSliderNext.addEventListener("click", () => {
  manualSwipeSlider(deltaSliderToNext);
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
  event.preventDefault();
  isSwiping = true;
  [swipePositionXStart, swipePositionYStart] = getSwipePosition(event);
  sliderList.style.cursor = "grabbing";
}

function swipeMove(event) {
  event.preventDefault();
  if (isSwiping) {
    [swipePositionXEnd, swipePositionYEnd] = getSwipePosition(event);
  }
}

function swipeEnd(event) {
  event.preventDefault();
  if (isSwiping) {
    sliderList.style.cursor = "grab";
    const swipeDeltaX = swipePositionXEnd - swipePositionXStart;
    const swipeDeltaY = swipePositionYEnd - swipePositionYStart;
    const shortSwipeXLength = 200;
    const longSwipeYLength = 200;
    const isShortSwipeX = Math.abs(swipeDeltaX) > shortSwipeXLength;
    const isLongSwipeY = Math.abs(swipeDeltaY) > longSwipeYLength;
    const isSwipeToNext = swipeDeltaX < 0;
    if (!isLongSwipeY && isShortSwipeX) {
      if (isSwipeToNext) {
        manualSwipeSlider(deltaSliderToNext);
      } else {
        manualSwipeSlider(deltaSliderToPrev);
      }
    }
  }
  isSwiping = false;
}

function pauseAutoSwipe() {
  isAutoSwipePaused = true;
  swipePauseStartTime = Date.now();
  clearTimeout(currentTimerId);
  activeSelectBar.style.animationPlayState = "paused";
  currentSliderTimeShown += swipePauseStartTime - currentTimerStartTime;
  resumeTimerDurationTime = sliderSwitchTimeInMs - currentSliderTimeShown;
  currentStepsAnimation = (
    currentSliderTimeShown / oneStepAnimationInMs
  ).toFixed(0);
}

function resumeAutoSwipe() {
  if (isAutoSwipePaused) {
    currentTimerId = setTimeout(autoSwipeSlider, resumeTimerDurationTime);
    currentTimerStartTime = Date.now();
    activeSelectBar.style.animationTimingFunction = `steps(${currentStepsAnimation}, end)`;
    activeSelectBar.style.animationPlayState = "running";
    isAutoSwipePaused = false;
  }
}

autoSwipeSlider();

// Mouse Events
sliderList.addEventListener("mouseenter", () => {
  sliderList.style.cursor = "grab";
  pauseAutoSwipe();
});
sliderList.addEventListener("mousedown", (e) => swipeStart(e));
sliderList.addEventListener("mouseup", (e) => swipeEnd(e));
sliderList.addEventListener("mouseleave", (e) => {
  resumeAutoSwipe();
  swipeEnd(e);
});
sliderList.addEventListener("mousemove", (e) => swipeMove(e));
// Touch Events
sliderList.addEventListener("touchstart", (e) => {
  pauseAutoSwipe();
  swipeStart(e);
});
sliderList.addEventListener("touchend", (e) => {
  resumeAutoSwipe();
  swipeEnd(e);
});
sliderList.addEventListener("touchcancel", (e) => {
  resumeAutoSwipe();
  swipeEnd(e);
});
sliderList.addEventListener("touchmove", (e) => swipeMove(e));
