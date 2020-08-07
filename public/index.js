console.log(FB)
function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }
  async function statusChangeCallback(response){
      console.log(response)
      const result = await fetch(`https://graph.facebook.com/v8.0/${userID}?fields=picture,name&access_token=${accessToken}`,{method:"get"})
      const data = await result.json();
      const _csrf = document.getElementsByName("_csrf")[0].value;
      const form = new FormData();
      form.append("username",data.id)
      form.append("email",data.id)
      form.append("password",`facebook:$(data.id)`)

      await fetch("/api/register",{method: "POST",body});
  }