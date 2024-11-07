document.addEventListener("DOMContentLoaded", () => {
  loadComponent("intro", "content");
  loadComponent("drawer", "drawer-container");
  loadComponent("drawer-full", "drawer-full-container");

  window.addEventListener("popstate", (event) => {
    if (event.state && event.state.path) {
      loadComponent(event.state.path);
    }
  });
});
