// console.log(FB)
window.onload = () => {
    // setTimeout(checkLoginState, 3000);
    // document.querySelector('.fb-login-button')!.click();
};

function checkLoginState() {
    FB.getLoginStatus(function(response: Object) {
      statusChangeCallback(response);
    });
}

async function statusChangeCallback(response: Object){
    // console.log(response)
    const { userID, accessToken } = response.authResponse;

    const result = await fetch(`https://graph.facebook.com/v8.0/${userID}?fields=picture,id,name&access_token=${accessToken}`, { method: "get" })
    const data = await result.json();

    const fetchedUserData = await fetch("/api/login", { method: "POST" });
    
    const userData = await fetchedUserData.json();

    if (userData[0] !== undefined && userData[0].username === data.name) {
        console.log("logged in(1).")
        return;
    }

    const fd = new FormData();

    fd.append("username", data.name)
    fd.append("email", `${data.id}@facebook.com`)
    fd.append("password", `facebook:${data.id}`)

    await fetch("/api/register",{ method: "POST", body: fd });

    console.log("logged in(2).")
}