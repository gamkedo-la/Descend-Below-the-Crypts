var audioFormat;
var isMuted = false;
var soundSetforMeetings = true; //make false to hear at normal level

//sounds
var basementMusic = new BackgroundMusicClass();
var cryptMusic = new BackgroundMusicClass();

var musicSound = null;

//Quest Based
var enteringSecondLevelNarrative = new SoundOverlapsClass("enteringSecondLevel");

//Warrior's Voice
var choosingWarrior = new SoundOverlapsClass("choosingWarrior");
var warriorEnteringSecondLevel = new SoundOverlapsClass("warriorsThoughtsSecondLevel");
var warriorOuch = new SoundOverlapsClass("warriorOuch");

//Wizard's Voice
var choosingWizard = new SoundOverlapsClass("choosingWizard");

//Sound Effects
var warningSFX = new SoundOverlapsClass("warningSFX");
var doorClosing1 = new SoundOverlapsClass("DoorClosing");
var doorClosing2 = new SoundOverlapsClass("DoorClosingGirl");
var doorClosing3 = new SoundOverlapsClass("DoorClosingWing&Girl");

//Skeleton King
var skeletonKing1 = new SoundOverlapsClass("skeletalKing1");
var skeletonKing2 = new SoundOverlapsClass("skeletalKing2");
var skeletonKing3 = new SoundOverlapsClass("skeletalKing3");



function setFormat() {
    var audio = new Audio();
    if (audio.canPlayType("audio/mp3")) {
		audioFormat = ".mp3";
    } else {
		audioFormat = ".ogg";
    }
}

function SoundOverlapsClass(filenameWithPath) {
    setFormat();
    var altSoundTurn = false;
    var mainSound = new Audio("sound/" + filenameWithPath + audioFormat);
    var altSound = new Audio("sound/" + filenameWithPath + audioFormat);
    
    this.play = function() {
    	if (isMuted) {
    		console.log ("sound muted");
    		return;
    	}
		if (altSoundTurn) {
			altSound.currentTime = 0;
			if(soundSetforMeetings){
				altSound.volume = 0.05;  //quieter for screen sharing during meetings
			}
			altSound.play();
		} else {
			mainSound.currentTime = 0;
			if(soundSetforMeetings){
				mainSound.volume = 0.05; //quieter for screen sharing during meetings
			}
			mainSound.play();
		}
		altSoundTurn = !altSoundTurn;
    }
}  

function BackgroundMusicClass() {
    this.loopSong = function(filenameWithPath) {
		setFormat();

		if (musicSound != null) {
			musicSound.pause();
			musicSound = null;
		}
		musicSound = new Audio("sound/music/" + filenameWithPath + audioFormat);
		if(soundSetforMeetings){
			musicSound.volume = 0.04; //quieter for screen sharing during meetings
		}
		musicSound.loop = true;
		musicSound.play();
    }

    this.startOrStopMusic = function() {
        if (!musicSound) {
            console.error("ERROR: musicSound not initialized before startOrStopMusic was run!");
            return; 
        }
		if (isMuted == false) {
			musicSound.play();
		} else {
			musicSound.pause();
		}
    }
}
