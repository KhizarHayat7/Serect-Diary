const chapterContainer =
document.getElementById("chapterContainer");


const searchInput =
document.getElementById("searchInput");


const sortSelect =
document.getElementById("sortSelect");


const logoutBtn =
document.getElementById("logoutBtn");



let chapters = [];
const params = new URLSearchParams(
    window.location.search
);


const id = params.get("id");




// Get chapters from backend

async function loadChapters(){


    try{


        const response = await fetch(
            "http://localhost:8080/api/dairy/chapters",
            {

                method:"GET",

                credentials:"include"

            }
        );



        chapters = await response.json();



        displayChapters(chapters);



    }
    catch(error){


        console.log(error);


    }


}


function formatDate(dateString){

    const date = new Date(dateString);

    return date.toLocaleString(
        "en-US",
        {
            day:"numeric",
            month:"short",
            year:"numeric",
            hour:"numeric",
            minute:"numeric"
        }
    );

}



// Display cards

function displayChapters(data){


    chapterContainer.innerHTML = "";



    data.forEach(chapter=>{


        const card =
        document.createElement("div");



        card.className =
        "chapter-card";




        card.innerHTML = `


            <div class="rating">

               ${chapter.favourite ? "❤️ Favourite" : ""}
            </div>



            <h2>

                ${chapter.title}

            </h2>



            <p>

                ${chapter.content.substring(0,120)}...

            </p>




            <span>

                Updated:
                ${formatDate(chapter.updated_)}
            </span>

             <span>

                Created_date:
                ${formatDate(chapter.create_date)}

            </span>





        `;

        chapterContainer.appendChild(card);

        card.addEventListener("click",()=>{

         window.location.href =
        `dairy.html?id=${chapter.id}`;

});


        return card;
        
        
})
        


   


}









// Search functionality

searchInput.addEventListener(
"input",
()=>{


    const value =
    searchInput.value.toLowerCase();




    const filtered =
    chapters.filter(chapter=>{


        return chapter.title
        .toLowerCase()
        .includes(value);


    });



    displayChapters(filtered);



});








// Sorting

sortSelect.addEventListener(
"change",
()=>{


    let sorted =
    [...chapters];



   if(sortSelect.value==="Favourite"){


sorted.sort(
(a,b)=>
b.favourite - a.favourite
);


}



    else if(sortSelect.value==="oldest"){


        sorted.sort(
        (a,b)=>
        new Date(a.updated_at)
        -
        new Date(b.updated_at)
        );


    }



    else{


        sorted.sort(
        (a,b)=>
        new Date(b.updated_at)
        -
        new Date(a.updated_at)
        );


    }



    displayChapters(sorted);


});









// Logout

logoutBtn.addEventListener(
"click",
async()=>{


    await fetch(
        "http://localhost:8080/api/auth/logout",
        {

            method:"POST",

            credentials:"include"

        }
    );



    window.location.href =
    "index.html";


});








loadChapters();