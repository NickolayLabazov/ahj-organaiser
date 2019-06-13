//import Gallery from './galleryclass.js';

export default class Image {
  constructor(parent, blob, url) {
    this.parent = parent;
    this.blob = blob;
    this.url = url;
    this.imageCont = 0;
    this.imageName = 0;
    this.imageDel = 0;
    this.row = null;
  }

  create() {
    this.row = document.createElement('tr');
    const img = document.createElement('img');
    img.setAttribute('src', this.url);
    this.imageCont = document.createElement('td');
    this.imageCont.appendChild(img);
    
    this.imageName = document.createElement('td');
    this.imageName.innerHTML = this.blob.name;
    this.imageName.classList.add('name');
   // this.imageCont.appendChild(this.imageName);
    this.imageCont.classList.add('imageCont');
    this.imageDel = document.createElement('td');
    this.imageDel.innerHTML = 'Удалить';
   // this.imageCont.appendChild(this.imageDel);
    this.imageDel.classList.add('del');
    this.row.classList.add('row');

    this.row.appendChild(this.imageCont);
    this.row.appendChild(this.imageName);
    this.row.appendChild(this.imageDel);
    this.parent.appendChild(this.row);
    
   
    this.addListener();
    this.imageDel.style.cursor = 'pointer';
  }

  addListener() {
    this.imageDel.addEventListener('click', () => this.del());
  }

  del() {
    this.row.setAttribute('data-id', 'del');
    const del = document.querySelector('[data-id = del]');
    del.parentNode.removeChild(del);
    URL.revokeObjectURL(this.file);
    this.blob = null;
    
  }
}
