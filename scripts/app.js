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

      // Initialize dynamic page scripts after content is loaded
      initializePageScripts(route);
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

// Initialize dynamic page-specific scripts
function initializePageScripts(route) {
  if (route === "rating") {
    const switch_1 = document.getElementById("place_btn");
    const switch_2 = document.getElementById("index_btn");

    if (switch_1 && switch_2) {
      // Add event listeners for the switch buttons
      switch_1.addEventListener("click", (e) => {
        e.preventDefault();
        if (!switch_1.classList.contains("active")) {
          switch_1.classList.add("active");
          switch_2.classList.remove("active");
        }
      });

      switch_2.addEventListener("click", (e) => {
        e.preventDefault();
        if (!switch_2.classList.contains("active")) {
          switch_2.classList.add("active");
          switch_1.classList.remove("active");
        }
      });
    }
    let chartInstance = null; // Store the chart instance globally

    // Initial data for the chart
    const initialLabels = [2018, 2019, 2020, 2021, 2022];
    const initialData = [32000, 35000, 27275, 39000, 31000];

    function initializeChart(labels, dataValues, label) {
      const ctx = document.getElementById("myChart").getContext("2d");

      // Create the chart instance
      chartInstance = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: label,
              data: dataValues,
              borderColor: "#007bff", // Line color
              borderWidth: 2,
              pointBackgroundColor: "#007bff", // Circle point color
              pointBorderColor: "#ffffff", // Circle point border color
              pointBorderWidth: 2,
              pointRadius: 5, // Size of points
              tension: 0.4, // Smooth curve
              fill: false, // No background fill
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false, // Ensures height consistency
          plugins: {
            legend: {
              display: false, // Hides the legend
            },
            tooltip: {
              callbacks: {
                label: function (tooltipItem) {
                  return `${tooltipItem.dataset.label}: ${tooltipItem.raw.toLocaleString()}K`;
                },
              },
            },
          },
          scales: {
            x: {
              grid: {
                display: false, // Hide gridlines on x-axis
              },
              title: {
                display: true,
                text: "Year",
                font: {
                  size: 14,
                  weight: "bold",
                },
              },
            },
            y: {
              min: 10000,
              max: 50000,
              ticks: {
                stepSize: 10000, // Increment by 10K
                callback: function (value) {
                  return `${(value / 1000).toFixed(0)}K`;
                },
              },
              title: {
                display: true,
                text: "Index Value",
                font: {
                  size: 14,
                  weight: "bold",
                },
              },
            },
          },
        },
      });
    }
    const buttons = document.getElementsByClassName("filter-btn");

    document.getElementById("CIS").addEventListener("click", () => {
      updateChart("CIS");
      buttons.forEach((btn) => btn.classList.remove("active"));

      const activeButton = Array.from(buttons).find((btn) => btn.innerHTML === "CIS");
      if (activeButton) activeButton.classList.add("active");
    });
    document.getElementById("BRICS").addEventListener("click", () => {
      updateChart("BRICS");
      buttons.forEach((btn) => btn.classList.remove("active"));

      const activeButton = Array.from(buttons).find((btn) => btn.innerHTML === "BRICS");
      if (activeButton) activeButton.classList.add("active");
    });
    document.getElementById("G8").addEventListener("click", () => {
      updateChart("G8");
      buttons.forEach((btn) => btn.classList.remove("active"));

      const activeButton = Array.from(buttons).find((btn) => btn.innerHTML === "G8");
      if (activeButton) activeButton.classList.add("active");
    });
    function updateChart(region) {
      const buttons = document.querySelectorAll(".filter-btn");
      buttons.forEach((btn) => btn.classList.remove("active"));
      console.log(buttons);

      const activeButton = Array.from(buttons).find((btn) => btn.innerHTML === region);
      if (activeButton) activeButton.classList.add("active");

      let labels, data, label;
      switch (region) {
        case "CIS":
          labels = [2018, 2019, 2020, 2021, 2022];
          data = [32000, 35000, 27275, 39000, 31000];
          label = "CIS Countries";
          break;
        case "BRICS":
          labels = [2018, 2019, 2020, 2021, 2022];
          data = [30000, 32000, 28000, 40000, 32000];
          label = "BRICS Countries";
          break;
        case "G8":
          labels = [2018, 2019, 2020, 2021, 2022];
          data = [34000, 37000, 29000, 41000, 33000];
          label = "G8 Countries";
          break;
        default:
          labels = initialLabels;
          data = initialData;
          label = "Uzbekistan";
      }

      if (chartInstance) {
        // Update chart data instead of re-creating it
        chartInstance.data.labels = labels;
        chartInstance.data.datasets[0].data = data;
        chartInstance.data.datasets[0].label = label;
        chartInstance.update();
      } else {
        initializeChart(labels, data, label); // Create chart if it doesn't exist
      }
    }

    // Initialize the chart with the default dataset
    initializeChart(initialLabels, initialData, "Uzbekistan");
  }
}

window.addEventListener("hashchange", renderRoute);

// Initial render
renderRoute();

// Toggle navbar
const bar = document.getElementById("bar");
const icon = document.querySelector("#bar i");
const responsive_navbar = document.querySelector(".responsive_navbar");
bar.addEventListener("click", () => {
  icon.classList.toggle("fa-bars");
  icon.classList.toggle("fa-x");
  if (icon.classList.contains("fa-bars")) responsive_navbar.style.left = "100%";
  if (icon.classList.contains("fa-x")) responsive_navbar.style.left = "0";
});
