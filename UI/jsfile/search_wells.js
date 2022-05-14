var userName=document.getElementById('name');
var userCounty=document.getElementById('country');
var userGender=document.getElementById('gender');
var userLanguage=document.getElementById('language');
var submitButton=document.getElementById('submitbtn');
var outputdiv=document.getElementById('outputAudio');


function enableFunction(){
    if ( userName.value!=null && userName.value!=""){
        submitButton.disabled = false;
    }
    else{
        submitButton.disabled = true;
    }
}

function searchPronunciation(){
    document.getElementById('outputAudio').hidden=false;
    var uname=userName.value;
    $.ajax({
        url: "https://main-crow-349906.uc.r.appspot.com/getPhoneme",
        type: "get", //send it through get method,
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*'
      },
        data: { 
          text: uname
        },
        success: function(response) {
          document.getElementById('audiotag').setAttribute("src","https://storage.googleapis.com/pronounce_name/sant2.wav");
          document.getElementById('phonemespan').textContent=response.data.phoneme;
          document.getElementById('graphemespan').textContent=response.data.grapheme;
        },
        error: function(xhr) {
          
        }
      });
}


