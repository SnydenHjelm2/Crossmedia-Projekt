const timer = {
    elapsed: () => {
        const started = localStorage.getItem("started");
        if (!started) return 0;
        return Date.now() - parseInt(started);
    },

    restore: () => {
        const started = localStorage.getItem("started");
        if (!started) return;

        clearInterval(timer.interval);
        timer.interval = setInterval(timer.update, 1000);
        startB.disabled = true;
        startB.style.backgroundColor = "gray";
        stop.disabled = false;
        stop.style.backgroundColor = "";
        document.querySelector("p").textContent = "Klockan tickar...";
    },

    start: () => {
        if (localStorage.getItem("started")) return;
        document.querySelector("#end-msg").style.display = "none";
        const start = Date.now();
        document.querySelector("h1").textContent = "02:59:59";
        timer.interval = setInterval(timer.update, 1000);
        startB.disabled = true;
        startB.style.backgroundColor = "gray";
        stop.disabled = false;
        stop.style.backgroundColor = "";
        document.querySelector("p").textContent = "Klockan tickar...";
        localStorage.setItem("started", start);
    },

    stop: (reason) => {
        const started = localStorage.getItem("started");
        if (!started) return;
        localStorage.removeItem("started");
        const h1 = document.querySelector("h1");
        clearInterval(timer.interval);
        timer.interval = null;
        if (reason === "finished") {
            h1.textContent = "00:00:00";
            document.querySelector("p").textContent = "Tiden är här... det ska bli vi igen...";
            document.querySelector("#end-msg").style.display = "block";
        } else {
            h1.textContent = "03:00:00";
            document.querySelector("p").textContent = "Starta timern när ni är redo...";
        }
        startB.disabled = false;
        startB.style.backgroundColor = "";
        stop.disabled = true;
        stop.style.backgroundColor = "gray";
        document.title = "Klockan tickar...";
    },

    update: () => {
        const elapsed = timer.elapsed();
        const timeLeft = 10800000 - elapsed;
        const h1 = document.querySelector("h1");
        if (timeLeft <= 0) {
            timer.stop("finished");
            return;
        }
        const seconds = Math.floor(timeLeft / 1000) % 60;
        const minutes = Math.floor(timeLeft / (1000 * 60)) % 60;
        const hours = Math.floor(timeLeft / (1000 * 60 * 60));

        if (seconds < 10 && minutes < 10) {
            h1.textContent = `0${hours}:0${minutes}:0${seconds}`;
            document.title = `0${hours}:0${minutes}:0${seconds} left...`;
        } else if (minutes < 10) {
            h1.textContent = `0${hours}:0${minutes}:${seconds}`;
            document.title = `0${hours}:0${minutes}:${seconds} left...`;
        } else if (seconds < 10) {
            h1.textContent = `0${hours}:${minutes}:0${seconds}`;
            document.title = `0${hours}:${minutes}:0${seconds} left...`;
        } else {
            h1.textContent = `0${hours}:${minutes}:${seconds}`;
            document.title = `0${hours}:${minutes}:${seconds} left...`;
        }
    }
}

const startB = document.querySelector("#start");
const stop = document.querySelector("#stop");

startB.addEventListener("click", timer.start);
stop.addEventListener("click", timer.stop);
stop.disabled = true;
stop.style.backgroundColor = "gray";
timer.restore();
timer.update();