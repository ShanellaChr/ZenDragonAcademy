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

// book js
const prevBtn = document.querySelector("#prev_btn");
const nextBtn = document.querySelector("#next_btn");
const book = document.querySelector("#book");
const paper1 = document.querySelector("#p1");
const paper2 = document.querySelector("#p2");
const paper3 = document.querySelector("#p3");

prevBtn.addEventListener("click", goPrevPage);
nextBtn.addEventListener("click", goNextPage);

let currentLocation = 1;
let numOfPapers = 3;
let maxLocation = numOfPapers + 1;

function openBook(){
    book.style.transform = "translateX(50%)";
    prevBtn.style.transform = "translateX(-100px)";
    nextBtn.style.transform = "translateX(100px)";
}

function closeBook(isAtBeginning){
    if(isAtBeginning){
        book.style.transform = "translateX(0%)";
    }else{
        book.style.transform = "translateX(100%)";
    }
    prevBtn.style.transform = "translateX(0px)";
    nextBtn.style.transform = "translateX(0px)";
}

function goNextPage(){
    if(currentLocation<maxLocation){
        switch(currentLocation){
            case 1:
                openBook();
                paper1.classList.add("flipped");
                paper1.style.zIndex = 1;
                break;
                case 2:
                paper2.classList.add("flipped");
                paper2.style.zIndex = 2;
                break;
                case 3:
                paper3.classList.add("flipped");
                paper3.style.zIndex = 3;
                closeBook();
                break;
            default:
                throw new Error("unknown state");
        }
        currentLocation++;
    }
}

function goPrevPage(){
    if(currentLocation > 1) {
        switch(currentLocation) {
        case 2:
            closeBook(true);
            paper1.classList.remove("flipped"); 
            paper1.style.zIndex = 3;
            break;
        case 3:
            paper2.classList.remove("flipped");
            paper2.style.zIndex = 2;
            break;
        case 4:
            openBook();
            paper3.classList.remove("flipped"); 
            paper3.style.zIndex = 1;
            break;
        default:
            throw new Error("unkown state");
        }
        currentLocation--;
    }
}