"use strict";
import "./styles.scss";

document.addEventListener("DOMContentLoaded", splitScroll);
function splitScroll() {
  console.log("splitScroll");
  document.onscroll = function () {
    console.log("sectionDetector");
    let allSections = [];
    let currentSection;
    let scrollTop;
    let heightBefore;

    scrollTop = document.documentElement.scrollTop;

    //Henter de forskellige tekst sektioner fra html'en og putter dem ind i et array.
    allSections = document.querySelectorAll(".sustainability_col");
    console.log("allSections", allSections);

    for (let i = 0; i < allSections.length; i++) {
      currentSection = allSections[i];

      //Her siger vi hvornår vi kommer til næste sektion  - Skifter billede når man har scrollet ned 2/3 del af sektionen
      heightBefore = 0;
      if (i > 0) {
        heightBefore = allSections[i - 1].offsetHeight / 3;
      }
      if (scrollTop > 260 && scrollTop < 6500) {
        document.querySelector(".sustainability_picture_container").style.position = "fixed";
        document.querySelector(".sustainability_picture_container").style.top = 0;
        document.querySelector(".sustainability_picture_container").style.right = 0;
      } else {
        document.querySelector(".sustainability_picture_container").style.position = "relative";
      }

      if (scrollTop > currentSection.offsetTop - heightBefore) {
        let text1 = document.querySelector(".text1");
        let text2 = document.querySelector(".text2");
        let text3 = document.querySelector(".text3");
        let text4 = document.querySelector(".text4");
        if (currentSection === text1) {
          document.querySelector(".sus_pic").setAttribute("src", "static/clipart/CLIPART_ASSETS1.PNG");
        } else if (currentSection === text2) {
          document.querySelector(".sus_pic").setAttribute("src", "static/clipart/CLIPART_ASSETS2.PNG");
        } else if (currentSection === text3) {
          document.querySelector(".sus_pic").setAttribute("src", "static/clipart/CLIPART_ASSETS5.PNG");
        } else if (currentSection === text4) {
          document.querySelector(".sus_pic").setAttribute("src", "static/clipart/CLIPART_ASSETS4.PNG");

        }
      }
    }
  };
}
