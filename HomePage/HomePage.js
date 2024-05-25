// HEADER
let lastScrollTop = 0;
let ticking = false;

window.addEventListener("scroll", function() {
  if (!ticking) {
    window.requestAnimationFrame(function() {
      let currentScroll = window.scrollY || document.documentElement.scrollTop;
      if (currentScroll > lastScrollTop && currentScroll > 60){
        document.querySelector(".header").style.top = "-300px";
      } else {
        document.querySelector(".header").style.top = "0"; 
      }
      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
      ticking = false;
    });
    ticking = true;
  }
}, false);

const toggleBtn = document.querySelector('.toggle_btn')
const toggleBtnIcon = document.querySelector('.toggle_btn img')
const dropDownMenu = document.querySelector('.dropdown_menu')

toggleBtn.onclick = function(){
    dropDownMenu.classList.toggle('open')
    const isOpen = dropDownMenu.classList.contains('open')
    toggleBtnIcon.src = isOpen ? '../NavbarFooter/AssetNavbarFooter/xmark.svg':'../NavbarFooter/AssetNavbarFooter/bars.svg';
}

// js content 2
const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper .svg-icon"); // Update selector to target SVG icons
const carouselChildrens = [...carousel.children];

let isDragging = false,
  isAutoPlay = true,
  startX,
  startScrollLeft,
  timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to the beginning of the carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach((card) => {
  carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Insert copies of the first few cards to the end of the carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach((card) => {
  carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel at the appropriate position to hide the first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
  });
});

const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add("dragging");
  // Records the initial cursor and scroll position of the carousel
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
  if (!isDragging) return; // if isDragging is false return from here
  // Updates the scroll position of the carousel based on the cursor movement
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
};

const dragStop = () => {
  isDragging = false;
  carousel.classList.remove("dragging");
};

const infiniteScroll = () => {
  // If the carousel is at the beginning, scroll to the end
  if (carousel.scrollLeft === 0) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }
  // If the carousel is at the end, scroll to the beginning
  else if (
    Math.ceil(carousel.scrollLeft) ===
    carousel.scrollWidth - carousel.offsetWidth
  ) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }

  // Clear existing timeout & start autoplay if the mouse is not hovering over the carousel
  clearTimeout(timeoutId);
  if (!wrapper.matches(":hover")) autoPlay();
};

const autoPlay = () => {
  if (window.innerWidth < 800 || !isAutoPlay) return; // Return if the window is smaller than 800 or isAutoPlay is false
  // Autoplay the carousel after every 2500 ms
  timeoutId = setTimeout(
    () => (carousel.scrollLeft += firstCardWidth),
    2500
  );
};
autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);


// js slider naga content 3
document.addEventListener("DOMContentLoaded", function() {
  let list = document.querySelector('.dragonslider .listdragon');
  let items = document.querySelectorAll('.dragonslider .listdragon .drgimage');
  let prev = document.getElementById('prev');
  let next = document.getElementById('next');

  let active = 0;
  let lengthItems = items.length - 1;

  next.onclick = function() {
      active = active === lengthItems ? 0 : active + 1;
      reloadSlider();
  }

  prev.onclick = function() {
      active = active === 0 ? lengthItems : active - 1;
      reloadSlider();
  }

  let refreshSlider = setInterval(() => { next.click() }, 3000);

  function reloadSlider() {
      let checkLeft = items[active].offsetLeft;
      list.style.left = -checkLeft + 'px';
      clearInterval(refreshSlider);
      refreshSlider = setInterval(() => { next.click() }, 3000);
  }
});

// js content 5
document.addEventListener("DOMContentLoaded", function() {
  let itemst = document.querySelectorAll('.slidertestimoni .itemtesti');
    let nextt = document.getElementById('nexttesti');
    let prevt = document.getElementById('prevtesti');
    
    let active = 1; // Ganti menjadi 1 untuk menunjukkan slide pertama secara default

    function loadShow() {
        for (let i = 0; i < itemst.length; i++) {
            if (i === active) {
                itemst[i].style.transform = `none`;
                itemst[i].style.zIndex = 1;
                itemst[i].style.filter = 'none';
                itemst[i].style.opacity = 1;
            } else {
                itemst[i].style.transform = `translateX(${120 * (i - active)}px) scale(${1 - 0.2 * Math.abs(i - active)}) perspective(16px) rotateY(${i < active ? -1 : 1}deg)`;
                itemst[i].style.zIndex = Math.abs(i - active) * -1;
                itemst[i].style.filter = 'blur(5px)';
                itemst[i].style.opacity = Math.abs(i - active) > 2 ? 0 : 0.6;
            }
        }
    }

    loadShow();
    nextt.onclick = function(){
        active = active + 1 < itemst.length ? active + 1 : active;
        loadShow();
    }
    prevt.onclick = function(){
        active = active - 1 >= 0 ? active - 1 : active;
        loadShow();
    }
});