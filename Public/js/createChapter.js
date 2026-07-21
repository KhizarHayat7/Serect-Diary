const stars =
document.getElementById("1");


let rating = false;



stars.classList.remove("active");

stars.addEventListener(
"click",
()=>{


if(rating === false){
    rating = true

stars.classList.add("active");
}else{
    stars.classList.remove("active");
    rating = false
}




});












document
.getElementById("saveChapter")
.addEventListener(
"click",
async()=>{


const title =
document.getElementById("chapterTitle").value;



const content =
document.getElementById("chapterContent").value;



const response =
await fetch(
"http://localhost:8080/api/dairy/createChapter",
{

method:"POST",

credentials:"include",

headers:{

"Content-Type":"application/json"

},


body:JSON.stringify({

title,

content,

rating

})


}

);




if(response.ok){



window.location.href="dashboard.html";

}

else{

alert("Failed creating chapter");

}


});