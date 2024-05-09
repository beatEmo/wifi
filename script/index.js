const navs = document.querySelector(".navigation nav");
navs.addEventListener("click", (e) => {
  if (e.target.nodeName !== "A") return;
  document.querySelector(".active").classList.remove("active");
  e.target.classList.add("active");
  const pages = document.querySelectorAll(".container .page");
  Array.from(pages).forEach((page) => {
    page.style.display = "none";
  });
  const curPage = document.querySelector(
    `.container .${e.target.dataset.page}`
  );
  curPage.style.display = "flex";
});
