function generateThumbnail(src, type, callback) {
    var $video = document.createElement("video");
    var $canvas = document.createElement("canvas");
    var context = $canvas.getContext("2d");
    var duration;

    $video.crossOrigin = "anonymous";
    $video.src = src;
    $video.muted = true;

    $video.onloadedmetadata = function() {
        // Seek to the middle of the video.
        this.currentTime = this.duration / 2;
    };
    
    $video.oncanplay = function() {
        var width = this.videoWidth / 2;
        var height = this.videoHeight / 2;
        
        this.play();

        $canvas.width = width;
        $canvas.height = height;
        
        context.drawImage(this, 0, 0, width, height);
        this.pause();

        // TODO: Find a way to remove this.
        document.body.appendChild($video);

        callback(null, $canvas.toDataURL());
    };

    $video.error = function(e) {
        callback(e);
    };
}

// This will work running with Express.
var videoURL = "video.mp4";

// This won't work unless it has the "Access-Control-Allow-Origin: *" header set.
// var videoURL = "http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_1mb.mp4";

generateThumbnail(videoURL, "video/mp4", function(err, imageData) {
    if (err)
        throw err;

    // Will log the base64 encoded string in console.
    console.log(imageData);
});


