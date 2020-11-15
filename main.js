// TO DO
// look for Spread Operator - JS
// https://blog.skay.dev/es6-spread-operator


function onload() {
    let canvas = document.getElementById("audio_visual");
    let ctx = canvas.getContext("2d");
    let audio = document.getElementById("audio");
    let AudioCtx = new AudioContext();

    // getContext() is a function that return what's inside the canvas element


    console.log(canvas.getContext("2d"))
        // the constructor of th AudioContext returns a object, that helps the connection between js and the audio file.
        // An audio context controls both the creation of the nodes it contains and the execution of the audio processing, or decoding.

    // by doing all this AudioCtx.createAnalyser() or AudioCtx.createMediaElementSource(), you are accessing all the keys of the new object created by new webkitAudioContext();

    let analyser = AudioCtx.createAnalyser();
    analyser.fftSize = 2048;
    let src = AudioCtx.createMediaElementSource(audio);

    src.connect(analyser); //this connects audio to default output(speakers)
    src.connect(AudioCtx.destination);
    let data = new Uint8Array(analyser.frequencyBinCount);
    // console.log(data)

    requestAnimationFrame(loopingfunction); //loopingfunction here is the callback function, called 60 times a second

    // here the getByteFrequencyData()populates data array with diff sounds from our audio, basically passing it a array to put data in
    function loopingfunction() {
        requestAnimationFrame(loopingfunction);
        analyser.getByteFrequencyData(data);
        draw(data);
    }

    function draw(data) {
        data = [...data];
        ctx.clearRect(0, 0, canvas.width, canvas.height); //x,y,height,width
        let space = canvas.width / data.length;

        data.forEach((value, i) => {
            ctx.beginPath();
            ctx.moveTo(space * i, canvas.height); //x,y
            ctx.lineTo(space * i, canvas.height - value); //x,y
            ctx.stroke();
        })
    }

    //just resuming audio, cause most browsers mute it in the fear of spam
    audio.onplay = () => {
        AudioCtx.resume();
    }
}

onload();