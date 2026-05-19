let date = new Date()
let year = date.getFullYear(); // Hämtar året
let month = String(date.getMonth() + 1).padStart(2, '0'); // Hämtar månaden (0-indexerad, +1) och lägger till en ledande nolla
let day = String(date.getDate()).padStart(2, '0'); // Hämtar dagen och lägger till en ledande nolla
let formattedDate = `${year}-${month}-${day}`; // Formaterar till xxxx-xx-xx



let btn = document.querySelector("button");
btn.addEventListener("click", async function() {

    let req = new Request("https://railway-timer-production.up.railway.app/start", {
        headers: {"Content-type": "application/json"},
        method: "POST"
    });
    
    await fetch(req).then(resp => resp.json()).then(reso => console.log(reso));

    window.location.href = "https://railway-timer-production.up.railway.app/";
})
