const app = () => {
    // find elem
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');

    const playWrapper = document.querySelector('.wrap_img');

    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.vid-container video');

    const sounds = document.querySelector('.sound-picker');

    const paused = document.querySelector('.paused');
    const replay = document.querySelector('.replay');

    const timeDisplay = document.querySelector('.time-display');

    const timeDisplaySeconds = document.querySelector('.time-display-seconds');
    const timeDisplayMinutes = document.querySelector('.time-display-minutes');

    //Get the length of outline
    let outlineLength = outline.getTotalLength();

    //Duration
    let duration = 180;
    let calcDuration = (duration / 60) - 1;

    //Set default timer value
    timeDisplayMinutes.innerHTML = '03';
    timeDisplaySeconds.innerHTML = '00';

    //lets fill svg
    outline.style.strokeDasharray = outlineLength;

    //Moving line
    outline.style.strokeDashoffset = outlineLength;

    //revive timer
    let timerStorage = {
        minutes: timeDisplayMinutes.innerHTML,
        seconds: 60,
        state: {
            play: function () {
                play.style.display = 'none';
                paused.style.display = 'block';
                replay.style.display = 'none';

                song.play()
                video.play();
            },
            pause: function () {
                play.style.display = 'block';
                paused.style.display = 'none';
                replay.style.display = 'none';

                stopMovingSvgAndTimer();

                song.pause()
                video.pause();
            },
            replay: function () {
                play.style.display = 'none';
                paused.style.display = 'block';
                replay.style.display = 'none';

                song.play()
                video.play();
                stopMovingSvgAndTimer()

                moveSvgAndTimer();
            },
            end: function () {
                play.style.display = 'none';
                paused.style.display = 'none';
                replay.style.display = 'block';

                song.pause()
                video.pause();
            },
        }
    }
    function changeTimer() {
        //Если это первый запуск таймера то отнять от минуты -1
        if (timeDisplaySeconds.innerHTML === '00') timerStorage.minutes--;

        timerStorage.seconds--;

        //Set timer display, if its 10 minutes then set 10 minutes or add null
        timeDisplaySeconds.innerHTML = `${timerStorage.seconds}`;
        if (timeDisplayMinutes.innerHTML === '10') {
            timeDisplayMinutes.innerHTML = `${timerStorage.minutes}`;
        } else {
            timeDisplayMinutes.innerHTML = `0${timerStorage.minutes}`;
        }

        //If minutes and seconds is 0 then stop the timer and svg animation
        if (timerStorage.minutes === 0 && timerStorage.seconds === 0) {
            stopMovingSvgAndTimer();
            timerStorage.state.end();
            timerStorage.minutes = calcDuration;
            timerStorage.seconds = 60;
        }

        //If minute is over - set new value for timer
        if (timerStorage.seconds === 0 && timerStorage.minutes !== 0) {
            timerStorage.seconds = 60;
            timerStorage.minutes--;
        }

        //if the seconds are less then 10 then add null before seconds
        if (timerStorage.seconds < 10) {
            timeDisplaySeconds.innerHTML = `0${timerStorage.seconds}`;
        }
    }

    //calc values and move the stroke along with the timer 
    function runningStroke() {
        let counter = 0;

        return function () {
            counter++;
            let stepMove = outlineLength - ((outlineLength / duration) * counter);
            return outline.style.strokeDashoffset = stepMove;
        }
    }
    let startRunnigSroke = runningStroke();

    //Create the independent variables for function with setinterval
    let moveSvgTimer;
    let moveSvg;

    function moveSvgAndTimer() {
        moveSvgTimer = setInterval(changeTimer, 1000);
        moveSvg = setInterval(startRunnigSroke, 1000);
    }
    function stopMovingSvgAndTimer() {
        clearInterval(moveSvgTimer)
        clearInterval(moveSvg)

    }

    //Handler
    function playButtonHandler() {
        if (song.paused) {
            timerStorage.state.play();
        } else {
            timerStorage.state.pause();
        }
    }

    // Play audio and video on click
    play.addEventListener('click', function () {
        moveSvgAndTimer();
        playButtonHandler();

    })
    //If click on block with class paused then stop audio and video or replay if it end
    document.addEventListener('click', function (event) {
        target = event.target;
        if (target.className === 'paused') {
            stopMovingSvgAndTimer();
            playButtonHandler();
        } else if (target.className === 'replay') {
            timerStorage.state.replay();
        }
    })


    // Set value for timer on click
    document.querySelector('.time-select').onclick = function (event) {
        let target = event.target;
        duration = target.dataset.time;    //Get data-attribute value
        // Set timer
        switch (+duration) {
            case 180:
                timerStorage.minutes = 3;
                timeDisplayMinutes.innerHTML = `0${timerStorage.minutes}`;
                break;
            case 300:
                timerStorage.minutes = 5;
                timeDisplayMinutes.innerHTML = `0${timerStorage.minutes}`;
                break;
            case 600:
                timerStorage.minutes = 10;
                timeDisplayMinutes.innerHTML = `${timerStorage.minutes}`;
                break;
        }
    }
    // Weather switcher
    sounds.addEventListener('click', function (event) {
        let target = event.target,
            userWindow = window.innerWidth,
            video = document.querySelector('.vid-container'),
            nodeVideo = document.querySelector('.nodeVideo');

        if (target.className === 'rain_img') {
            timerStorage.state.pause()
            song.src = './sounds/rain.mp3'
            video.src = './video/rain.mp4'
        } else if (target.className === 'beach_img') {
            timerStorage.state.pause()
            song.src = './sounds/beach.mp3'
            video.src = './video/beach.mp4'
        }

        //checkup for mobile version
        if (userWindow < 1200 && target.className === 'rain_img') {
            video.style.cssText = `
        background: url('./video/rain.gif') 0 0 / cover no-repeat;
        width: 100vw;
        height: 100vh;
        position: absolute;
        z-index: -10;
        `
        } else if (userWindow < 1200 && target.className === 'beach_img') {
            video.style.cssText = `
        background: url('./video/beach.gif') 0 0 / cover no-repeat;
        width: 100vw;
        height: 100vh;
        position: absolute;
        z-index: -10;
        `
        }
    })

    document.querySelector('.replay').onclick = function () {
        timerStorage.state.replay();
    }

}
app();

// Hightlight for buttons
let timeSelect = document.querySelector('.time-select');
let getSelect = document.querySelector('.btn_select')
let selected;

timeSelect.addEventListener('click', function (event) {
    let target = event.target;

    if (target.className !== 'btn_select') return

    highlight(target);

    function highlight(value) {
        getSelect.classList.remove('btn_hightlight');
        // if the button is already highlighted
        if (selected) {
            selected.classList.remove('btn_hightlight');
        }
        selected = value;
        selected.classList.add('btn_hightlight');
    }
})





