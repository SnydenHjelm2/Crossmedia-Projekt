const req = {
    send: async (path, method, body = null) => {
        let reqObj = {
            method: method,
            headers: {"content-type": "application/json"}
        }
        if (body) reqObj.body = JSON.stringify(body);
        let resp = await fetch(`http://localhost:8000/${path}`, reqObj);
        return resp.json();
    }
}

const timer = {
    elapsed: () => {
        return Date.now() - timer.startTime;
    },

    h1: document.querySelector("h1"),

    initiate: async () => {
        let reso = await req.send("time", "GET");
        if (typeof reso !== "string") return "Timer not started";
        timer.startTime = parseInt(reso);
        timer.update();
        timer.interval = setInterval(timer.update, 1000);
        return true;
    },

    interval: null,

    p: document.querySelector("p"),

    start: async () => {
        let now = Date.now();
        let reso = await req.send("start", "POST", {
            time: now.toString()
        });
        if (reso.error) return "Timer already started!";
        await timer.initiate();
        timer.interval = setInterval(timer.update, 1000);
        return "Timer started!";
    },

    startTime: null,

    stop: async (type) => {
        let reso = await req.send("reset", "DELETE");
        clearInterval(timer.interval);
        if (type === "finished") {
            clearInterval(timer.interval);
            timer.h1.textContent = "00:00:00";
            timer.p.innerHTML = "Tiden är inne, det ska bli vi igen...<br>Tack för att ni spelade!";
        }
        timer.h1.textContent = "03:00:00";
        timer.p.textContent = "...";
        document.title = "03:00:00 left...";
        return "Timer stopped!";
    },

    update: () => {
        if (!timer.startTime) return "Timer not started!";

        let elapsed = timer.elapsed();
        let timeLeft = 10800000 - elapsed;
        if (timeLeft <= 0) {
            timer.stop("finished");
            return;
        }

        const seconds = Math.floor(timeLeft / 1000) % 60;
        const minutes = Math.floor(timeLeft / (1000 * 60)) % 60;
        const hours = Math.floor(timeLeft / (1000 * 60 * 60));

        if (seconds < 10 && minutes < 10) {
            timer.h1.textContent = `0${hours}:0${minutes}:0${seconds}`;
            document.title = `0${hours}:0${minutes}:0${seconds} left...`;
        } else if (minutes < 10) {
            timer.h1.textContent = `0${hours}:0${minutes}:${seconds}`;
            document.title = `0${hours}:0${minutes}:${seconds} left...`;
        } else if (seconds < 10) {
            timer.h1.textContent = `0${hours}:${minutes}:0${seconds}`;
            document.title = `0${hours}:${minutes}:0${seconds} left...`;
        } else {
            timer.h1.textContent = `0${hours}:${minutes}:${seconds}`;
            document.title = `0${hours}:${minutes}:${seconds} left...`;
        }
    }
}

//timer.start();
timer.initiate();