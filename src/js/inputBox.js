import Media from './media.js';
import Prev from './prev.js';
import Image from './imageclass.js';
import Message from './message.js';

export default class InputBox {
 // class InputBox {
  constructor(parent, ws) {
    this.size = 1000;
    this.parent = parent;
    this.ws = ws;
    this.posts = [];
    this.box = null;
    this.form = null;
    this.input = null;
    this.recorder = null;
    this.recorderStart = null;
    this.audioRec = null;
    this.videoRec = null;
    this.microphone = null;
    this.camera = null;
    this.video = false;
    this.blob = null;
    this.blobs = [];
    this.loadCounter = 0;


    this.stopCanc = null;
    this.cancel = null;
    this.stop = null;
    this.stream = null;
    this.chunks = [];
    this.timerDiv = null;
    this.timeout = null;
    this.stop = true;
    this.duplication = null;
    this.load = null;
    this.enter = null;
    this.jps = null;
    this.previev = null;
    this.fileForm = null;
    this.link = null;   
    this.previevTable = null;
  //  this.newBlob = null;
    this.chunk = null;
    this.remain = null;
  }

  create() {
    this.box = document.createElement('div');
    this.form = document.createElement('form');
    this.input = document.createElement('input');
    this.recorderStart = document.createElement('div');
    this.microphone = document.createElement('div');
    this.camera = document.createElement('div');
    this.jps = document.createElement('div');
    this.stopCanc = document.createElement('div');
    this.stop = document.createElement('div');
    this.cancel = document.createElement('div');
    this.timerDiv = document.createElement('div');
    this.load =  document.createElement('div');
    this.enter = document.createElement('div');
    this.previev = document.createElement('div');
    this.fileForm = document.createElement('form');
    this.link = document.createElement('input');
    this.previevTable = document.createElement('table');;

    this.input.setAttribute('class', 'inputOrg');
    this.form.setAttribute('class', 'formOrg');
    this.recorderStart.setAttribute('class', 'recorder');
    this.stopCanc.setAttribute('class', 'recorder');
    this.load.setAttribute('class', 'load');
    this.enter.setAttribute('class', 'enter');
    this.jps.setAttribute('class', 'jps');
    this.previev.setAttribute('class', 'previev');
    this.link.setAttribute('class', 'link');
    this.link.setAttribute('type', 'file');
    this.link.setAttribute('name', 'file');
    this.link.setAttribute('accept', 'image/*');
    this.fileForm.setAttribute('class', 'fileForm');
    this.box.setAttribute('class', 'box')

    this.parent.appendChild(this.box);
    this.box.appendChild(this.fileForm);  
    this.fileForm.appendChild(this.link);  
    this.box.appendChild(this.form);
    this.box.appendChild(this.previev);        
    this.form.appendChild(this.load); 
    this.form.appendChild(this.enter); 
    this.form.appendChild(this.input);   
    this.form.appendChild(this.recorderStart);
    this.recorderStart.appendChild(this.microphone);
    this.recorderStart.appendChild(this.camera);
    this.recorderStart.appendChild(this.jps);
    this.stopCanc.appendChild(this.stop);
    this.stopCanc.appendChild(this.timerDiv);
    this.stopCanc.appendChild(this.cancel);
    this.previev.appendChild(this.previevTable);
    
    this.microphone.innerHTML = '&#127908';
    this.camera.innerHTML = '&#127909';
    this.jps.innerHTML = '&#10148';
    this.stop.innerHTML = '&#10003';
    this.cancel.innerHTML = '&#10008';
    this.load.innerHTML = '&#128206';
    this.enter.innerHTML = 'Отправить';
    
    this.camera.style.cursor = 'pointer';
    this.microphone.style.cursor = 'pointer';  
    this.cancel.style.cursor = 'pointer';
    this.stop.style.cursor = 'pointer'; 
    this.load.style.cursor = 'pointer';
    this.enter.style.cursor = 'pointer'; 
    this.jps.style.cursor = 'pointer';   
    
    this.addListener();
    this.dispatchListener();
    //this.inputEventListener()
  }

/*      inputEventListener(){
    this.input.addEventListener('keydown', (event) => {      
      if(event.keyCode === 13){
        event.preventDefault();
        if(this.input.value != ''){
          this.ws.send(JSON.stringify({type: 'message', name: this.name, message: this.input.value}));
          this.input.value = '';
        }
      }

    })
  }  */

  dispatchListener() {
    this.load.addEventListener('click', (event) => {
      event.preventDefault();
      /* try {
        this.removeMesage(this.dropDiv);
      } catch (e) {} */
      const clickEvent = new MouseEvent('click');
	    this.link.dispatchEvent(clickEvent);
    });
  }

  addListener() {
    this.camera.addEventListener('click', (e) => {
      e.stopPropagation();
      this.video = true;
      this.record();
      this.form.removeChild(this.recorderStart);
      this.form.appendChild(this.stopCanc);
      this.timer();
    }, true);

    this.microphone.addEventListener('click', (e) => {
      e.stopPropagation();
      this.video = false;
      this.record();
      this.form.removeChild(this.recorderStart);
      this.form.appendChild(this.stopCanc);
      this.timer();
    }, true);

    this.stop.addEventListener('click', (e) => {
      e.stopPropagation();
      this.stop = true;
      this.recorder.stop();
      this.form.removeChild(this.stopCanc);
      this.form.appendChild(this.recorderStart);
      clearInterval(this.timeout);
    }, true);

    this.cancel.addEventListener('click', (e) => {
      e.stopPropagation();
      this.stop = false;
      this.recorder.stop();


      this.stream.getTracks().forEach(track => track.stop());
      this.form.removeChild(this.stopCanc);
      this.form.appendChild(this.recorderStart);
      clearInterval(this.timeout);
    }, true);

    this.input.addEventListener('keydown', (event) => {
      if (event.keyCode === 13) {
        event.preventDefault();      
            this.ws.send(JSON.stringify({type: 'messageStart', text: this.input.value}));
            this.input.value = '';       
      }
    })

    this.input.addEventListener('drop', async (event) => {
      event.preventDefault();
      const files = Array.from(event.dataTransfer.files);
      this.blob = files[0]; 
      console.log(this.blob);    
     // let previev = new Image(this.previevTable, this.blob.name, URL.createObjectURL(this.blob)); //Дописать URL
     let previev = new Image(this.previevTable, this.blob, URL.createObjectURL(this.blob));
     previev.create();
      this.blobs.push(this.blob);     
    })

    this.link.addEventListener('change', async (evt) => {
      evt.preventDefault();      
      const files = Array.from(evt.currentTarget.files);     
      this.blob = files[0];
      console.log(this.blob);
     // this.formData = new FormData(evt.currentTarget);     
      let previev = new Image(this.previevTable, this.blob, URL.createObjectURL(this.blob)); //Дописать URL
      previev.create();
      this.blobs.push(this.blob);  
    })

    this.enter.addEventListener('click', (evt) => {
      evt.preventDefault();
    //  this.ws.send(this.blob);
    this.ws.send(JSON.stringify({type: 'loadStart', blobType: this.blobs[this.loadCounter].type}));    
    })

    this.ws.addEventListener('message', (evt) => {
     // console.log(evt.data);
      let msg = JSON.parse(evt.data);
      console.log(msg);

      if(msg.type === 'messageStart'){
        if(msg.status === 'ok'){
          if(this.blobs.length > 0){
            console.log(this.blobs)
            this.ws.send(JSON.stringify({type: 'loadStart', blobType: this.blobs[this.loadCounter].type, blobName: this.blobs[this.loadCounter].name})); 
          } else{
            this.ws.send(JSON.stringify({type: 'messageEnd'}));
          }
          
        }
       // let mess = new Message(this.divMessage, msg);
      //  mess.create();
        
       } else if(msg.type === 'messageEnd'){
        console.log(msg.content);
        let newMessage = new Message(document.body.querySelector('.divMessage') , msg.content);
        newMessage.create();
        this.blobs = [];
        this.loadCounter = 0;
         }   else if(msg.type === 'loadEnd'){
      //  let mess = new Message(this.divMessage, msg);
      //  mess.create();
      this.loadCounter += 1;
      if(this.loadCounter < this.blobs.length ){
        this.ws.send(JSON.stringify({type: 'loadStart', blobType: this.blobs[this.loadCounter].type}));
      } else{
        this.ws.send(JSON.stringify({type: 'messageEnd'}));
      }

       }  

     else if(msg.type === 'loadStart'){
        if(msg.status === 'ok'){
         // this.ws.send(this.blob);
          this.remain = this.blobs[this.loadCounter];
          this.loadBlob();          
        }
      } else if(msg.type === 'load'){
        if(msg.status === 'ok'){
          if(this.remain === null){
            this.ws.send(JSON.stringify({type: 'loadEnd'}));
          } else{
            this.loadBlob();
          }
        }
      }
    }) 
  }

  loadBlob(){
   // console.log(this.blob)
  // this.ws.send(this.remain);
      if(this.remain.size <= this.size){
      this.chunk = this.remain      
      this.remain = null;
    } else {
      this.chunk = this.remain.slice(0, this.size);
      this.remain = this.remain.slice(this.size);
    }
    this.ws.send(this.chunk);
  }

  timer() {
    let min = 0;
    let sec = 0;
    this.timerDiv.innerHTML = `0${min}.0${sec}`;
    this.timeout = setInterval(() => {
      sec += 1;
      if (sec === 60) {
        sec = 0;
        min += 1;
      }
      let s = 0;
      let m = 0;
      if (sec < 10) {
        s = 0;
      } else {
        s = '';
      }
      if (min < 10) {
        m = 0;
      } else {
        m = '';
      }
      this.timerDiv.innerHTML = `${m}${min}.${s}${sec}`;
    }, 1000);
  }

  async record() {
    if (!navigator.mediaDevices) {
      return;
    }
    try {
      console.log('1');
      this.stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: this.video,
        
      });
      
      if (this.video) {
        console.log('2');
        this.duplication = document.createElement('video');
        this.duplication.setAttribute('class', 'duplication');
        document.body.appendChild(this.duplication);
        this.duplication.srcObject = this.stream;
        this.duplication.muted = true;
        this.duplication.play();
      }


      this.recorder = new MediaRecorder(this.stream);
      this.chunks = [];
      this.recorder.addEventListener('start', () => {
        console.log('recording started');
      });
      this.recorder.addEventListener('dataavailable', (evt) => {
        console.log('data available');
        this.chunks.push(evt.data);
      });
      this.recorder.addEventListener('stop', () => {
        this.stream.getTracks().forEach(track => track.stop());
        this.blob = new Blob(this.chunks);
        const media = new Media(this.video, document.body, this.blob);
        const prev = new Prev(this.previev, media.create(), this.stop);
        this.blobs.push(this.blob);
        prev.create();

        if(this.video){
          document.body.removeChild(this.duplication);
        }

        this.duplication = null;
      });
      this.recorder.start();
    } catch (e) {
      console.error(e);
    }
  }
}

/* let inputBox = new InputBox(document.body);
inputBox.create();// */