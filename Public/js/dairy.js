const title =
document.getElementById("title");


const content =
document.getElementById("content");


const rating =
document.getElementById("rating");


const created =
document.getElementById("created");


const updated =
document.getElementById("updated");



const editBtn =
document.getElementById("editBtn");


const deleteBtn =
document.getElementById("deleteBtn");





// get id from URL

const params =
new URLSearchParams(window.location.search);



const chapterId =
params.get("id");





let chapterData;




async function loadChapter(){


const response =
await fetch(
`/api/dairy/chapter/${chapterId}`,
{
credentials:"include"
}
);



chapterData =
await response.json();



title.innerText =
chapterData.title;



content.innerText =
chapterData.content;



rating.innerText =
"⭐".repeat(chapterData.rating);



created.innerText =
"Created: "
+
new Date(
chapterData.create_date
)
.toLocaleString();



updated.innerText =
"Updated: "
+
new Date(
chapterData.updated_at
)
.toLocaleString();



}




loadChapter();





// Edit button

editBtn.addEventListener(
"click",
()=>{


const params =
new URLSearchParams(window.location.search);


const chapterId =
params.get("id");



window.location.href =
    `editChapter.html?id=${chapterId}`;


});





// Delete button

deleteBtn.addEventListener(
"click",
async()=>{


const password =
prompt(
"Enter your password to delete:"
);



if(!password)
return;




const response =
await fetch(

`/api/dairy/deleteChapter/${chapterId}`,

{

method:"DELETE",


credentials:"include",


headers:{

"Content-Type":"application/json"

},


body:JSON.stringify({

password

})


}

);

window.location.href =
"dashboard.html";



const data =
await response.json();



if(response.ok){

alert("Chapter deleted");


window.location.href =
"dashboard.html";

}

else{

alert(data.message);

}



});
