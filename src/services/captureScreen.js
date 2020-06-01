const {desktopCapturer} = require('electron');

/**
 * Create a screenshot of the entire screen using the desktopCapturer module of Electron.
 *
 * @param callback {Function} callback receives as first parameter the base64 string of the image
 * @param imageFormat {String} Format of the image to generate ('image/jpeg' or 'image/png')
 **/
 function fullscreenCapture(callback, imageFormat) {
  // imageFormat = imageFormat || 'image/png';
  imageFormat = imageFormat || 'image/jpeg';

  desktopCapturer.getSources({ types: ['screen'] }).then(async sources => {
    console.log(JSON.stringify(sources))
    for (const source of sources) {
      // Filter: main screen
      if ((source.name === "Entire screen")
        || (source.name === "Screen 1") || (source.name === "Screen 2") || (source.name === "Screen 3") || (source.name === "Screen 4")) {
        try{
          const stream = await navigator.mediaDevices.getUserMedia({
            audio: false,
            video: {
              mandatory: {
                chromeMediaSource: 'desktop',
                chromeMediaSourceId: source.id,
                minWidth: 1280,
                maxWidth: 2000,
                minHeight: 720,
                maxHeight: 2000,
              }
            }
          });

          handleStream(stream);
        } catch (e) {
          handleError(e);
        }
      }
    }
  });

  let handleStream = (stream) => {
    // Create hidden video tag
    let video = document.createElement('video');
    video.style.cssText = 'position:absolute;top:-10000px;left:-10000px;';

    video.srcObject = stream;

    // Event connected to stream
    video.addEventListener('loadedmetadata', (e) => {
      // Set video ORIGINAL height (screenshot)
      // video.style.height = this.videoHeight + 'px'; // videoHeight
      // video.style.width = this.videoWidth + 'px'; // videoWidth

      video.play();

      // Create canvas
      let canvas = document.createElement('canvas');
      canvas.width = e.target.videoWidth;
      canvas.height = e.target.videoHeight;
      let ctx = canvas.getContext('2d');
      
      // Draw video on canvas
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      if (callback) {
        // Save screenshot to base64
        callback(canvas.toDataURL(imageFormat));
      } else {
        throw new Error('No callback function specified');
      }

      video.pause();
      video.removeAttribute('src'); // empty source
      video.load();
      video = null;
      canvas = null;

      try {
        // Destroy connect to stream
        stream.getTracks().forEach(function(track) {
          track.stop();
        });
      } catch (e) {
        console.log(e);
      }
    }, {once: true});
  };

  let handleError = function(e) {
    console.log(e);
  };
}

export default fullscreenCapture