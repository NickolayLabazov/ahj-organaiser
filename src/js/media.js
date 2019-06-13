export default class Media {
  constructor(video, parent, blob) {
    this.video = video;
    this.cont = null;
    this.contDiv = null;
    this.play = null;
    this.parent = parent;
    this.playBack = null;
    this.point = null;
    this.blob = blob;
  }

  create() {
    this.contDiv = document.createElement('div');
    this.contDiv.setAttribute('class', 'contDiv');
    this.play = document.createElement('div');
    this.play.innerHTML = '&#9658';
    this.contDiv.appendChild(this.play);
    if (this.video) {
      this.cont = document.createElement('video');
      this.cont.width = 300;
      this.cont.height = 200;
      this.cont.setAttribute('class', 'contVideo');
      this.contDiv.appendChild(this.cont);
      this.play.setAttribute('class', 'playVideo');
    } else {
      this.cont = document.createElement('audio');
      this.contDiv.appendChild(this.cont);
      this.play.setAttribute('class', 'playAudio');
    }
    this.cont.controls = false;
    this.playBack = document.createElement('div');
    this.playBack.setAttribute('class', 'playBack');
    this.contDiv.appendChild(this.playBack);
    this.point = document.createElement('div');
    this.point.setAttribute('class', 'point');
    this.playBack.appendChild(this.point);
    this.cont.src = URL.createObjectURL(this.blob);
    this.addListener();
    return this.contDiv;
  }

  addListener() {
    this.play.addEventListener('click', () => {
      this.cont.play();
      if (this.video) {
        this.play.style.opacity = 0;
      }
    });

    this.cont.addEventListener('timeupdate', () => {
      const time = `${Math.round(this.cont.currentTime * 300 / this.cont.duration - 2)}px`;
      this.point.style.left = time;
    });
    this.cont.addEventListener('ended', () => {
      this.play.style.opacity = 1;
    });
  }
}