import InputBox from './inputBox.js';
import Message from './message.js';
import Image from './imageclass.js';

export default class Organiser {
  constructor(parent) {
    this.parent = parent;    
    this.divOrganiser = null;
    this.search = null;
    this.searchInput = null;
    this.divMessage = null;
    this.inputBox = null;
    this.ws = null;
    
  }  

  create() {  
    console.log('Начать работу');
   
    this.wsCreate();           
    this.divOrganiser = document.createElement('div');
    this.divMessage = document.createElement('div'); 
    this.search = document.createElement('div');   
    
    this.divMessage.setAttribute('class', 'divMessage');
    this.divOrganiser.setAttribute('class', 'divOrganiser');
    this.search.setAttribute('class', 'search');
   
    this.parent.appendChild(this.divOrganiser);
    this.divOrganiser.appendChild(this.divMessage);
    this.inputBox = new InputBox(this.divOrganiser, this.ws);
    this.inputBox.create(); 
    this.divOrganiser.appendChild(this.search);
    
    this.search.innerHTML = '&#128269';

  //  this.inputEventListener();

  //  this.ws.send(JSON.stringify({type: 'messageAll'}));  

  }

/*   inputEventListener(){
    this.input.addEventListener('keydown', (event) => {      
      if(event.keyCode === 13){
        event.preventDefault();
        if(this.input.value != ''){
          this.ws.send(JSON.stringify({type: 'message', name: this.name, message: this.input.value}));
          this.input.value = '';
        }
      }

    })
  } */

  wsCreate(){
    this.ws = new WebSocket('ws://localhost:7070/ws');
    this.ws.binaryType = 'blob'; // arraybuffer
    this.ws.addEventListener('open', () => {
      console.log('connected');     
    //  this.ws.send(JSON.stringify({'type': 'input', 'name': this.name}));
      //this.ws.send(JSON.stringify({name: this.name}));
    // this.ws.send('hello');

    });
    this.ws.addEventListener('message', (evt) => {
      console.log(evt.data)

      
   //   let message = JSON.parse(evt.data);
     
   /*   if(message.type === 'input'){
       if(message.name){
         this.chat()
       } else{
         this.mess()
       }
     } else if(message.type === 'message'){
      let mess = new Message(this.divMessage, message);
      mess.create();
      //this.divMes.innerHTML = message.message;
     }else if(message.type === 'messageAll'){
      let messages = message.message;
      for(let mess of messages){
        let messOld = new Message(this.divMes, this.name, mess);
      messOld.create();
      }
      
      //this.divMes.innerHTML = message.message;
     }else if(message.type === 'online?'){
      this.ws.send(JSON.stringify({'type': 'online', 'name': this.name}));
     }else if(message.type === 'online'){
      this.divName.innerHTML = '';
      for(let name of message.message){
        let nameOnline = document.createElement('p'); 
        nameOnline.innerHTML = name;
        nameOnline.style.marginLeft = '10px';
        if(name === this.name){
          nameOnline.innerHTML = 'You';
          nameOnline.style.color = 'red';
        }
        this.divName.appendChild(nameOnline);
      }
     }
 */
     this.divMes
     //let message = evt.data; 
      
   //   console.log(message);
    });
    this.ws.addEventListener('close', (evt) => {
      console.log('connection closed', evt);
      
    });
    this.ws.addEventListener('error', () => {
      console.log('error');
    });    
  }
}