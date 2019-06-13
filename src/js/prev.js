//const moment = require('moment');

//moment.locale('ru');


export default class Prev {
  constructor(parent, content, stop) {
    this.content = content;
    this.postDiv = null;
    this.parent = parent;
    this.time = null;
    this.stop = stop;
    this.message = null;
    this.valid = null;
    this.inputMes = null;
    this.ok = null;
    this.cancel = null;
    this.form = null;
    this.label = null;
    this.handInput = null;
    this.imageDel = null;
  }

  create() {
    if (this.stop) {
      this.postDiv = document.createElement('div');
      this.postDiv.setAttribute('class', 'postDiv');
      this.parent.insertBefore(this.postDiv, this.parent.childNodes[0]);
     // this.time = document.createElement('p');
     // this.time.innerHTML = moment().format('DD.MM.YYYY hh:mm');
    //  this.time.setAttribute('class', 'time');
     // this.postDiv.appendChild(this.time);
      this.postDiv.appendChild(this.content);

      this.imageDel = document.createElement('div');
      this.imageDel.innerHTML = 'Удалить';
      this.postDiv.appendChild(this.imageDel);
    this.imageDel.classList.add('delPrev');
    this.addListener();
    this.imageDel.style.cursor = 'pointer';
    }
  }


 addListener() {
    this.imageDel.addEventListener('click', () => this.del());
  }

  async del() {
   /*  const response = await fetch(`https://ahj74.herokuapp.com/?${this.url}`, {
      method: 'DELETE',
    }); */

   // if (response.ok) {
      this.postDiv.setAttribute('data-id', 'del');
      const del = document.querySelector('[data-id = del]');
      del.parentNode.removeChild(del);
   // }
  }

 


}