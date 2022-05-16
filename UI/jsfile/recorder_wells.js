
//webkitURL is deprecated but nevertheless
//URL = window.URL || window.webkitURL;

var gumStream; 						//stream from getUserMedia()
var rec; 							//Recorder.js object
var input; 							//MediaStreamAudioSourceNode we'll be recording

var username, usercountry,usergender,userlanguage,id;


// shim for AudioContext when it's not avb. 
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext //audio context to help us record

var recordButton = document.getElementById("recordButton");
var stopButton = document.getElementById("stopButton");
var link=document.getElementById("uploadlink");
var submitbtn = document.getElementById('submitbtn');
var updaterecord = document.getElementById('updaterecord');

//add event listner to buttons
recordButton.addEventListener("click",startRecording);
stopButton.addEventListener("click",stopRecording)

//myStyle.addEventListener("onload",function(){
  function getUserDetail(id){
   //id = document.getElementById('idlabel').innerHTML;
  $.ajax({
    url: "https://namepronounce-dot-main-crow-349906.uc.r.appspot.com/api/fetch",
    type: "get", //send it through get method,
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*'
    },
  data: { 
   id :id
  
  },
    success: function(response) {
      username = response[0].name;
      usergender = response[0].gender;
      userlanguage = response[0].language;
      usercountry = response[0].country;
    },
    error: function(xhr) {
      
    }
  });
};

function startRecording() {
  if(updaterecord != null) {
    updaterecord.removeAttribute("hidden");
    document.getElementById("upload-button").setAttribute("hidden","hidden");
  }
console.log("recordButton clicking");

var constraints = { audio: true, video: false }

// if(document.getElementById('upload-button')!=null){
//   document.getElementById('upload-button').visibility = "hidden"
// }
  recordButton.disabled = true;
  recordButton.className = 'disable';
  stopButton.disabled = false;
  stopButton.className = 'embedbutton';

  
  //recordButton.disabled = true;
  //stopButton.disabled = false;

  navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
    console.log("getUserMedia() success, stream created, initializing Recorder.js ...");

    /*
      create an audio context after getUserMedia is called
      sampleRate might change after getUserMedia is called, like it does on macOS when recording through AirPods
      the sampleRate defaults to the one set in your OS for your playback device
    */
    audioContext = new AudioContext();

    //update the format 
    //document.getElementById("formats").innerHTML = "Format: 1 channel pcm @ " + audioContext.sampleRate / 1000 + "kHz"

    /*  assign to gumStream for later use  */
    gumStream = stream;

    /* use the stream */
    input = audioContext.createMediaStreamSource(stream);

    /* 
      Create the Recorder object and configure to record mono sound (1 channel)
      Recording 2 channels  will double the file size
    */
    rec = new Recorder(input, { numChannels: 1 })

    //start the recording process
    rec.record()

    console.log("Recording started");

  }).catch(function (err) {
    //enable the record button if getUserMedia() fails
      //recordButton.disabled = false;
    	//stopButton.disabled = true;
    //	pauseButton.disabled = true
  });
}
function stopRecording() {
  stopButton.disabled = true;
  stopButton.className = 'disable';
  recordButton.disabled = false;

  //disable the stop button, enable the record too allow for new recordings
  //stopButton.disabled = true;
  //recordButton.disabled = false;

  //reset button just in case the recording is stopped while paused
  //pauseButton.innerHTML="Pause";

  //tell the recorder to stop the recording
  rec.stop();

  //stop microphone access
  gumStream.getAudioTracks()[0].stop();

  //create the wav blob and pass it on to createDownloadLink
  rec.exportWAV(createDownloadLink);
}

function createDownloadLink(blob) {

  var url = URL.createObjectURL(blob);
  var au = document.createElement('audio');
  var li = document.createElement('li');
  var link = document.createElement('a');

  //name of .wav file to use during upload and download (without extendion)
  var filename = new Date().toISOString()+".wav";
  

  //add controls to the <audio> element
  au.controls = true;
  au.src = url;

  //save to disk link
  link.href = url;
  link.download = filename + ".wav"; //download forces the browser to donwload the file using the  filename
  link.innerHTML = "Save to disk";

  //add the new audio element to li
  li.appendChild(au);

  //add the filename to the li
  //li.appendChild(document.createTextNode(filename + ".wav "))

  //add the save to disk link to li
  //li.appendChild(link);

  //upload link
  //var breaktag = document.createElement('br');
  var upload = document.createElement('a');
  upload.href = "#";
  upload.innerHTML = "Upload";
  var fname=document.getElementById('name');
  var uCountry=document.getElementById('country');
  var uLanguage=document.getElementById('language');
  var uGender=document.getElementById('gender');
  var successmsg=document.getElementById('successmsg');

  //var va=fname.ariaValueMax;
if(submitbtn != undefined || submitbtn != null) {
   submitbtn.addEventListener("click", function (event) {
     event.stopImmediatePropagation();
    var pronounce={ 
      "name": fname.value,
       "gender": uGender.value,
       "language": uLanguage.value,
       "country": uCountry.value,
       "phoneme": "tɛst",
       "grafeme": null};
    var xhr = new XMLHttpRequest();
    xhr.onload = function (e) {
      console.log(e)
      if (this.readyState === 4) {
        console.log("Server returned: ", e.target.responseText);
        successmsg.removeAttribute("hidden");
       
      }
    };
    var fd = new FormData();
    fd.append("file", blob, filename);
    console.log(filename);
    fd.append("pronounce",JSON.stringify(pronounce));
    xhr.open("POST", "https://namepronounce-dot-main-crow-349906.uc.r.appspot.com/api/upload", true);
    xhr.send(fd);
  })

  li.appendChild(document.createTextNode(" "))//add a space in between
  //li.appendChild(upload)//add the upload link to li

  //add the li element to the ol
  recordingsList.appendChild(li);
}

if(updaterecord != undefined || updaterecord != null) {
  id = document.getElementById('idlabel').innerHTML;
  updaterecord.addEventListener("click", function (event) {
   // getUserDetail();
   event.stopImmediatePropagation();
    var pronounce={ 
      "name": username,
      "gender": usergender,
      "language": userlanguage,
      "country": usercountry,
       "id": id
      };
    var xhr = new XMLHttpRequest();
    xhr.onload = function (e) {
      console.log(e)
      if (this.readyState === 4) {
        console.log("Server returned: ", e.target.responseText);
        successmsg.removeAttribute("hidden");
      }
    };
    var fd = new FormData();
    fd.append("file", blob, filename);
    fd.append("pronounce",JSON.stringify(pronounce));
    xhr.open("POST", "https://namepronounce-dot-main-crow-349906.uc.r.appspot.com/api/upload", true);
    xhr.send(fd);
  })
  li.appendChild(document.createTextNode(" "))//add a space in between
  //li.appendChild(upload)//add the upload link to li

  //add the li element to the ol
  recordingsList.appendChild(li);
}
}
async function uploadFile() {
 // getUserDetail();
  var pronounce={ 
    "name": "test",
    "gender": "Male",
    "language": "Telugu",
    "country": "USA",
     "id": 36
    };

    var xhr = new XMLHttpRequest();
    xhr.onload = function (e) {
      console.log(e)
      if (this.readyState === 4) {
        console.log("Server returned: ", e.target.responseText);
        successmsg.removeAttribute("hidden");
      }
    };
    var fd = new FormData();
    fd.append("file",fileupload.files[0]);
    fd.append("pronounce",JSON.stringify(pronounce));
    xhr.open("POST", "https://namepronounce-dot-main-crow-349906.uc.r.appspot.com/api/upload", true);
    xhr.send(fd);
  }



