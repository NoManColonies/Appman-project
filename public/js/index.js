"use strict";
// console.log(FB)
window.onload = () => {
    const navBar = new IntersectionObserver((entries, oberver) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelector('.navbar').classList.add('white');
            }
            else {
                document.querySelector('.navbar').classList.remove('white');
            }
        });
    });
    navBar.observe(document.querySelector('.nav__detector'));
    console.log(onStartUp);
    onStartUp.run();
};
function checkLoginState() {
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
}
async function statusChangeCallback(response) {
    // console.log(response)
    const { userID, accessToken } = response.authResponse;
    const result = await fetch(`https://graph.facebook.com/v8.0/${userID}?fields=picture,id,name&access_token=${accessToken}`, { method: "get" });
    const data = await result.json();
    const login = new FormData();
    login.append("username", data.name);
    const fetchedUserData = await fetch("/api/login", { method: "POST", body: login });
    const userData = await fetchedUserData.json();
    if (userData[0] !== undefined && userData[0].username === data.name) {
        console.log("logged in(1).");
        return;
    }
    const fd = new FormData();
    fd.append("username", data.name);
    fd.append("email", `${data.id}@facebook.com`);
    fd.append("password", `facebook:${data.id}`);
    await fetch("/api/register", { method: "POST", body: fd });
    console.log("logged in(2).");
}
class RunOnStartUp {
    constructor() {
        this.addNewTask = (task) => {
            this.tasks.push(task);
        };
        this.run = () => {
            this.tasks.forEach(task => {
                task();
            });
        };
        this.tasks = [];
    }
}
const onStartUp = new RunOnStartUp();
