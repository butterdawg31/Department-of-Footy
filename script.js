const root = document.documentElement;
const toggle = document.querySelector(".theme-toggle");
const navMenus = document.querySelectorAll(".nav-menu");
const themeStorageKey = "department-of-footy-theme";

const getSavedTheme = () => {
  try {
    return localStorage.getItem(themeStorageKey);
  } catch {
    return null;
  }
};

const saveTheme = (theme) => {
  try {
    localStorage.setItem(themeStorageKey, theme);
  } catch {
    // Theme still works for this page view when local file storage is unavailable.
  }
};

const setTheme = (theme) => {
  root.dataset.theme = theme;
  saveTheme(theme);
  toggle.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
  toggle.setAttribute(
    "aria-label",
    theme === "dark" ? "Switch to light mode" : "Switch to dark mode",
  );
};

setTheme(getSavedTheme() || "light");

toggle.addEventListener("click", () => {
  setTheme(root.dataset.theme === "dark" ? "light" : "dark");
});

const closeMenus = () => {
  navMenus.forEach((menu) => {
    menu.classList.remove("is-open");
    menu.querySelector(".nav-trigger").setAttribute("aria-expanded", "false");
  });
};

const openMenu = (activeMenu) => {
  navMenus.forEach((menu) => {
    const isActive = menu === activeMenu;
    menu.classList.toggle("is-open", isActive);
    menu.querySelector(".nav-trigger").setAttribute("aria-expanded", isActive ? "true" : "false");
  });
};

navMenus.forEach((menu) => {
  const trigger = menu.querySelector(".nav-trigger");

  menu.addEventListener("pointerenter", () => {
    openMenu(menu);
  });

  trigger.addEventListener("focus", () => {
    openMenu(menu);
  });

  trigger.addEventListener("click", (event) => {
    event.preventDefault();
    menu.classList.contains("is-open") ? closeMenus() : openMenu(menu);
  });

  menu.querySelectorAll(".nav-menu-list a").forEach((link) => {
    link.addEventListener("click", () => {
      closeMenus();
    });
  });
});

document.addEventListener("click", (event) => {
  if (event.target.closest(".nav-menu")) return;

  closeMenus();
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;

  closeMenus();
});
