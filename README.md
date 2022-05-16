# Hackathon

#### Python API IMPLEMENTATION
- It uses Python fastapi implementation to generate phonemes.
- Run pip install -r requirements.txt from fastapi folder.

#### JAVA API IMPLEMENTATION
- JAVA Version: 1.8
- Database: GCP MYSQL
- Server: GCP APP ENGINE
- Framework: SPRING BOOT REST API
- Storage : GCP Storage

API Details:

Name: /api/upload
Desc: to uplad audio/wav files to gclod storage along with user profile data
Request: curl -X POST \
  https://namepronounce-dot-main-crow-349906.uc.r.appspot.com/api/upload \
  -H 'cache-control: no-cache' \
  -H 'content-type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' \
  -H 'postman-token: 14a7b3bf-64ff-6f44-b859-630862f01f20' \
  -F file=@1652428005115.wav \
  -F 'pronounce={"name":"test","gender":"Male","country":"USA","language":"Telugu","id":"16"}'
  
Response :  {"name":"john","gender":"female","language":"Hindi","country":"usa","id":86,"phoneme":"dʒɑːn","grafeme":null,"filename":"1652691386520_john.wav","empid":null,"likes":0,"dislikes":0},{"name":"Swarup Reddy","gender":"male","language":"Telugu","country":"india","id":85,"phoneme":"swɛrəp rɛdi","grafeme":null,"filename":"1652691313373_SwarupReddy.wav","empid":"8122195","likes":0,"dislikes":0},{"name":"Naresh","gender":"male","language":"Tamil","country":"india","id":84,"phoneme":"nærɪʃ","grafeme":null,"filename":"1652691283210_Naresh.wav","empid":"5728848","likes":0,"dislikes":0}



Name: /api/download
Desc: download audio/wav file fromgoogle storage
Request: curl -X GET --header 'Accept: application/json' 'https://namepronounce-dot-main-crow-349906.uc.r.appspot.com/api/download?filename=1652691183440_test.wav'
Response: audio/wav file in byte stream


Name: /api/getProfiles
Desc: to fetch profiles data
Request: curl -X GET --header 'Accept: application/json' 'https://namepronounce-dot-main-crow-349906.uc.r.appspot.com/api/getProfiles'

Response :  [{"name":"john","gender":"female","language":"Hindi","country":"usa","id":86,"phoneme":"dʒɑːn","grafeme":null,"filename":"1652691386520_john.wav","empid":null,"likes":0,"dislikes":0},{"name":"Swarup Reddy","gender":"male","language":"Telugu","country":"india","id":85,"phoneme":"swɛrəp rɛdi","grafeme":null,"filename":"1652691313373_SwarupReddy.wav","empid":"8122195","likes":0,"dislikes":0},{"name":"Naresh","gender":"male","language":"Tamil","country":"india","id":84,"phoneme":"nærɪʃ","grafeme":null,"filename":"1652691283210_Naresh.wav","empid":"5728848","likes":0,"dislikes":0}]



Name: /api/fetch?id=16
Desc: to fetch profile details on record id
Request: curl -X GET --header 'Accept: application/json' 'https://namepronounce-dot-main-crow-349906.uc.r.appspot.com/api/fetch?id=16'
Response: [{"name":"nagendra","gender":"Male","language":"Telugu","country":"India","id":25,"phoneme":"nægɛndrə","grafeme":null,"filename":"1652604818147_nagendra.wav","empid":null,"likes":0,"dislikes":0}]


Name: /api/fetch?name=Test
Desc: to fetch profile details on name
Request: curl -X GET --header 'Accept: application/json' 'https://namepronounce-dot-main-crow-349906.uc.r.appspot.com/api/fetch?name=test'
Response: [{"name":"Test","gender":"Male","language":"Telugu","country":"India","id":25,"phoneme":"nægɛndrə","grafeme":null,"filename":"1652604818147_nagendra.wav","empid":null,"likes":0,"dislikes":0}]

Name: /api/fetch?name=Test&language=Telugu
Desc: to fetch profile details on name and language
Request: curl -X GET --header 'Accept: application/json' 'https://namepronounce-dot-main-crow-349906.uc.r.appspot.com/api/fetch?name=test'
Response: [{"name":"Test","gender":"Male","language":"Telugu","country":"India","id":25,"phoneme":"nægɛndrə","grafeme":null,"filename":"1652604818147_nagendra.wav","empid":null,"likes":0,"dislikes":0}]

Name: /api/addcomments
Desc: add comments for name pronounce
Request: curl -X POST \
  http://localhost:8080/api/addcomments \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: dd30d7e0-3f74-2ca6-83e6-4ffc575ccfa2' \
  -d '{
	"email":"swarup@gmail.com",
	"name":"Swaroop",
	"commentsDesc":"test comments for  pronounce",
	"id":16
}'
Response: comments added,200 status ok


Name: /api/fetch?empid=1234567
Desc: to fetch profile details on empid
Request: curl -X GET --header 'Accept: application/json' 'https://namepronounce-dot-main-crow-349906.uc.r.appspot.com/api/fetch?empid=test'
Response: [{"name":"Test","gender":"Male","language":"Telugu","country":"India","id":25,"phoneme":"nægɛndrə","grafeme":null,"filename":"1652604818147_nagendra.wav","empid":1234567,"likes":0,"dislikes":0}]


Name: /api/fetch?empid=1234567
Desc: to fetch profile details on empid
Request: curl -X GET --header 'Accept: application/json' 'https://namepronounce-dot-main-crow-349906.uc.r.appspot.com/api/fetch?empid=test'
Response: [{"name":"Test","gender":"Male","language":"Telugu","country":"India","id":25,"phoneme":"nægɛndrə","grafeme":null,"filename":"1652604818147_nagendra.wav","empid":1234567,"likes":0,"dislikes":0}]


Name: /api/fetch?filename=1652604818147_nagendra.wav
Desc: to fetch profile details on filename
Request: curl -X GET --header 'Accept: application/json' 'https://namepronounce-dot-main-crow-349906.uc.r.appspot.com/api/fetch?empid=test'
Response: [{"name":"Test","gender":"Male","language":"Telugu","country":"India","id":25,"phoneme":"nægɛndrə","grafeme":null,"filename":"1652604818147_nagendra.wav","empid":1234567,"likes":0,"dislikes":0}]


Name: /api/updateProfile
Desc: to update the existing profile details
Request: curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{ \ 
   "country": "IN", \ 
   "dislikes": 0, \ 
   "empid": "696966", \ 
   "filename": "TEST.wav", \ 
   "gender": "male", \ 
   "grafeme": "test", \ 
   "id": 20, \ 
   "language": "Tamil", \ 
   "likes": 0, \ 
   "name": "selva", \ 
   "phoneme": "sel va" \ 
 }' 'https://namepronounce-dot-main-crow-349906.uc.r.appspot.com/api/updateProfiles'
Response: [{"name":"Test","gender":"Male","language":"Telugu","country":"India","id":25,"phoneme":"nægɛndrə","grafeme":null,"filename":"1652604818147_nagendra.wav","empid":1234567,"likes":0,"dislikes":0}]



Name: /api/likes
Desc: to update the likes count of the profile
Request: curl -X GET --header 'Accept: application/json' 'https://namepronounce-dot-main-crow-349906.uc.r.appspot.com/api/likes?id=1'
response: Response :  {"name":"john","gender":"female","language":"Hindi","country":"usa","id":86,"phoneme":"dʒɑːn","grafeme":null,"filename":"1652691386520_john.wav","empid":null,"likes":1,"dislikes":0},{"name":"Swarup Reddy","gender":"male","language":"Telugu","country":"india","id":85,"phoneme":"swɛrəp rɛdi","grafeme":null,"filename":"1652691313373_SwarupReddy.wav","empid":"8122195","likes":0,"dislikes":0},{"name":"Naresh","gender":"male","language":"Tamil","country":"india","id":84,"phoneme":"nærɪʃ","grafeme":null,"filename":"1652691283210_Naresh.wav","empid":"5728848","likes":0,"dislikes":0}


Name: /api/dislikes
Desc: to update the dislikes count of the profile
Request: curl -X GET --header 'Accept: application/json' 'https://namepronounce-dot-main-crow-349906.uc.r.appspot.com/api/dislikes?id=1'
response: Response :  {"name":"john","gender":"female","language":"Hindi","country":"usa","id":86,"phoneme":"dʒɑːn","grafeme":null,"filename":"1652691386520_john.wav","empid":null,"likes":1,"dislikes":0},{"name":"Swarup Reddy","gender":"male","language":"Telugu","country":"india","id":85,"phoneme":"swɛrəp rɛdi","grafeme":null,"filename":"1652691313373_SwarupReddy.wav","empid":"8122195","likes":0,"dislikes":0},{"name":"Naresh","gender":"male","language":"Tamil","country":"india","id":84,"phoneme":"nærɪʃ","grafeme":null,"filename":"1652691283210_Naresh.wav","empid":"5728848","likes":0,"dislikes":1}


#### DATABASE Details:

DATABASE USED: GCP MYSQL


