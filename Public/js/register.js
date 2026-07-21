const registerForm =
document.getElementById("registerForm");



registerForm.addEventListener("submit",async(e)=>{


e.preventDefault();



const username =
document.getElementById("username").value;


const email =
document.getElementById("email").value;


const password =
document.getElementById("password").value;



const response =
await fetch(
"/api/auth/register",
{

method:"POST",
credentials:"include",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

username,
email,
password

})

});


const data =
await response.json();



if(response.ok){




window.location.href="dashboard.html";


}

else{

alert(data.message || "Registration failed");

}



});
