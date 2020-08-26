window.onload = function () {
    let userWindow = window.innerWidth,
        video = document.querySelector('.vid-container'),
        nodeVideo = document.querySelector('.nodeVideo');

    if(userWindow < 1200) {
        nodeVideo.remove();

        video.style.cssText = `
            background: url('./video/rain.gif') 0 0 / cover no-repeat;
            position: absolute;
            width: 100vw;
            height: 100vh;
            position: absolute;
            z-index: -10;
        `
    }

    
}




