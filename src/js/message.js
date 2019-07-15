export default class Message {
  constructor(parent,  mess) {
    this.parent = parent;
    
    this.mess = mess;
    this.messageConteiner = null;
    this.author = null;
    this.text = null;
  }

  create() {

    console.log('!')
    this.messageConteiner = document.createElement('div');
    this.author = document.createElement('div');
    this.text = document.createElement('div');

    this.messageConteiner.setAttribute('class', 'messageConteiner');
    this.author.setAttribute('class', '.author');
    this.text.setAttribute('class', 'text');

    this.parent.appendChild(this.messageConteiner);
    this.messageConteiner.appendChild(this.author);
    this.messageConteiner.appendChild(this.text);

   // this.author.innerHTML = `${this.mess.name}, ${this.mess.time}`;
    this.text.innerHTML = this.mess.text;

    this.messageConteiner.classList.add('right');
    this.messageConteiner.classList.add('right');
      this.author.style.color = 'red';
      this.author.innerHTML = `${this.mess.time}`;


      for(let link of this.mess.load){
      //  console.log(link.blobType.slice(0, link.blobType.indexOf('/')));
        let type = link.blobType.slice(0, link.blobType.indexOf('/'));
        if(type === 'image'){
          console.log(link.blobName)
          let image = document.createElement('img');
          image.setAttribute('src', `http://localhost:7071/${link.name}`);
          this.messageConteiner.appendChild(image);
        } else {
          let doc = document.createElement('div');
          let img = document.createElement('div');
          let name = document.createElement('p');
          let download = document.createElement('div');

          this.messageConteiner.appendChild(doc);
          doc.appendChild(img);
          doc.appendChild(name);
          doc.appendChild(download);

          img.innerHTML = '&#128459';
          name.innerHTML = link.blobName;
          download.innerHTML = `<a href = "http://localhost:7071/${link.name}" download = "${link.blobName}">Скачать<a>`;
          console.log(link.blobName)
          //download.innerHTML = 'Скачать';

         // download.setAttribute('href', `http://localhost:7071/${link.name}`);
         // download.setAttribute('download');


        }
        
      }

    /*   if(this.mess.blobType = 'image'){
        console.log(this.mess.name)
        let image = document.createElement('img');
        image.setAttribute('src', `http://localhost:7071/${this.mess.load[0].name}`);
        this.messageConteiner.appendChild(image);
        
      }
 */
      
    


  }
  
}
