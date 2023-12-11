const htmlBody = document.body;
const hamburgerButton = document.getElementById("hamburger-menu-id");
const sideBarNavigation = document.querySelector(".navigation");
const navLinksCurrentPage = document.querySelectorAll(".link-current-page");
const navLinksAnotherPage = document.querySelectorAll(".link-another-page");
const navLinksNonInteractive = document.querySelectorAll(
  ".link-non-interactive",
);

function toggleSideBar() {
  if (hamburgerButton.checked) {
    htmlBody.classList.add("is-no-scroll");
    sideBarNavigation.classList.add("navigation__show");
    sideBarNavigation.classList.add("navigation__transition");
  } else {
    htmlBody.classList.remove("is-no-scroll");
    sideBarNavigation.classList.remove("navigation__show");
    sideBarNavigation.addEventListener(
      "transitionend",
      () => {
        sideBarNavigation.classList.remove("navigation__transition");
      },
      { once: true },
    );
  }
}

hamburgerButton.addEventListener("click", toggleSideBar);

function goToLinkCurrentPage(targetLink) {
  if (hamburgerButton.checked) {
    hamburgerButton.click();
    sideBarNavigation.addEventListener(
      "transitionend",
      () => {
        document
          .getElementById(targetLink)
          .scrollIntoView({ behavior: "smooth" });
      },
      { once: true },
    );
  } else {
    document.getElementById(targetLink).scrollIntoView({ behavior: "smooth" });
  }
}

function goToLinkAnotherPage(targetLink) {
  if (hamburgerButton.checked) {
    hamburgerButton.click();
    sideBarNavigation.addEventListener(
      "transitionend",
      () => {
        window.location.href = targetLink;
      },
      { once: true },
    );
  } else {
    window.location.href = targetLink;
  }
}

navLinksCurrentPage.forEach((navLink) => {
  const targetLink = navLink.getAttribute("data-link");
  navLink.addEventListener("click", () => goToLinkCurrentPage(targetLink));
});

navLinksAnotherPage.forEach((navLink) => {
  const targetLink = navLink.getAttribute("data-link");
  navLink.addEventListener("click", () => goToLinkAnotherPage(targetLink));
});

navLinksNonInteractive.forEach((navLink) => {
  navLink.addEventListener("click", () => hamburgerButton.click());
});

window.onresize = () => {
  if (hamburgerButton.checked && window.innerWidth > 768) {
    hamburgerButton.checked = false;
    htmlBody.classList.remove("is-no-scroll");
    sideBarNavigation.classList.remove("navigation__show");
    sideBarNavigation.classList.remove("navigation__transition");
  }
};
