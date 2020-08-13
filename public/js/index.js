"use strict";
class RunOnStartUp {
    constructor() {
        this.addNewTask = (task) => {
            this.tasks.push(task);
        };
        this.run = () => {
            console.log("running startup tasks.");
            this.tasks.forEach(task => {
                task();
            });
        };
        this.tasks = [];
    }
}
const onStartUp = new RunOnStartUp();
window.onload = async () => {
    const validationResult = await fetch("/api/", { method: "POST" });
    const login = await validationResult.json();
    console.log("Is logged in: " + login);
    const logoutBtn = document.querySelector("#logout");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", Logout);
    }
    onStartUp.run();
    async function Logout() {
        await fetch("/api/logout", { method: "post" });
        window.location.href = "/";
    }
    ;
};
// function checkLoginState() {
//     FB.getLoginStatus(async function(response: Object) {
//     statusChangeCallback(response);
//     // const { userID, accessToken } = response.authResponse;
//     // const fd = new FormData();
//     // fd.append("userID", userID);
//     // fd.append("accessToken", accessToken);
//     // // console.log(userID, accessToken);
//     // await fetch("/api/facebook", { method: "POST", body: fd});
//     });
// }
async function statusChangeCallback(response) {
    // console.log(response)
    const { userID, accessToken } = response.authResponse;
    const result = await fetch(`https://graph.facebook.com/v8.0/${userID}?fields=picture,id,name&access_token=${accessToken}`, { method: "get" });
    const data = await result.json();
    const fd = new FormData();
    fd.append("username", data.name);
    const fetchedUserData = await fetch("/api/login", { method: "POST", body: fd });
    const userData = await fetchedUserData.json();
    if (userData[0] !== undefined && userData[0].username === data.name) {
        console.log("logged in.");
        // fd.append("data", "some data");
        // const retrieveUpdatedData = await fetch("/api/", { method: "POST", body: fd });
        // console.log(await retrieveUpdatedData.json());
        window.location.href = "/";
        return;
    }
    fd.append("email", `${data.id}@facebook.com`);
    fd.append("password", `facebook:${data.id}`);
    await fetch("/api/register", { method: "POST", body: fd });
    console.log("logged in. Successfully registered user.");
    window.location.href = "/login-register";
}
