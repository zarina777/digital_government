//Routing
async function renderRoute() {
  const hash = location.hash || "#home";
  const route = hash.slice(1);
  const app = document.getElementById("app");
  const navLinks = document.querySelectorAll("nav a");
  const resnavLinks = document.querySelectorAll(".routes a");

  try {
    const response = await fetch(`./pages/${route}.html`);
    if (response.ok) {
      const content = await response.text();
      app.innerHTML = content;
    } else {
      app.innerHTML = "<h1>404</h1><p>Page not found.</p>";
    }
  } catch (error) {
    app.innerHTML = `<h1>Error</h1><p>Failed to load the page: ${error.message}</p>`;
  }

  // Active link
  navLinks.forEach((link) => {
    if (link.getAttribute("href") === hash) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
  resnavLinks.forEach((link) => {
    if (link.getAttribute("href") === hash) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

window.addEventListener("hashchange", renderRoute);

// Initial render
renderRoute();

//toggle navbar
const bar = document.getElementById("bar");
const icon = document.querySelector("#bar i");
const responsive_navbar = document.querySelector(".responsive_navbar");
bar.addEventListener("click", () => {
  icon.classList.toggle("fa-bars");
  icon.classList.toggle("fa-x");
  if (icon.classList.contains("fa-bars")) responsive_navbar.style.left = "100%";
  if (icon.classList.contains("fa-x")) responsive_navbar.style.left = "0";
});

// const switch_1 = document.getElementById("place_btn");
// const switch_2 = document.querySelector("#index_btn");
// console.log(switch_1);
// console.log(switch_2);

// switch_1.addEventListener("click", (e) => {
//   e.preventDefault();
//   console.log("first");
//   if (!switch_1.classList.contains("active")) {
//     switch_1.classList.add("active");
//     switch_2.classList.remove("active");
//   }
// });

// switch_2.addEventListener("click", (e) => {
//   e.preventDefault();
//   console.log("senc");
//   if (!switch_2.classList.contains("active")) {
//     switch_2.classList.add("active");
//     switch_1.classList.remove("active");
//   }
// });
