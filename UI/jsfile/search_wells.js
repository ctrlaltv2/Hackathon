var userName=document.getElementById('name');
var userCounty=document.getElementById('country');
var userGender=document.getElementById('gender');
var userLanguage=document.getElementById('language');
var submitButton=document.getElementById('submitbtn');
var outputdiv=document.getElementById('outputAudio');
var likescount, dislikecount,id;

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
    // $.ajax({
    //     url: "https://phonemeservice-dot-main-crow-349906.uc.r.appspot.com/getPhoneme",
    //     //https://phonemeservice-dot-main-crow-349906.uc.r.appspot.com/
    //     type: "get", //send it through get method,
    //     mode: 'cors',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Access-Control-Allow-Origin': '*',
    //       'Access-Control-Allow-Headers': '*'
    //   },
    //     data: { 
    //       text: uname
    //     },
    //     success: function(response) {
    //       var newData = JSON.stringify(eval("("+response+")"));
    //       var myArr= JSON.parse(newData);
    //     //  document.getElementById('audiotag').setAttribute("src","https://storage.googleapis.com/pronounce_name/sant2.wav");
    //       document.getElementById('phonemespan').textContent=myArr.phoneme[0];
    //       document.getElementById('outputAudio').hidden=false;
    //    //   document.getElementById('graphemespan').textContent="";//response.data.grapheme;
    //     },
    //     error: function(xhr) {
          
    //     }
    //   });
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
        name: userName.value,
        language: userLanguage.value,
        gender: userGender.value,
        country:userCounty.value

      },
        success: function(response) {
          const item=response.reduce((prev,current) => (+prev.likes > +current.likes) ? prev : current);
          id=item.id;
        //const max=Math.max.apply(null,response.map(item => item.likes));
        console.log(item);
         document.getElementById('searchaudiotag').setAttribute("src","https://namepronounce-dot-main-crow-349906.uc.r.appspot.com/api/download?filename="+item.filename);
         document.getElementById('phonemespan').textContent=item.phoneme;
        },
        error: function(xhr) {
        }
      });
}

function countthumbsup(){
  $.ajax({

    url: "https://namepronounce-dot-main-crow-349906.uc.r.appspot.com/api/likes",
    type: "get", //send it through get method,
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*'
    },
  data: { 
    id: id,
  },
    success: function(response) {
    },
    error: function(xhr) {
    }
  });
}

function countthumbsdown(){
  $.ajax({

    url: "https://namepronounce-dot-main-crow-349906.uc.r.appspot.com/api/dislikes",
    type: "get", //send it through get method,
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*'
    },
  data: { 
    id: id,
  },
    success: function(response) {
    },
    error: function(xhr) {
    }
  });
}


