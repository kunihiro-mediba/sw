addEventListener("load", () => {
    if ("serviceWorker" in navigator) {
        console.log("register ServiceWorker");
        navigator.serviceWorker.register("./service-worker.js")
            .then((reg) => {
                console.log(reg);
            })
            .catch((err) => {
                console.error("ServiceWorker register failed", err);
            });
    } else {
        console.log("Not suppoet ServiceWorker");
    }
});
