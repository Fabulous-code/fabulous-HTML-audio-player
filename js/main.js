
//Dr Fab


var audio;
var volume = 0.5;
var range = 10;
var progressBar_width = 400;

jQuery(document).ready(function($) {
//Hide Pause Initially
$('#pause_button').hide();
	
//Initializer - Play First Song 
initAudio($('#player_playlist tr:nth-child(2)'));


function initAudio(element){
	var songURL = element.attr('songURL');
    var title = element.attr('songTitle');
    var cover = element.attr('cover');
    var artist = element.attr('artist'); 
	

	//Create a New Audio Object
	audio = new Audio(songURL);
	
	//init volume
	$('#volume').value = range*volume;
	audio.volume = volume;
	
	
	if(!audio.currentTime){
		$('#track_duration').html('0.00');
	}

	$('#track_title').text(title);
    $('#track_artist').text(artist);
	
	//Insert Cover Image
	$('#artist_pic img').attr('src','../../uploads/artists/'+cover);    
	//$('img.cover').attr('src','images/covers/' + cover);
	
	$('.track').removeClass('active');
    element.addClass('active');
	
	
}

//Playlist Song Click
$('.track').click(function () {
    audio.pause();
    initAudio($(this));
	$('#play_button').hide();
	$('#pause_button').show();
	$('#track_duration').fadeIn(400);
	audio.play();
	showDuration();
});

//Play Button
$('#play_button').click(function(){
	audio.play();
	$('#play_button').hide();
	$('#pause_button').show();
	$('#track_duration').fadeIn(400);
	showDuration();
});

//Pause Button
$('#pause_button').click(function(){
	audio.pause();
	$('#pause_button').hide();
	$('#play_button').show();
});
	
//Stop Button
$('#stop_button').click(function(){
	audio.pause();		
	audio.currentTime = 0;
	$('#pause_button').hide();
	$('#play_button').show();
	$('#track_duration').fadeOut(400);
});

//Next Button
$('#next_button').click(next_song);

function next_song(){
    audio.pause();
    var next = $('#player_playlist .track.active').next();
	
    if (next.length == 0) {
        next = $('#player_playlist tr:nth-child(2)');
    }
    initAudio(next);
	audio.play();
	$('#track_duration').fadeIn(400);
	
	$('#play_button').hide();
	$('#pause_button').show();
	showDuration();
}

//Prev Button
$('#prev_button').click(function(){
    audio.pause();
    var prev = $('#player_playlist .track.active').prev();
	
    if (!prev.hasClass('track')) {
        prev = $('#player_playlist .track:last-child');
    }
    initAudio(prev);
	audio.play();
	$('#track_duration').fadeIn(400);
	
	$('#play_button').hide();
	$('#pause_button').show();
	showDuration();
});

//Time Duration
function showDuration(){
	$(audio).bind('timeupdate', function(){
		//Get hours and minutes
		var s = parseInt(audio.currentTime % 60);
		var m = parseInt((audio.currentTime / 60) % 60);
		//Add 0 if seconds less than 10
		if (s < 10) {
			s = '0' + s;
		}
		$('#track_duration').html(m + '.' + s);	
		var value = 0;
		if (audio.currentTime > 0) {
			value = Math.floor((100 / audio.duration) * audio.currentTime);
		}
		$('#progressBar').css('width',value+'%');
		
		//continuous playing
		if(value >='100')
			next_song();
		
	});
}

//update progresbar
function update_musicPositon(position){
	value = position/progressBar_width;
	//console.log('%'+value);
	audio.currentTime = parseFloat(audio.duration*value);
	//console.log(audio.duration*value);
}

$('#track_progressBar').click(function( e ) {
    var x = e.pageX - this.offsetLeft;
    //var y = e.pageY - this.offsetTop;
	update_musicPositon(x);
	
	//console.log(x);
});

//Volume Control
$('#volume').change(function(){
	//console.log(this.value);
	volume = parseFloat(this.value / range);
	
	audio.volume = volume;

});


});




















