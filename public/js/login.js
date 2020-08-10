"use strict";
document.querySelector('#login-username').addEventListener('input', () => {
    const target = document.querySelector('#label__username');
    if (document.querySelector('#login-username').value === "") {
        target.classList.remove('label__focus');
    }
    else {
        target.classList.add('label__focus');
    }
});
document.querySelector('#login-password').addEventListener('input', () => {
    const target = document.querySelector('#label__password');
    if (document.querySelector('#login-password').value === "") {
        target.classList.remove('label__focus');
    }
    else {
        target.classList.add('label__focus');
    }
});
onStartUp.addNewTask(() => {
    document.querySelector('#login-username').value = "";
    document.querySelector('#login-password').value = "";
});
console.log(onStartUp);
