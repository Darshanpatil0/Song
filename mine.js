var arr = [
    {songName:"Arjan Vailly Ne", url:"./songs/arjan Vailly Ne.mp3", img:"./images/animal.jpg",duretion: "1.80"},
    {songName:"Jale 2", url:"./songs/jale 2.mp3", img:"./images/jale.jpg" ,duretion: "1.60"},
    {songName:"pehle bhi main", url:"./songs/pehle Bhi Main.mp3", img:"./images/animal.jpg",duretion: "2.50"},
    {songName:"Ram siys Ram", url:"./songs/Ram Siya Ram.mp3", img:"./images/ram.jpg",duretion: "2.30"},
    
]
var seltersong = 0;

var play = document.querySelector("#play");
var backword = document.querySelector("#backword");
var forword = document.querySelector("#forword");
var progressBar = document.querySelector('.progress-bar');    
var audio = new Audio()
var progressBarContainer = document.getElementById('progressBarContainer');
var progressBar = document.getElementById('progressBar');


var allSong = document.querySelector("#all-song");
var poster = document.querySelector("#left");
function mainfunction(){





var cultter = "";
arr.forEach(function(elem,index){
    cultter += `<div class="song-cart play" id="${index}">
    <div class="Part1">
            <img src="${elem.img}" alt="">
            <h2>${elem.songName}</h2>
    </div>
    <h6>${elem.duretion}</h6>
</div>`;
});

audio.src = arr[seltersong].url;
allSong.innerHTML = cultter;
poster.style.backgroundImage = `url(${arr[seltersong].img})`

}
var f = 1;
allSong.addEventListener("click", function(dest){
     seltersong = dest.target.id
     play.innerHTML = `<i class="ri-pause-mini-fill"><i/>`;
     f = 0;
    mainfunction()
     audio.play()    
})


var isPlaying = false;
var pausedTime = 0;
progressBarContainer.addEventListener('click', function(event) {
    var boundingRect = progressBarContainer.getBoundingClientRect();
    var offsetX = event.clientX - boundingRect.left;
    var percentage = (offsetX / boundingRect.width) * 100;
    var duration = audio.duration;
    var newTime = (percentage / 100) * duration;
    audio.currentTime = newTime;


    // Add event listener for forward button click




    localStorage.setItem('pausedTime', newTime); // Store the current playback position
    
    if (isPlaying) {
        audio.play(); // Resume playback if it was playing before
    } else {
        audio.currentTime = newTime; // Set the playback position
    };

  });   
  audio.addEventListener('loadedmetadata', function() {
    var pausedTime = localStorage.getItem('pausedTime'); // Get stored playback position
    if (pausedTime !== null) {
        
        audio.currentTime = parseFloat(pausedTime); // Set the playback position if stored position exists
    }
});


var opcity = 1;
forword.addEventListener("click",function(){
    if(seltersong < arr.length -1){
        seltersong++;
        mainfunction();
        audio.currentTime = 0; // Restart the song from the beginning
        localStorage.setItem('pausedTime', 0); // Store the current playback position
        audio.play();
    }
});

backword.addEventListener("click",function(){
    if(seltersong > 0){
        seltersong--;
        mainfunction();
        audio.currentTime = 0; // Restart the song from the beginning
        localStorage.setItem('pausedTime', 0); // Store the current playback position
        opcity = 1;
        audio.play();
    }
});


audio.addEventListener('ended', function() {
    // Increment the current song index
    seltersong++;
    
    // Check if there's a next song available
    if (seltersong < arr.length) {
        // Play the next song
        mainfunction();
        audio.currentTime = 0; // Restart the song from the beginning
        localStorage.setItem('pausedTime', 0); // Store the current playback position
        audio.play();
    } else {
        // If no more songs available, stop playback
        audio.pause();
        // Optionally, you can reset the player to the first song
        seltersong = 0;
    }
});


// Add event listener to track audio playback state
// audio.addEventListener('play', function() {
//     isPlaying = true;
// });

// audio.addEventListener('pause', function() {
//     isPlaying = false;
// });

var progress;

audio.addEventListener('timeupdate', function() {
    progress = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = progress += '%';
    // var app = audio.currentTime;
   
  });

  

  
play.addEventListener("click",function(){
    if (f == 1) {
        
        play.innerHTML = `<i class="ri-pause-mini-fill"><i/>`;
        mainfunction()
      audio.play() 
    //   console.log(ontimeupdate);
    // progressBar.style.width = progress + 'app';
        f = 0;
    }else{
        play.innerHTML = `<i class="ri-play-mini-fill"><i/>`;
        mainfunction()
        audio.pause()
        f = 1;
    }
});




   


// Example usage:
// Call updateProgressBar with the progress percentage (0 to 100) as the song plays.
// For example: updateProgressBar(50); // This would set the progress bar to 50%.

mainfunction()