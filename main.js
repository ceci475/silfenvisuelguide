import "./styles.scss";

$("#cnt__nav-trigger, .cnt__nav").click(function () {
  $(".nav-trigger").toggleClass("is-open");
  $(".cnt__nav").toggleClass("is-open");
});

const x = window.matchMedia("(min-width: 1200px)");

 const accordion = document.querySelectorAll(".contentBx");
  if (x.matches) {
    console.log("x matches");
    accordion.forEach((menulink) => {
      menulink.addEventListener("mouseover", () => {
        menulink.classList.add("active");
      });
      accordion.forEach((menulink) => {
        menulink.addEventListener("mouseout", () => {
          menulink.classList.remove("active");
        });
      });
    });
  } else {
    console.log("x doesn't match");
  }
  for (let i = 0; i < accordion.length; i++) {
     accordion[i].addEventListener("click", function () {
         if (accordion[i].classList.contains("active")){
            accordion[i].classList.remove("active");
            } 
         else {
            accordion.forEach(link =>{
            link.classList.remove("active");
        });
        accordion[i].classList.add("active");
                                  
             }
     }); 
  }
    
        
   
