console.log("heeelo ")
const loginForm = document.getElementById("loginForm");


loginForm.addEventListener("submit", async (e)=>{

    e.preventDefault();


    const username =
    document.getElementById("username").value;


    const password =
    document.getElementById("password").value;



    try {


        const response = await fetch(
            "/api/auth/login",
            {

                method:"POST",

                

                headers:{
                    "Content-Type":"application/json"
                },
                credentials:"include",

                body:JSON.stringify({

                    username,
                    password

                })

            }
        );



        const data = await response.json();



        if(response.ok){

            

            window.location.href="dashboard.html";

        }
        else{

            alert(data.message || "Login failed");

        }



    } catch(error){

        console.log(error);

        alert("Server error");

    }


});
