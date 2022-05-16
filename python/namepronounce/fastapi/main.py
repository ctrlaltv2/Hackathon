import uvicorn
from fastapi import FastAPI
#from phonemizer import phonemize
import sys
#from g2p_en import G2p
#import subprocess
from dp.phonemizer import Phonemizer
from starlette.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Phoneme Api",
    description="An API  that uses phonemizer to use the phoneme of names",
    version="0.1",
)
#sys.path.append('/usr/bin/espeak-ng');

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/hello")
def hello_word():
    return "Hello Awesome World!!"

@app.get("/getPhoneme")
def getPhoneme(text: str):
   # texts = [text]
   # g2p = G2p()
    #for text in texts:
     #   out = g2p(text)
      #  print(out)
       # grapheme="-".join(out)
    # Do this:
    #val=''
    phonemizer=Phonemizer.from_checkpoint('en_us_cmudict_ipa_forward.pt')
    val=phonemizer(text,lang='en_us')
    print(val)
    #phonemized = phonemize(texts, language='en-us')
    #res=subprocess.check_output("/bin/echo "+text+"|phonemize",shell=True)
    #res=res.decode("utf-8")
    #val=''
    #for v in res.split('\n'):
    #    val+=v
    #    print(val)
    result={"name":text,"phoneme":[val]}
    return str(result)

#if __name__ == "__fastapi__":
#    uvicorn.run(app, host="127.0.0.1", port=8000, debug=True)
