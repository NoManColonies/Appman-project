"use strict";
onStartUp.addNewTask(() => {
    document.querySelector('#login-username').value = "";
    document.querySelector('#login-password').value = "";
    document.querySelector('#register-username').value = "";
    document.querySelector('#register-password').value = "";
    document.querySelector('#register-email').value = "";
    document.querySelector('#register-confirm-password').value = "";
    const loginTab = document.querySelector('#login_tab');
    const registerTab = document.querySelector('#register_tab');
    const loginForm = document.querySelector('#login_form');
    const registerForm = document.querySelector('#register_form');
    const loginSec = document.querySelector('.login');
    const registerSec = document.querySelector('.register');
    const onClick = () => {
        loginTab.classList.toggle("none");
        registerTab.classList.toggle("none");
        loginSec.classList.toggle("login-whenlogin");
        registerSec.classList.toggle("register-whenlogin");
        loginSec.classList.toggle("login-whenregister");
        registerSec.classList.toggle("register-whenregister");
        loginForm.classList.toggle("none");
        registerForm.classList.toggle("none");
        document.querySelector('#login-username').value = "";
        document.querySelector('#login-password').value = "";
    };
    loginTab.addEventListener('click', onClick);
    registerTab.addEventListener('click', onClick);
    const addTextLiftEffect = (type, target) => {
        document.querySelector('#' + type + '-' + target).addEventListener('input', onInput);
        document.querySelector('#' + type + '-' + target).addEventListener('focus', onInput);
        function onInput() {
            const element = document.querySelector('#label-' + type + '-' + target);
            if (document.querySelector('#' + type + '-' + target).value === "") {
                element.classList.remove('label__focus');
            }
            else {
                element.classList.add('label__focus');
            }
        }
    };
    addTextLiftEffect('login', 'username');
    addTextLiftEffect('login', 'password');
    addTextLiftEffect('register', 'username');
    addTextLiftEffect('register', 'email');
    addTextLiftEffect('register', 'password');
    addTextLiftEffect('register', 'confirm-password');
});
