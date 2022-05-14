const data = [{Name:'Santosh', Wavfile: 'Monday', Phonems: 'sa an to sh'},{Name:'Nagendraprasad', Wavfile: '../wavfile/nagendra.wav', Phonems: 'Naa ge nd ra pra sa ad'},{Name:'Swaroop', Wavfile: 'Monday',Phonems: 'sa wa ru ap'},]; // any json data or array of objects
const tableData = data.map(function(value){
    return (
        `<tr>
            <td class="nametd"><a href="../views/update.html" target="popup" onclick="editpopup()">${value.Name}</a></td>
            <td class="audiotd"><audio class="audioicon" controls="" src=${value.Wavfile}></audio></td>
            <td class="phonemstd">${value.Phonems}</td>
        </tr>`
    );
}).join('');
const tabelBody = document.querySelector("#tableBody");
tableBody.innerHTML = tableData;

function editpopup(){
    window.open('../views/update.html','popup','width=500,height=400'); return false;
}