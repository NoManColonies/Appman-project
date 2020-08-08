"use strict";
function checkLoginState() {
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
}
async function statusChangeCallback(response) {
    // {
    // authResponse: {
    // userID: ""
    // accessToken: ""
    // }
    // }
    const { userID, accessToken } = response.authResponse;
    const result = await fetch(`https://graph.facebook.com/v8.0/${userID}?access_token=${accessToken}&fields=picture,id,name`, { method: "get" });
    const data = await result.json();
    console.log(data);
    const fd = new FormData();
    fd.append("username", data.name);
    fd.append("email", `${data.id}@facebook.com`);
    fd.append("password", `facebook:${data.id}`);
    await fetch("/api/register", { method: "POST", body: fd });
}
