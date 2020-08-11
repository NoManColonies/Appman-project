document.querySelector('#login-username')!.addEventListener('input', () => {
    const target = document.querySelector('#label__username')!;
    if (document.querySelector('#login-username')!.value === "") {
        target.classList.remove('label__focus');
    } else {
        target.classList.add('label__focus');
    }
})
document.querySelector('#login-password')!.addEventListener('input', () => {
    const target = document.querySelector('#label__password')!;
    if (document.querySelector('#login-password')!.value === "") {
        target.classList.remove('label__focus');
    } else {
        target.classList.add('label__focus');
    }
})

onStartUp.addNewTask(() => {
    document.querySelector('#login-username')!.value = "";
    document.querySelector('#login-password')!.value = "";
    const loginTab = document.querySelector('#login_tab')!;
    const registerTab = document.querySelector('#register_tab')!;
    const loginForm = document.querySelector('#login_form')!;
    const registerForm = document.querySelector('#register_form')!;
    const loginSec = document.querySelector('.login')!;
    const registerSec = document.querySelector('.register')!;
    
    const onClick = () => {
        loginTab.classList.toggle("none");
        registerTab.classList.toggle("none");
        loginSec.classList.toggle("login-whenlogin");
        registerSec.classList.toggle("register-whenlogin");
        loginSec.classList.toggle("login-whenregister");
        registerSec.classList.toggle("register-whenregister");
        loginForm.classList.toggle("none");
        registerForm.classList.toggle("none");
        document.querySelector('#login-username')!.value = "";
        document.querySelector('#login-password')!.value = "";
    }

    loginTab.addEventListener('click', onClick);
    registerTab.addEventListener('click', onClick);
});