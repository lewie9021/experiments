function generateThumbnail(src, type, callback) {
    var $video = document.createElement("video");
    var $canvas = document.createElement("canvas");
    var context = $canvas.getContext("2d");
    var width, height;

    $video.addEventListener("loadedmetadata", function() {
         // Seek to the middle of the video.
        this.currentTime = this.duration / 2;

        width = this.videoWidth / 2;
        height = this.videoHeight / 2;

        $canvas.width = width;
        $canvas.height = height;
    }, true);

    $video.addEventListener("canplay", function() {
        context.drawImage(this, 0, 0, width, height);
        this.pause();

        callback(null, $canvas.toDataURL());
    }, true);

    $video.addEventListener("error", callback, true);

    $video.crossOrigin = "anonymous";
    $video.preload = "auto";
    $video.autoplay = true;
    $video.muted = true;
    $video.src = src;
    $video.play();
}

// This will work running with Express.
var videoURL = "video.mp4";

// This won't work unless it has the "Access-Control-Allow-Origin: *" header se.tfa
// var videoURL = "http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_1mb.mp4";

generateThumbnail(videoURL, "video/mp4", function(err, imageData) {
    if (err)
        throw err;
    
    // Will log the base64 encoded string in console.
    console.log("imageData:", imageData);
    
    var $img = document.getElementById("thumbnail");
    $img.src = imageData;
});


