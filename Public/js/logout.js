const logoutBtn = document.getElementById("logoutBtn");
console.log("heeel")

logoutBtn.addEventListener("onclick", async () => {

    await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include"
    });

    window.location.href = "index.html";

});
