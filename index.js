const player = document.querySelector('.player'),
  playBtn = document.querySelector('.play'),
  backBtn = document.querySelector('.back'),
  nextBtn = document.querySelector('.next'),
  audio = document.querySelector('.audio'),
  progressContainer = document.querySelector('.progress-container'),
  progress = document.querySelector('.progress'),
  title = document.querySelector('.title'),
  cover = document.querySelector('.coverimg'),
  author  = document.querySelector('.author'),
  imgsrc = document.querySelector('.imgsrc'),
  imgback = document.querySelector('.imgback'),
  volumeshow = document.querySelector('#volume-show'),
  currentVolume = document.querySelector('#volume'),
  volumeIcon = document.querySelector('#volume-icon')


const songs = ['focus','Inkassator','Polozhenie','THE BEACH']

const authorchange = ['LSP', 'ROCKET', 'SKRIPTONIT','THE NEIGBOURHOOD']

const links = ['https://ds.cdn3.mzmdl.com/cuts/c3/70/c3703168a3f8c5cad239b4851fdf9daf/56234012/LSP_-_okus_b128f0d224.mp3',
'https://su.muzmo.cc/get/cuts/08/ae/08ae0c232bf572a46c4df5d8acd3ea41/65684618/ROCKET_-_Inkassator_b128f0d165.mp3',
'https://su.muzmo.cc/get/cuts/2f/c7/2fc7c9683bf974c18b760ad5ef45af8a/51836714/Skriptonit_-_Polozhenie_b128f0d282.mp3',
'https://su.muzmo.cc/get/music/20190318/The_Neigbourhood_-_THE_BEACH_62861699.mp3'];


let songIndex = 0;

function loadSong(song,authors,link){

  title.innerHTML = song
  author.innerHTML = authors
  audio.src = link
  imgback.src = `./picture/cover${songIndex + 1}.jpg`
  cover.src = `./picture/cover${songIndex + 1}.jpg`
}

loadSong(songs[songIndex], authorchange[songIndex], links[songIndex])

function playSong() {
  player.classList.add('play')
  audio.play()
  imgsrc.src = './picture/pause.png'
}

function pauseSong() {
  player.classList.remove('play')
  audio.pause()
  imgsrc.src = './picture/play.png'
}

playBtn.addEventListener('click', () => {
  const isPlaying = player.classList.contains('play')
  if(isPlaying){
    pauseSong()
  
  } else{
    playSong()
   
  }
})

//next song

function nextSong() {
  songIndex++

  if(songIndex > songs.length-1){
    songIndex = 0  
  }
  loadSong(songs[songIndex], authorchange[songIndex], links[songIndex])
  playSong()
}

nextBtn.addEventListener('click', nextSong)

//back song

function backSong() {
  songIndex--

  if(songIndex < 0){
    songIndex = songs.length-1 
  }
  loadSong(songs[songIndex], authorchange[songIndex], links[songIndex])
  playSong()
}

backBtn.addEventListener('click', backSong)

// Progress
function updateProgress(e) {
  
  const {duration,currentTime} = e.srcElement
  
  const progressPrecents = (currentTime / duration) * 100
  progress.style.width = `${progressPrecents}%`
}

audio.addEventListener('timeupdate', updateProgress)




//set pr

function setProgress(e) {
  const width = this.clientWidth
  const clickX = e.offsetX
  const duration = audio.duration

  audio.currentTime = (clickX / width) * duration
}

progressContainer.addEventListener('click', setProgress)

// autoplay

audio.addEventListener('ended', nextSong)

//volume



function muteSound(){
	audio.volume = 0;
	currentVolume.value = 0;
	volumeshow.innerHTML = 0;
 
}

function changeVolume(){
	volumeshow.value = currentVolume.value;
	audio.volume = currentVolume.value / 100;
}





volumeIcon.addEventListener('clicl', muteSound)
currentVolume.addEventListener('change', changeVolume)







