window.onload = function () {
    let userWindow = window.innerWidth,
        video = document.querySelector('.vid-container'),
        nodeVideo = document.querySelector('.nodeVideo');

    if (userWindow < 1200) {
        nodeVideo.remove();

        video.style.cssText = `
            background: url('./video/rain.gif') 0 0 / cover no-repeat;
            position: absolute;
            width: 100%;
            min-width: 100%;
            max-width: 100%;
            height: 100%;
            min-height: 100%;
            max-height: 100%;
            z-index: -10;
        `
    }

    
}

const sounds = document.querySelector('.sound-picker');
sounds.onclick = function(event){
    let target = event.target,
        userWindow = window.innerWidth,
        video = document.querySelector('.vid-container'),
        nodeVideo = document.querySelector('.nodeVideo');

    //checkup for mobile version
    if (userWindow < 1200 && target.className === 'rain_img') {
        nodeVideo.remove();
        video.style.cssText = `
        background: url('./video/rain.gif') 0 0 / cover no-repeat;
        width: 100vw;
        height: 100%;
        position: absolute;
        z-index: -10;
        `
    } else if (userWindow < 1200 && target.className === 'beach_img') {
        nodeVideo.remove();
        video.style.cssText = `
        background: url('./video/beach.gif') 0 0 / cover no-repeat;
        width: 100vw;
        height: 100%;
        position: absolute;
        z-index: -10;
        `
    }

}



