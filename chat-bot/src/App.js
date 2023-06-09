import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react'
import Special from './Special';
var i = 0
var departure_city;
var arrival_city;
var time;
var legs;
function App() {
  const [msg, setMsg] = useState("Bot: Hi I am Assignment 4")
  const [usermsg, setUsermsg] = useState("");
  const [loading, isLoading] = useState(false);
  const [promp, isPromp] = useState("");
  useEffect(()=>{
    if(loading){
      isPromp("bot is typing...")
      setTimeout(()=>{
      if(i==0){
        if(usermsg=='push special')
          {setMsg(`${msg}\nBot: Okay, I will push a special\nBot: What will be that departure city?`); i=i+1;}
        else {setMsg(`${msg}\nBot: You are mentally ill\nBot: You need a flight to hospital`); i=0;}
      }
      else if(i==1){setMsg(`${msg}\nBot: What will be that arrival city?`); i=i+1; departure_city=usermsg;}
      else if(i==2){setMsg(`${msg}\nBot: What will be the time?`); i=i+1; arrival_city=usermsg;}
      else if(i==3){
        setUsermsg(usermsg.trim())
        var parts = usermsg.split(" ")[0].split(':');
        if(!isNaN(parts[0]) && !isNaN(parts[1]) && (usermsg.split(" ")[1] == "AM" || usermsg.split(" ")[1] == "PM"))
        {setMsg(`${msg}\nBot: Enter the number of legs?`); i=i+1; time = {hr: parts[0], min: parts[1], am: usermsg.split(" ")[1]=="AM"?true:false}}
        else {setMsg(`${msg}\nBot: You are mentally ill\nBot: You need a flight to hospital`); i=0;}
      }
      else if(i==4){
        setUsermsg(usermsg.trim())
        if(!isNaN(usermsg)) {legs = usermsg; setMsg(`${msg}\nBot: Success\nBot: ${departure_city} to ${arrival_city} at ${time.hr}:${time.min} ${time.am?"AM":"PM"} with ${legs} legs`); i=0;
        //Sending request to API
        if(time.am==false) {time.hr = time.hr==12?time.hr:`${parseInt(time.hr)+12}`;}
        else {time.hr = time.hr==12?0:time.hr;}
        const req = `source=${departure_city}&goal=${arrival_city}&time=${time.hr}%3A${time.min}&legs=${legs}`
        fetch('http://localhost:8080/submitspecial', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     },
     body: req
   })
     .then(data => data.json())
     .then(data => console.log(data))
      }
        else {setMsg(`${msg}\nYou: ${usermsg}\nBot: You are mentally ill\nBot: You need a flight to hospital`); i=0;}
      }
      isLoading(false);
      isPromp("");
      setUsermsg("");
    }, 1000);
    }
  },[msg, loading])
  const bot = (e)=>{
    e.preventDefault();
    //source=What&goal=a+&time=00%3A00&legs=1
    isLoading(true)
    setMsg(`${msg}\nYou: ${usermsg}`)
    
  }

  return (
    <div class="container">
      <div>
        <div class="input-group mb-3">
      <input type="text" class="form-control" value={usermsg} name="" id="chat-msg" onChange={e=>setUsermsg(e.target.value)}/> 

      <button class="btn btn-outline-secondary" id="chat" type="submit" onClick={bot}>Chat</button>
      </div>
        <div id="display">
          <span>{promp}</span>
            {msg.split('\n').reverse().map(e=>{
              if(e.indexOf('You:')==0) return <p>{e}</p>
              else return <p class='bot-msg'>{e}</p>
            }) }

        </div>  
    </div>
    <div class="special">
            <Special />
    </div>
    </div>
  );
}

export default App;
