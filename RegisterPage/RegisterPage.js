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


//form js
let form = document.getElementById("Register_Form")

form.addEventListener("submit", function(e){
  e.preventDefault()

  let firstName = document.getElementById("first_name").value
  let lastName = document.getElementById("last_name").value
  let gender = document.getElementById("gender").value
  let address = document.getElementById("address").value
  let email = document.getElementById("email").value
  let errorText = document.getElementById("error_txt")

  errorText.innerText = ""

  if(firstName.trim() === "" || !isUpperCase(firstName.charAt(0))){
    errorText.innerText = "First letter in first name must be uppercase"
  }
  else if(lastName.trim().length < 2 ){
    errorText.innerText = "Last name must be at least 2 characters"
  }
  else if(address.trim().split(" ").length < 2){
    errorText.innerText = "Address must have at least 2 words"
  }
  else if(gender === "" || gender === "Select Gender"){
    errorText.innerText = "Gender must be selected";
  }
  else if(!validateAddress(address)){
    errorText.innerText = "Address must contain 1 digit and '#'"
  }
  else if(!email.endsWith("@zendragon.com")){
    errorText.innerText = "Email must end with @zendragon.com"
  }
  else{
    alert("Registration complete")
    // console.log("Redirecting to HomePage")
    window.location.href = "../HomePage/HomePage.html"
  }
})

function validateAddress(input){
  let containDigits = false
  let containHashTag = false

  for(let i = 0; i < input.length; i++){
    const c = input[i];
    if(c >= '0' && c <= '9'){
      containDigits = true
    }
    if(c === '#'){
      containHashTag = true
    }
  }

  return containDigits && containHashTag
}

function isUpperCase(char) {
  return char === char.toUpperCase();
}