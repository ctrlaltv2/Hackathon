var userName=document.getElementById('name');
var userCounty=document.getElementById('country');
var userGender=document.getElementById('gender');
var userLanguage=document.getElementById('language');
var submitButton=document.getElementById('submitbtn');
var outputdiv=document.getElementById('outputAudio');
var likescount, dislikecount,id;

function enableFunction(){
    if ( userName.value!=null && userName.value!=""){
      document.getElementById('searchempty').hidden=true;
        submitButton.disabled = false;
    }
    else{
        submitButton.disabled = true;
    }
}

function enablerecordFunction(){
  if ( userName.value!=null && userName.value!=""){
      submitButton.disabled = false;
  }
  else{
      submitButton.disabled = true;
  }
}
function searchPronunciation(){
    var uname=userName.value;
    document.getElementById('submitbtn').innerHTML="Searching..";
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
          if (response.length === 0) {
            document.getElementById('searchempty').hidden=false;
            document.getElementById('outputAudio').hidden=true;
            document.getElementById('submitbtn').innerHTML="Search";
        }
        else{
          document.getElementById('outputAudio').hidden=false;
          document.getElementById('searchempty').hidden=true;
          const item=response.reduce((prev,current) => (+prev.likes > +current.likes) ? prev : current);
          id=item.id;
        //const max=Math.max.apply(null,response.map(item => item.likes));
        console.log(item);
         document.getElementById('searchaudiotag').setAttribute("src","https://namepronounce-dot-main-crow-349906.uc.r.appspot.com/api/download?filename="+item.filename);
         document.getElementById('phonemespan').textContent=item.phoneme;
         document.getElementById('namespan').textContent=item.name;
         document.getElementById('submitbtn').innerHTML="Search";
        }
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
      thumbsresponse.removeAttribute("hidden");
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
      thumbsresponse.removeAttribute("hidden");
    },
    error: function(xhr) {
    }
  });
}

function enablefeeback (){
  document.getElementById('feedbacksection').hidden=false;
}

 function submitfeedback(){
  document.getElementById('feedbacksubmit').innerHTML="Submitting..";
  
  $.ajax({
    url: 'https://namepronounce-dot-main-crow-349906.uc.r.appspot.com/api/addcomments',
    dataType: 'text',
    type: 'post',
    contentType: 'application/json',
    data: JSON.stringify( { "email":   document.getElementById('feebackemail').value,
    "name": document.getElementById('feebackname').value,
    "commentsDesc":  document.getElementById('feedbacktext').value,
    "id": id,} ),
     processData: false,
    success: function(response){  
      console.log(response);
      successfeedback.removeAttribute("hidden");
      document.getElementById('feedbacksubmit').innerHTML="Submit";
  
    },
    error: function(){
    }
 });
}
