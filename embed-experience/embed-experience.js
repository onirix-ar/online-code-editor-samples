const experienceUrls = [
    "https://studio.onirix.com/projects/7caa623f324e4ce1ac8e4ef0bbecf8c3/webar?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjExMjY1LCJwcm9qZWN0SWQiOjI5MTA0LCJyb2xlIjozLCJpYXQiOjE2NTcwMTI4MDl9.ydJfhLr5g4Cv4Ai8Knxj9tSrVmFspWVK8xtWaimeIeU",
    "https://studio.onirix.com/projects/a213302838e24cacacd3885d85de509d/webar?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjExMjY1LCJwcm9qZWN0SWQiOjM0ODE3LCJyb2xlIjozLCJpYXQiOjE2Njg0OTUyMzV9.OrJ3ziwvlDf8aRBBwWgFn2elpuYj1gGd7oQq-GmaUlY",
    "https://studio.onirix.com/projects/a75434af9a1f4ed08689fd55c4a9da88/webar?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjExMjY1LCJwcm9qZWN0SWQiOjMzODc4LCJyb2xlIjozLCJpYXQiOjE2NjY3ODAxMjJ9.W7IGyoX-pinIB7aVgcN9mpvTzu9kl9uC-qLLKP_9_D4",
    "https://studio.onirix.com/projects/f5a0a44819eb4634a7806b5991a5164c/webar?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjExMjY1LCJwcm9qZWN0SWQiOjMwNjk3LCJyb2xlIjozLCJpYXQiOjE2NjAwNDA1ODB9.BN2U617GvTPaq7Kr-KnWEG0UI7WOkzXIbnKixx6-nQc"
]

function loadExperience(url) {

    let studioFrame = document.getElementById("studioFrame")
    if (null == studioFrame) {
        studioFrame = document.createElement('iframe');
        studioFrame.id = "studioFrame";
        studioFrame.allow="autoplay;camera;gyroscope;accelerometer;magnetometer;fullscreen;xr-spatial-tracking;geolocation;web-share;";
        document.body.appendChild(studioFrame);
    }
    studioFrame.src = url;
    document.getElementById("oex-main").classList.add("oex-hide");
}

const listItems = document.querySelectorAll("li");

listItems.forEach( item => {
    const experienceIndex = item.getAttribute("data-expIdx");
    item.addEventListener("click", () => loadExperience(experienceUrls[experienceIndex]));
})
