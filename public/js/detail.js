"use strict";
const stars = document.querySelector(".add-new-ratestar-box").children;
const ratingValue = document.querySelector("#ratestarvalue");
let index;
for (let i = 0; i < stars.length; i++) {
    // console.log(stars)
    stars[i].addEventListener("mouseover",function () {
        for (let j=0; j<stars.length; j++) {
            stars[j].classList.remove("checked");
            stars[j].classList.add("unchecked");
        }
        for (let j  = 0; j<=i; j++) {
            stars[j].classList.remove("unchecked");
            stars[j].classList.add("checked");
        }
    })
    stars[i].addEventListener("click",function() {
        ratingValue.value =i+1;
        index=i+1;
    })
    stars[i].addEventListener("mouseout",function () {
        console.log(index)
        for (let j=0; j<stars.length; j++) {
            stars[j].classList.remove("checked");
            stars[j].classList.add("unchecked");
        }
        for (let j = 0; j < index; j++) {
            stars[j].classList.remove("unchecked");
            stars[j].classList.add("checked");
        }
    })
}