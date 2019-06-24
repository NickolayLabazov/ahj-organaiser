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
    this.text.innerHTML = this.mess.message;

    this.messageConteiner.classList.add('right')
      this.author.style.color = 'red';
      this.author.innerHTML = `${this.mess.time}`;

      if(this.mess.blobType = 'image'){
        console.log(this.mess.name)
        let image = document.createElement('img');
        image.setAttribute('src', `http://localhost:7071/${this.mess.name}`);
        this.messageConteiner.appendChild(image);
        
      }

      
    


  }
  
}
