var IsPlaying = false;
var SongLength = 109;
var AudioVolume = 15;
let timePassed = 0;
let timerInterval = null;
var initialValue = 0;
let SongName = [];
let SongCover = [];
let SongAudio = [];
let SongAutor = [];
let PlayedSongs = [];
let CoverUrl
let songCopy = document.getElementById("SongToCopy");
URLl = "http://localhost:5218/SongRandom"
$.ajax({
    type: "GET",
    url: URLl,
    success: function (status) {
        document.getElementById("PlayingSong").src = "http://localhost:5218/Tracks/"+status[0].name+"."+status[0].autor+".mp3";
        document.getElementById("currentsongautor").textContent = status[0].name;
        document.getElementById("currentsongname").textContent = status[0].autor;
        document.getElementById("currentsongcover").src = "http://localhost:5218/Tracks/"+status[0].name+"."+status[0].autor+".jpg";
        document.getElementById("currentsongcoverMini").src = "http://localhost:5218/Tracks/"+status[0].name+"."+status[0].autor+".jpg";
    }
    });
startTimer();
Powitanie();
PickSongs();
function ChangeSong(number) {
    let PSPB = document.getElementsByClassName("PlayMusicButton");
    for(var i = 0; i < PSPB.length; i++)
    {
        PSPB[i].classList.add("AnimationClick");
    }
    setTimeout(function() {
        for(var i = 0; i < PSPB.length; i++)
        {
            PSPB[i].classList.remove("AnimationClick");
        }
    }, 100)
    timePassed = 0;
    var SongPlay = document.getElementById("Song."+number).alt
    console.log(SongPlay)
    const songan = SongPlay.split(".")
    document.getElementById("PlayingSong").src = "http://localhost:5218/Tracks/"+songan[0]+"."+songan[1]+".mp3";
    document.getElementById("currentsongautor").textContent = songan[1];
    document.getElementById("currentsongname").textContent = songan[0];
    let cap = document.getElementsByClassName("autorinazwa")
    cap[0].textContent = songan[0] +"  |  "+ songan[1];
    cap[1].textContent = songan[0] +"  |  "+ songan[1];
    document.getElementById('PlayButtonMini').src = "images/Play.png";
    document.getElementById("currentsongcoverMini").src = document.getElementById("Song."+number).src
    document.getElementById("currentsongcover").src = document.getElementById("Song."+number).src
    IsPlaying = true;
    document.getElementById("PlayingSong").play();
    document.getElementById('PlayButton').src = "images/Play.png";
    PlayedSongs = [];
    PlayedSongs.push(songan[0]);
}
function ChangeMiddle(num) {
    if (num  == 0){
        document.getElementById("MiddleSearch").style = "display: none; background-color: rgb(46, 46, 46); border-radius: 10px;";
        document.getElementById("MiddleHome").style = "display: block; background-color: rgb(46, 46, 46); border-radius: 10px;";
        document.getElementById("MiddleAutor").style = "display: none; background-color: rgb(46, 46, 46); border-radius: 10px;";
    }
    if (num  == 1){
        document.getElementById("MiddleSearch").style = "display: block; background-color: rgb(46, 46, 46); border-radius: 10px;";
        document.getElementById("MiddleHome").style = "display: none; background-color: rgb(46, 46, 46); border-radius: 10px;";
        document.getElementById("MiddleAutor").style = "display: none; background-color: rgb(46, 46, 46); border-radius: 10px;";
    }
    if (num  == 2){
        document.getElementById("MiddleSearch").style = "display: none; background-color: rgb(46, 46, 46); border-radius: 10px;";
        document.getElementById("MiddleHome").style = "display: none; background-color: rgb(46, 46, 46); border-radius: 10px;";
        document.getElementById("MiddleAutor").style = "display: block; background-color: rgb(46, 46, 46); border-radius: 10px;";
    }
}
function PickNextSong() {
    ButtonClick("BackButton")
    let NextSongAutor = document.getElementById("currentsongautor").textContent;
    let NextSongName = document.getElementById("currentsongname").textContent;
    URLl = "http://localhost:5218/SongAutor?Autor="+NextSongAutor
    let SongToChange  = null
    $.ajax({
        type: "GET",
        url: URLl,
        success: function (status) {
            status.forEach(element => {
                if (!PlayedSongs.includes(element.name))
                {
                    SongToChange = element
                }
            });
            if (SongToChange == null)
            {
                URLl = "http://localhost:5218/SongRandom"
                $.ajax({
                    type: "GET",
                    url: URLl,
                    success: function (status) {
                        SongToChange = status[3]
                        ChangePlayingSong(SongToChange)
                        PlayedSongs = []
                    }
                });
            }
            else
            {
                ChangePlayingSong(SongToChange)
            }
        }
    });
}
function BackMusic() {
    ButtonClick("SkipButton")
    console.log(PlayedSongs)
    if (PlayedSongs.length >= 1)
    {
        URLl = "http://localhost:5218/SongName?Name="+PlayedSongs[PlayedSongs.length - 2];
        $.ajax({
            type: "GET",
            url: URLl,
            success: function (status) {
                PlayedSongs.pop()
                PlayedSongs.pop()
                ChangePlayingSong(status)
                
            }
        });
    }
}
function ChangePlayingSong(element)
{
    timePassed = 0;
    document.getElementById("PlayingSong").src = "http://localhost:5218/Tracks/"+element.name+"."+element.autor+".mp3";
    document.getElementById("currentsongname").textContent = element.name;
    document.getElementById("currentsongcover").src = "http://localhost:5218/Tracks/"+element.name+"."+element.autor+".jpg";
    document.getElementById("currentsongautor").textContent = element.autor;
    document.getElementById('PlayButton').src = "images/Play.png";
    let cap = document.getElementsByClassName("autorinazwa")
    cap[0].textContent = element.name +"  |  "+ element.autor;
    cap[1].textContent = element.name +"  |  "+ element.autor;
    document.getElementById('PlayButtonMini').src = "images/Play.png";
    document.getElementById("currentsongcoverMini").src = "http://localhost:5218/Tracks/"+element.name+"."+element.autor+".jpg";
    document.getElementById("PlayingSong").play();
    PlayedSongs.push(element.name);
}

function PickSongs() {
    const URLl = `http://localhost:5218/SongRandom`
    $.ajax({
        type: "GET",
        url: URLl,
        success: function (status) {
            for (i=0; i <status.length; i++)
            {
                let songClone = songCopy.cloneNode(true)
                songClone.firstElementChild.firstElementChild.setAttribute("id", "Song."+status[i].id);
                songClone.firstElementChild.firstElementChild.setAttribute("src", "http://localhost:5218/Tracks/"+status[i].name+"."+status[i].autor+".jpg");
                songClone.firstElementChild.firstElementChild.setAttribute("alt", status[i].name+"."+status[i].autor);
                songClone.firstElementChild.lastElementChild.setAttribute("onclick", "ChangeSong("+(status[i].id)+")");
                songClone.lastElementChild.firstElementChild.setAttribute("id", "SongName."+(i));
                songClone.lastElementChild.firstElementChild.innerText = status[i].name;
                songClone.lastElementChild.lastElementChild.setAttribute("id", "SongAutor."+(i));
                songClone.lastElementChild.lastElementChild.innerText = status[i].autor;
                document.querySelector("#PasteMiddleSongHere").appendChild(songClone)
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            console.error("Error: " + errorThrown);
        }
    });
}

function startTimer() {
    timerInterval = setInterval(() => {
    if (IsPlaying == true && timePassed <= (SongLength - 1))
    {
    SongLength = Math.round(document.getElementById("PlayingSong").duration);
    timePassed = Math.round(document.getElementById("PlayingSong").currentTime);
    document.getElementById('ElapsedTimee').textContent = formatTime(timePassed);
    document.getElementById("TimeOfSongPlaying").textContent = formatTime(SongLength);
    document.getElementById("SongSlider").value = ((timePassed / SongLength) * 100);
    document.getElementById("SongLengthMini").style = "width: "+((timePassed / SongLength) * 95)+"%"
    document.getElementById("PlayingSong").volume = (document.getElementById("VolumeSlider").value  / 100)
    initialValue = ((timePassed / SongLength) * 100);
    }
    if (timePassed > (SongLength - 1))
    {
        PickNextSong();
    }
    }, 500);
    
}
document.getElementById("SearchBar").addEventListener('input', function (event) {
    var child = document.querySelector("#PasteSearchSong").lastElementChild; 
    while (child) {
        document.querySelector("#PasteSearchSong").removeChild(child);
        child = document.querySelector("#PasteSearchSong").lastElementChild;
    }
    SearchArtist.style = "display: none;"
    if (document.getElementById("SearchBar").value != "")
    {
        const URLl = `http://localhost:5218/SongSearch?Input=`+document.getElementById("SearchBar").value
        $.ajax({
            type: "GET",
            url: URLl,
            success: function (status) {
                if (status[0] != null)
                {
                    SearchArtist.style = "display: block;"
                    SearchArtistName.innerText = status[0].autor
                    status.shift()
                    status.shift()
                }
                else
                {
                    status.shift()
                }
                if (status.length > 0) {
                    status.forEach(element => {
                        console.log(element)
                        Song = element
                        let songClone = songCopy.cloneNode(true)
                        songClone.firstElementChild.firstElementChild.setAttribute("id", "Song."+(Song.id));
                        songClone.firstElementChild.firstElementChild.setAttribute("src", "http://localhost:5218/Tracks/"+Song.name+"."+Song.autor+".jpg");
                        songClone.firstElementChild.firstElementChild.setAttribute("alt", Song.name+"."+Song.autor);
                        songClone.firstElementChild.lastElementChild.setAttribute("onclick", "ChangeSong("+(Song.id)+")");
                        songClone.lastElementChild.firstElementChild.setAttribute("id", "SongName."+(Song.id));
                        songClone.lastElementChild.firstElementChild.innerText = Song.name;
                        songClone.lastElementChild.lastElementChild.setAttribute("id", "SongAutor."+(Song.id));
                        songClone.lastElementChild.lastElementChild.innerText = Song.autor;
                        document.querySelector("#PasteSearchSong").appendChild(songClone)
                    });
                }
            }
        });
    }
}, false);
function Powitanie() {
    let date = new Date();
    let hour = date.getHours();
    if (hour >= 6 && hour < 18)
    {
        document.getElementById("Powitanie").innerText = "Dobry Dzień"
    }
    else
    {
        document.getElementById("Powitanie").innerText = "Dobry Wieczór"
    }
}
document.getElementById("VolumeSlider").addEventListener('input', function (event) {
    if(parseInt(this.value) !=initialValue){
        document.getElementById("PlayingSong").volume = (document.getElementById("VolumeSlider").value  / 100)
        VolumeIconChange(this.value)
    }
}, false);

function VolumeIconChange(Wartosc)
{
    console.log(Wartosc)
    if (Wartosc <= 1) 
    {
        document.getElementById("VolumeIcon").src = "images/Mute.png";
    }
    if (Wartosc <= 33 && Wartosc > 1)
    {
        document.getElementById("VolumeIcon").src = "images/0-Sound.png";
    }
    if (Wartosc <= 66 && Wartosc > 33)
    {
        document.getElementById("VolumeIcon").src = "images/40-Sound.png";
    }
    if (Wartosc <= 100 && Wartosc > 66)
    {
        document.getElementById("VolumeIcon").src = "images/70-Sound.png";
    }
}


document.getElementById("SongSlider").addEventListener('input', function (event) {
    if(parseInt(this.value) !=initialValue){
        let song = document.getElementById("PlayingSong")
        song.currentTime = (document.getElementById("SongSlider").value / 100) * Math.round(document.getElementById("PlayingSong").duration)
    }
}, false);

function PlayMusic(ElementID) {
    ButtonClick("PlayButton")
    ButtonClick("PlayButtonMini")
    if (document.getElementById("PlayButton").getAttribute('src') == "images/Pause.png") {
        document.getElementById("PlayButton").src = "images/Play.png";
        IsPlaying = true;
        document.getElementById("PlayingSong").play();
        document.getElementById("PlayButtonMini").src = "images/Play.png";
        IsPlaying = true;
        document.getElementById("PlayingSong").play();
    }
    else if (document.getElementById("PlayButton").getAttribute('src') == "images/Play.png") {
        document.getElementById("PlayButton").src = "images/Pause.png";
        IsPlaying = false;
        document.getElementById("PlayingSong").pause();
        document.getElementById("PlayButtonMini").src = "images/Pause.png";
        IsPlaying = false;
        document.getElementById("PlayingSong").pause();
    }
}

function PickAutor(Autor) {
    document.getElementById("PasteArtistSong").innerHTML = ''
    document.getElementById("ArtistsImages").src = "Artists-Images/"+Autor+".png";
    document.getElementById("ArtistsName").innerText = Autor;
    let songPosition = []
    let songClone = songCopy.cloneNode(true)
    URLl = "http://localhost:5218/SongAutor?Autor="+Autor
    $.ajax({
        type: "GET",
        url: URLl,
        success: function (status) {
            status.forEach(element => {
                Song = element
                let songClone = songCopy.cloneNode(true)
                songClone.firstElementChild.firstElementChild.setAttribute("id", "Song."+(Song.id));
                songClone.firstElementChild.firstElementChild.setAttribute("src", "http://localhost:5218/Tracks/"+Song.name+"."+Song.autor+".jpg");
                songClone.firstElementChild.firstElementChild.setAttribute("alt", Song.name+"."+Song.autor);
                songClone.firstElementChild.lastElementChild.setAttribute("onclick", "ChangeSong("+(Song.id)+")");
                songClone.lastElementChild.firstElementChild.setAttribute("id", "SongName."+(Song.id));
                songClone.lastElementChild.firstElementChild.innerText = Song.name;
                songClone.lastElementChild.lastElementChild.setAttribute("id", "SongAutor."+(Song.id));
                songClone.lastElementChild.lastElementChild.innerText = Song.autor;
                document.querySelector("#PasteArtistSong").appendChild(songClone)
            });
        }
    });
    ChangeMiddle(2)
}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    if (seconds < 10) {
        seconds = `0${seconds}`;
    }
    return `${minutes}:${seconds}`;
}

function ButtonClick(ElementID)
{
    let PB = document.getElementById(ElementID);
    PB.classList.add("AnimationClick");
    setTimeout(function() {
        PB.classList.remove("AnimationClick");
    }, 100)
}
let Ikonka = document.getElementById("currentsongcover");
let Suwak = document.getElementById("SongSlider")
let VolumeE = document.getElementById("VolumeEmpty")
let bottomPart = document.getElementById("bottomPart")
let leftPart = document.getElementById("leftPart")
let rightPart = document.getElementById("rightPart")
let middlePart1 = document.getElementById("MiddleSearch")
let middlePart2 = document.getElementById("MiddleHome")
let middlePart3 = document.getElementById("MiddleAutor")
let ver = document.getElementById("veryficate")
let autorName = document.getElementById("artistName")
let MiniBottom = document.getElementById("MinibottomPart")
let AddedToMiddle = document.getElementById("AddedToMiddle")
window.addEventListener("resize", ZmianaRozmiaru);
function ZmianaRozmiaru()
{
    if (document.documentElement.clientWidth > 1450)
    {
        Ikonka.style = "width: 100%; height: 100%;"
    }
    if (document.documentElement.clientWidth <= 1450 && document.documentElement.clientWidth > 992)
    {
        Ikonka.style = "width: 152px; height: 152px;"
        Ikonka.parentElement.style ="padding-top: 12px; padding-bottom: 12px;"
        VolumeE.classList = "col-4"
    }
    if (document.documentElement.clientWidth <= 992 && document.documentElement.clientWidth > 700)
    {
        Ikonka.style = "width: 52px; height: 0px;"
        Ikonka.parentElement.style ="padding-top: 12px; padding-bottom: 12px; width: 0;"
        VolumeE.classList = "col-auto"
        bottomPart.style = "height: 19vh; width: 100vw; border-radius: 10px; background-color: rgb(19, 19, 19);"
        leftPart.style = "background-color: rgb(46, 46, 46); border-radius: 10px;"
        rightPart.style = "background-color: rgb(46, 46, 46); border-radius: 10px; margin: 0; margin-right: 12px;"
        middlePart1.classList = "col-7"
        middlePart2.classList = "col-7 overflow-y-scroll MiddleAutorScroll h-100"
        middlePart3.classList = "col-7 overflow-y-scroll h-100"
        leftPart.parentElement.style = "gap: 1px; padding-left: 12px; width: 100vw;"
        leftPart.parentElement.parentElement.style = "height: 80vh; width: 100vw; padding-top: 12px;"
        autorName.style = "font-size: 6vw; color: white; -webkit-text-stroke: 3px black;"
        ver.style = "font-size: 3vw; -webkit-text-stroke: 1px black;"
        MiniBottom.style = "height: 168px; width: 100vw; border-radius: 10px; display: none;"
        AddedToMiddle.style = "display: none; height: 168px; width: 100%; background-color: rgb(46, 46, 46);"
    }
    if (document.documentElement.clientWidth <= 700)
    {
        bottomPart.style = "display: none"
        leftPart.style = "display: none"
        rightPart.style = "display: none"
        middlePart1.classList = "col-12"
        middlePart2.classList = "col-12 overflow-y-scroll MiddleAutorScroll h-100"
        middlePart3.classList = "col-12 overflow-y-scroll h-100"
        leftPart.parentElement.style = "gap: 1px; padding-left: 0px; width: 100vw; margin-left: 0"
        leftPart.parentElement.parentElement.style = "height: 100vh; width: 100vw; padding: 0"
        autorName.style = "font-size: 6vw; color: white; -webkit-text-stroke: 1px black;"
        ver.style = "font-size: 3vw;"
        MiniBottom.style = "height: 168px; width: 100vw; border-radius: 10px; display: block;"
        AddedToMiddle.style = "display: block; height: 168px; width: 100%; background-color: rgb(46, 46, 46);"
    }
}
const container = document.getElementById("MoveThisPart");
let MTP = document.getElementById("MoveThisPart")
let startpos
let startposy
let VolumeChange = false
let xPosition  = 0 
MTP.addEventListener("dragstart",  getClickPosition, false);
MTP.addEventListener("drag",  getMousePosition, false);
MTP.addEventListener("dragend",  Reset, false);
function getClickPosition(e){
    startpos = e.clientX;
    startposy = e.clientY;
}
function getMousePosition(e){
    xPosition = e.clientX;
    yPosition = e.clientY;
    MTP.style = "background-color: black; width: 100vw; border-radius: 12px; margin-left: "+(xPosition - startpos)+"px;";
    if (yPosition - startposy >= 25 || yPosition - startposy <= -100)
    {
        VolumeChange = true
    }
    if (VolumeChange == true && yPosition != 0)
    {
        document.getElementById("VolumeSlider").value = yPosition / document.documentElement.clientHeight * 100;
        document.getElementById("PlayingSong").volume = yPosition / document.documentElement.clientHeight
    }
}
function Reset(e){
    VolumeIconChange(document.getElementById("VolumeSlider").value)
    MTP.style = "background-color: black; width: 100vw; border-radius: 12px; margin-left: 0;"
    if (e.clientX - startpos >= 100)
    {
        PickNextSong()
    }
    if (e.clientX - startpos <= -100)
    {
        BackMusic()
    }
    xPosition = 0
    yPosition = 0
    startpos = 0
    VolumeChange = false
}