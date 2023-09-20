class App {
	songList = ["song1.mp3", "song2.mp3", "song3.mp3"];

	constructor(playerElement, containerMusicElement, sourceElement, volumeSliderElement, musicProgressElement, musicActionsElement) {
		this.playerElement = playerElement;
		this.containerMusicElement = containerMusicElement;
		this.sourceElement = sourceElement;
		this.volumeSliderElement = volumeSliderElement;
		this.musicProgressElement = musicProgressElement;
		this.musicActionsElement = musicActionsElement;
	}

	init() {
		const list = this.createSongList();
		this.containerMusicElement.append(...list);
		const links = this.containerMusicElement.querySelectorAll(".player__track");
		for(let link of links){
			link.addEventListener("click", this.setSong.bind(this));
		}
		this.volumeSliderElement.addEventListener("input", (event) => {
			this.playerElement.volume = event.target.value;
		});
		this.playerElement.addEventListener("timeupdate", () => {
			this.updateProgress();
		});
		this.musicActionsElement.querySelector("#play").addEventListener("click", () => {
			this.startMusic();
		});
		this.musicActionsElement.querySelector("#pause").addEventListener("click", () => {
			this.pauseMusic();
		});
		this.onlyLoadSong(this.songList[0]);
	}

	createSongList() {
		const result = [];
		for (let song of this.songList) {
			let playerTrack = document.createElement("div");
			playerTrack.classList.add("player__track");
			playerTrack.textContent = song;
			result.push(playerTrack);
		}
		return result;
	}

	setSong(event) {
		this.sourceElement.src = `music/${event.target.textContent}`;
		document.querySelector(".player__current-track-name").textContent = `Сейчас играет: ${event.target.textContent}`;
		this.playerElement.load();
		this.playerElement.play();
	}

	updateProgress() {
		if (this.playerElement.currentTime > 0) {
			this.musicProgressElement.value = (this.playerElement.currentTime / this.playerElement.duration) * 100;
		}
	}

	startMusic() {
		if (this.playerElement.readyState) {
			this.playerElement.play();
		}
	}

	pauseMusic() {
		this.playerElement.pause();
	}

	onlyLoadSong(song) {
		this.sourceElement.src = `music/${song}`;
		document.querySelector(".player__current-track-name").textContent = `Сейчас играет: ${song}`;
		this.playerElement.load();
		this.playerElement.play();
	}
}
