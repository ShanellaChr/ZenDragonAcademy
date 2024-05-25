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
