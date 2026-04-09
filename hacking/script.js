const currentPage = {
    page: "",
    interval: null
};

const lockscreen = {
    getTime: () => {
        let now = new Date();
        let time = now.toLocaleTimeString("sv-SE");
        let date = now.toLocaleDateString("sv-SE");
        let weekday = now.toLocaleDateString("sv-SE", {weekday: "long"});
        let month = now.toLocaleDateString("sv-SE", {month: "long"});
        return {
            hours: time.split(":")[0],
            minutes: time.split(":")[1],
            date: date.split("-")[2],
            weekday: weekday,
            month: month
        };
    },

    updateTime: () => {
        let time = lockscreen.getTime();
        document.querySelector("#lockscreen h1").textContent = time.hours + ":" + time.minutes;
    }
}

const driver = () => {
    currentPage.page = "lockscreen";
    const h1 = document.querySelector("#lockscreen h1");
    const h3 = document.querySelector("#lockscreen h3");

    let time = lockscreen.getTime();
    if (time.date < 10) time.date = time.date.split("")[1];
    h1.textContent = time.hours + ":" + time.minutes;
    h3.textContent = `${time.weekday} den ${time.date} ${time.month}`;

    currentPage.interval = setInterval(lockscreen.updateTime, 1000);
}

driver();