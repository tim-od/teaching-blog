// Open external links in a new tab.
document.querySelectorAll('a[href^="http"]').forEach((link) => {
  if (link.hostname !== window.location.hostname) {
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");
  }
});

// Control the mobile navigation menu.
const toggle = document.querySelector(".menu-toggle");
const links = document.querySelector(".navlinks");

toggle?.addEventListener("click", () => {
  const isOpen = links?.classList.toggle("open") ?? false;

  toggle.classList.toggle("open", isOpen);
  toggle.setAttribute("aria-expanded", String(isOpen));
});
