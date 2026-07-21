const titleInput =
document.getElementById("title");


const contentInput =
document.getElementById("content");


const favouriteInput =
document.getElementById("favourite");


const saveBtn =
document.getElementById("saveBtn");





// Get chapter id from URL

const params =
new URLSearchParams(
window.location.search
);



const chapterId =
params.get("id");





// Load existing chapter

async function loadChapter(){


    try{


        const response =
        await fetch(
        `http://localhost:8080/api/dairy/chapter/${chapterId}`,
        {

            method:"GET",

            credentials:"include"

        }
        );



        const chapter =
        await response.json();




        titleInput.value =
        chapter.title;



        contentInput.value =
        chapter.content;



        favouriteInput.checked =
        chapter.favourite;



    }


    catch(error){

        console.log(error);

        alert("Failed loading chapter");

    }


}




loadChapter();








// Update chapter

saveBtn.addEventListener(
"click",
async()=>{


    const updatedChapter = {


        title:
        titleInput.value,


        content:
        contentInput.value,


        favourite:
        favouriteInput.checked


    };




    try{


        const response =
        await fetch(

        `http://localhost:8080/api/dairy/UpdateChapter/${chapterId}`,

        {

            method:"PUT",


            credentials:"include",


            headers:{

                "Content-Type":
                "application/json"

            },


            body:
            JSON.stringify(updatedChapter)


        }

        );

         window.location.href =
            `dairy.html?id=${chapterId}`;  



        const data =
        await response.json();




        if(response.ok){


            alert("Chapter updated successfully!");



            window.location.href =
            `dairy.html?id=${chapterId}`;


        }


        else{


            alert(
            data.message ||
            "Update failed"
            );


        }



    }



    catch(error){


        console.log(error);

        alert("Server error");


    }



});