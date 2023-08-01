const toggleBtn = document.querySelector(".header-toggleBtn");
const menu = document.querySelector(".header-head ul");

toggleBtn.addEventListener("click", () => {
  menu.classList.toggle("active");
});
