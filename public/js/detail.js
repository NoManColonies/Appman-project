"use strict";
const star = document.querySelector(".add-new-rate-star-box").children;
for (let i = 0; i < star.length; i++) {
    star[i].addEventListener("mouseover",function () {
        for (let j = 0; j < array.length; j++) {
            star[j].classList.remove("fa-star")
            star[j].classList.add("fa-star-o")
        }
        for (let j = 0; j < array.length; j++) {
            star[j].classList.remove("fa-star-0")
            star[j].classList.add("fa-star")
        }
    })
}