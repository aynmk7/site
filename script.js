document.documentElement.classList.toggle(
  "dark",
  localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
);

let themeBtn = document.getElementById("toggle-theme");

themeBtn.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
  if (document.documentElement.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});

// localStorage.removeItem('theme')
function toggleMenu(state) {
  let sidebar = document.getElementById("sidebar");
  let openBtn = document.getElementById("open-btn");
  let closeBtn = document.getElementById("close-btn");

  if (state === "open") {
    document.body.style.overflowY = "hidden";
    sidebar.classList.remove("hidden");
    sidebar.classList.add("flex");
    openBtn.classList.remove("animate-rotate-right");
    closeBtn.classList.remove("animate-rotate-right");
    openBtn.classList.add("animate-rotate-left");
    closeBtn.classList.add("animate-rotate-left");
    sidebar.classList.add("animate-slide-in");
  } else {
    document.body.style.overflowY = "";
    sidebar.classList.add("animate-slide-out");
    openBtn.classList.remove("animate-rotate-left");
    closeBtn.classList.remove("animate-rotate-left");
    setTimeout(() => {
      openBtn.classList.add("animate-rotate-right");
      closeBtn.classList.add("animate-rotate-right");
      sidebar.classList.add("hidden");
      sidebar.classList.remove("flex");
      sidebar.classList.remove("animate-slide-out");
    }, 300);
  }
}

const scrollers = document.querySelectorAll(".scroller");

addAnimation();

function addAnimation() {
  scrollers.forEach((scroller) => {
    scroller.setAttribute("data-animated", true);

    const scrollerInner = scroller.querySelector(".scroller__inner");
    const scrollerContent = Array.from(scrollerInner.children);

    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      duplicatedItem.setAttribute("aria-hidden", true);
      scrollerInner.appendChild(duplicatedItem);
    });
  });
}

const getChartOptions = () => {
  return {
    series: [39.7, 25.8, 18.0, 10.2, 6.3],
    colors: ["#89e051", "#3776ab", "#f1e05a", "#e34c26", "#563d7c"],
    chart: {
      height: 420,
      width: "100%",
      type: "pie",
    },
    stroke: {
      colors: ["white"],
      lineCap: "",
    },
    plotOptions: {
      pie: {
        labels: {
          show: true,
        },
        size: "100%",
        dataLabels: {
          offset: -25,
        },
      },
    },
    labels: ["C", "Python", "JavaScript", "HTML", "CSS"],
    dataLabels: {
      enabled: true,
      style: {
        fontFamily: "Inter, sans-serif",
      },
    },
    legend: {
      position: "bottom",
      fontFamily: "Inter, sans-serif",
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return value + "%";
        },
      },
    },
    xaxis: {
      labels: {
        formatter: function (value) {
          return value + "%";
        },
      },
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
    },
  };
};

if (typeof ApexCharts !== "undefined") {
  const chartElement = document.getElementById("pie-chart");

  if (chartElement) {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const chart = new ApexCharts(chartElement, getChartOptions());
            chart.render();

            observer.unobserve(chartElement);
          }
        });
      },
      { threshold: 1 }
    );

    observer.observe(chartElement);
  }
}

const cursorSmallDot = document.getElementById("cursor-small-dot");
const cursorBigDot = document.getElementById("cursor-big-dot");

let smallDotPosition = { x: 0, y: 0 };
let bigDotPosition = { x: 0, y: 0 };

const translate3d = (x, y) => `translate3d(${x}px, ${y}px, 0)`;

const handleMouseMove = (e) => {
  smallDotPosition.x = e.clientX;
  smallDotPosition.y = e.clientY;

  bigDotPosition.x = e.clientX - 4;
  bigDotPosition.y = e.clientY - 8;

  cursorSmallDot.style.transform = translate3d(
    smallDotPosition.x,
    smallDotPosition.y
  );
  cursorBigDot.style.transform = translate3d(
    bigDotPosition.x,
    bigDotPosition.y
  );
};

let timeout;
const mouseMoveHandler = (e) => {
  cursorSmallDot.classList.remove("hidden");
  cursorBigDot.classList.remove("hidden");

  window.requestAnimationFrame(() => handleMouseMove(e));

  clearTimeout(timeout);

  timeout = setTimeout(() => {
    cursorSmallDot.classList.add("hidden");
    cursorBigDot.classList.add("hidden");
  }, 1000);
};
window.addEventListener("mousemove", mouseMoveHandler);

// Slideshow functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const indicators = document.querySelectorAll('.slide-indicator');
const slideCounter = document.getElementById('slide-counter');
const totalSlides = slides.length;

function updateSlideCounter() {
  if (slideCounter) {
    slideCounter.textContent = `${currentSlide + 1}/${totalSlides}`;
  }
}

function showSlide(index) {
  // Hide all slides
  slides.forEach(slide => {
    slide.classList.remove('active');
    slide.classList.add('hidden');
  });
  
  // Remove active class from all indicators
  indicators.forEach(indicator => {
    indicator.classList.remove('active');
  });
  
  // Show the current slide
  if (slides[index]) {
    slides[index].classList.remove('hidden');
    slides[index].classList.add('active');
  }
  
  // Activate the current indicator
  if (indicators[index]) {
    indicators[index].classList.add('active');
  }
  
  // Update slide counter
  updateSlideCounter();
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  showSlide(currentSlide);
}

function previousSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  showSlide(currentSlide);
}

function goToSlide(index) {
  currentSlide = index;
  showSlide(currentSlide);
}

// Initialize slideshow if slides exist
if (slides.length > 0) {
  showSlide(0);
  
  // Add event listeners for navigation
  const nextBtn = document.querySelector('.slide-nav.next');
  const prevBtn = document.querySelector('.slide-nav.prev');
  
  if (nextBtn) {
    nextBtn.addEventListener('click', nextSlide);
  }
  
  if (prevBtn) {
    prevBtn.addEventListener('click', previousSlide);
  }
  
  // Add event listeners for indicators
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => goToSlide(index));
  });
}
