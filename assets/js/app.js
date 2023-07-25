// hide preloder
const hidePreloader = () => {
  setInterval(() => {
    document.querySelector(".preloader").style.display = "none";
  }, 300);
  document.body.classList.add("loaded");
};

// window load event
window.addEventListener("load", () => {
  hidePreloader();
  screenWithResized();
  autoSlide();
});

// window resize event
window.addEventListener("resize", handleWindowResize);

// Function to be called when window is resized
function handleWindowResize() {
  screenWithResized();
}

// Function to add a class to an element
function addClassToElement(elementId, className) {
  const elements = document.querySelectorAll(elementId);
  elements.forEach((element) => {
    if (element) {
      element.classList.add(className);
    }
  });
}

// Function to remove a class from an element
function removeClassFromElement(elementId, className) {
  const elements = document.querySelectorAll(elementId);
  elements.forEach((element) => {
    if (element) {
      if (element.classList.contains(className)) {
        element.classList.remove(className);
      }
    }
  });
}

// Check screen width and apply classes dynamically
const screenWithResized = () => {
  const screenWidth = window.innerWidth;
  if (screenWidth > 768) {
    addClassToElement(".nav-item", "hover-underlined");
  } else {
    removeClassFromElement(".nav-item", "hover-underlined");
  }
};

//  navbar toggle functionality
const navbarToggle = () => {
  const body = document.querySelector("body");
  const navMenu = document.querySelector(".nav-menu");
  const header = document.querySelector("header");

  if (body.classList.contains("show-nav")) {
    header.style.animationName = "none";
    requestAnimationFrame(function () {
      header.style.animationName = "slide-up";
      header.style.animationDelay = "0s";
    });
    setTimeout(() => {
      body.classList.remove("show-nav");
      navMenu.classList.remove("nav-active");
      header.classList.remove("nav-active");

      header.style.animationName = "none";
      requestAnimationFrame(function () {
        header.style.animationName = "slide-down";
        header.style.animationDelay = "0s";
      });
    }, 400);
  } else {
    header.style.animationName = "none";
    requestAnimationFrame(function () {
      header.style.animationName = "slide-down";
      header.style.animationDelay = ".1s";
    });
    body.classList.add("show-nav");
    navMenu.classList.add("nav-active");
    header.classList.add("nav-active");
  }
};

//  navbar toggle event
document.querySelector(".nav-toggler").addEventListener("click", navbarToggle);

// slider functionality for hero section

const sliders = document.querySelectorAll(".slider-item");
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");

let slideIndex = 0;

const showSlide = (index) => {
  sliders.forEach((slide) => {
    slide.classList.remove("slide-active");
  });
  sliders[index].classList.add("slide-active");
};

const nextSlide = () => {
  slideIndex++;
  if (slideIndex > sliders.length - 1) {
    slideIndex = 0;
  }
  showSlide(slideIndex);
};

const prevSlide = () => {
  slideIndex--;
  if (slideIndex < 0) {
    slideIndex = sliders.length - 1;
  }
  showSlide(slideIndex);
};

let slideinterval;

const autoSlide = () => {
  slideinterval = setInterval(() => {
    nextSlide();
  }, 10000);
};

nextBtn.addEventListener("click", nextSlide);
nextBtn.addEventListener("mouseover", () => {
  clearInterval(slideinterval);
});
nextBtn.addEventListener("mouseout", () => {
  autoSlide();
});
prevBtn.addEventListener("click", prevSlide);
prevBtn.addEventListener("mouseover", () => {
  clearInterval(slideinterval);
});
prevBtn.addEventListener("mouseout", () => {
  autoSlide();
});

// parallax effect
const parallax = document.querySelectorAll("[data-parallax-effect]");

let x = 0;
let y = 0;

window.addEventListener("mousemove", (e) => {
  x = (e.clientX / window.innerWidth * 10) - 5;
  y = (e.clientY / window.innerWidth * 10) - 5;

  // reverse the direction of the parallax effect
  x = -x;
  y = -y;

  console.log(x, y);

  parallax.forEach((element) => {
    x = x * Number(element.dataset.parallaxSpeed);
    y = y * Number(element.dataset.parallaxSpeed);
    element.style.transform = `translate(${x}px, ${y}px)`;
  }
  );
}
);

// Show/hide back to top button based on scroll position
window.onscroll = function() {
  var BackToTopbutton = document.querySelector(".back-to-top");
  if (document.documentElement.scrollTop > 100) {
    BackToTopbutton.classList.add("active");
  } else {
    BackToTopbutton.classList.remove("active");
  }
};


// show/hide navbar based on scroll direction
let lastScrollPosition = window.scrollY

window.addEventListener("scroll",()=>{
  if(window.scrollY>50){
    document.querySelector(".header").classList.add("bg-dark");
    document.querySelector(".top-bar").classList.add("bg-dark");
  }else{
    document.querySelector(".header").classList.remove("bg-dark");
    document.querySelector(".top-bar").classList.remove("bg-dark");
  }
  if(lastScrollPosition > window.scrollY){
    console.log("we are going up");
    document.querySelector(".header").classList.add("active");
    document.querySelector(".top-bar").classList.add("active");
  }else if(lastScrollPosition < window.scrollY){
    console.log("we are going down");
    document.querySelector(".top-bar").classList.remove("active");
    if(document.querySelector("body").classList.contains("show-nav")){
      // do nothing because nav has beign opened.
    }else{
      document.querySelector(".header").classList.remove("active");
    }
    
  }
  lastScrollPosition = window.scrollY;
})