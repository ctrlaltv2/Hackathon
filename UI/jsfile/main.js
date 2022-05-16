/*let xhr = new XMLHttpRequest();
xhr.open('get', 'https://namepronounce-dot-main-crow-349906.uc.r.appspot.com/api/getProfiles');
xhr.send();
const data="";*/

function loadprofile() {
    $.ajax({
        url: "https://namepronounce-dot-main-crow-349906.uc.r.appspot.com/api/getProfiles",
        //https://phonemeservice-dot-main-crow-349906.uc.r.appspot.com/
        type: "get", //send it through get method,
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*'
      },
        data: { 
        },
        success: function(response) {
            console.log(response);
            const tableBody = document.querySelector("#idTable");
            var i=0;
            const tableData = response.map(function(value){
                var audiofilename="https://namepronounce-dot-main-crow-349906.uc.r.appspot.com/api/download?filename="+value.filename;
                    return (
                        `<tr>
                            <td class="nametd" id=${value.id}><image class="profileicon" src="../images/profileicon.png"></image><a id="name" href="#">${value.name}</a></td>
                            <td class="audiotd"><audio class="audioicon" controls="" src=${audiofilename}></audio></td>
                            <td class="phonemstd">${value.phoneme}</td>
                        </tr>`
                    );
                }).join('');
            const tabelBody = document.querySelector("#tableBody");
            tabelBody.innerHTML = tableData;

            var table = document.querySelector('#idTable');
            var i=0;
            for(i=0;i<table.rows.length;i++){
                table.rows[i].addEventListener('click', function() {
                     var id = this.cells[0].id;
                   editpopup(id);
                   //alert(msg);
                    
                  });
            }
        },
        error: function(xhr) {
          
        }
      });
}
   /* const data =xhr.response;
    console.log(data);

//const data = [{Name:'Santosh', Wavfile: 'Monday', Phonems: 'sa an to sh'},{Name:'Nagendraprasad', Wavfile: '../wavfile/nagendra.wav', Phonems: 'Naa ge nd ra pra sa ad'},{Name:'Swaroop', Wavfile: 'Monday',Phonems: 'sa wa ru ap'},]; // any json data or array of objects
const tableData = data.map(function(value){
    return (
        `<tr>
            <td class="nametd"><image class="profileicon" src="../images/profileicon.png"></image><a href="../views/update.html" target="popup" onclick="editpopup()">${value.Name}</a></td>
            <td class="audiotd"><audio class="audioicon" controls="" src=${value.Wavfile}></audio></td>
            <td class="phonemstd">${value.Phonems}</td>
        </tr>`
    );
}).join('');
const tabelBody = document.querySelector("#tableBody");
tableBody.innerHTML = tableData;
}*/
function editpopup(id){
   // window.open('../views/update.html','popup','width=500,height=400'); 
    //alert(id);
    document.getElementById('idlabel').innerHTML = id;
    var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById(id);

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
  getUserDetail(id);
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  document.getElementById("updaterecord").setAttribute("hidden","hidden");
  document.getElementById("upload-button").removeAttribute("hidden");
  modal.style.display = "none";

  document.getElementById("recordingsList").innerHTML = "";

}
   // return false;
}
