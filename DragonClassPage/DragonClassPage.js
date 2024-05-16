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
const toggleBtnIcon = document.querySelector('.toggle_btn i')
const dropDownMenu = document.querySelector('.dropdown_menu')

toggleBtn.onclick = function(){
  dropDownMenu.classList.toggle('open')
  const isOpen = dropDownMenu.classList.contains('open')
  toggleBtnIcon.classList = isOpen ? 'fa-solid fa-xmark':'fa-solid fa-bars'
}

// content 2
let nextBtn = document.querySelector('.next')
let prevBtn = document.querySelector('.prev')

let slider = document.querySelector('.slider')
let sliderList = slider.querySelector('.slider .list')
let thumbnail = document.querySelector('.slider .thumbnail')
let thumbnailItems = thumbnail.querySelectorAll('.item')

thumbnail.appendChild(thumbnailItems[0])
nextBtn.onclick = function(){
  moveslider('next')
}

prevBtn.onclick = function(){
  moveslider('prev')
}
function moveslider(direction){
  let sliderItems = sliderList.querySelectorAll('.item')
  let thumbnailItems = document.querySelectorAll('.thumbnail .item')
  if(direction === 'next'){
    sliderList.appendChild(sliderItems[0])
    thumbnail.appendChild(thumbnailItems[0])
    slider.classList.add('next')
  }else{
    sliderList.prepend(sliderItems[sliderItems.length - 1])
    thumbnail.prepend(thumbnailItems[thumbnailItems.length - 1])
    slider.classList.add('prev')
  }
  slider.addEventListener('animationend', function() {

    if (direction === 'next') {
        slider.classList.remove('next');
    } else {
        slider.classList.remove('prev');
    }
  }, { once: true });
}