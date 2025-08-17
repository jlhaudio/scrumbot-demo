import { useState, useEffect } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
  

function App() {
  //declare variables 
  const[member, setMember] = useState("");
  const[yesterday, setYesterday] = useState("");
  const[today,setToday] = useState(""); 
  const[roadblocks, setRoadblocks]= useState("");
  const[entries, setEntries]= useState([]);


///////////////////////////
// save to local storage upon scrumEntries update
useEffect(() => {
  localStorage.setItem("scrumEntries", JSON.stringify(entries));
}, [entries]); //run onChange of entries 

  //////////////////////////////
  // load entries from local storage onStart 
  useEffect(
    () =>
      {
      const storedEntries = localStorage.getItem("scrumEntries");
      if(storedEntries)
      {setEntries(JSON.parse(storedEntries));

      }
  }, [] //runs only onStart
  );


/////////////////////////////////////////
//event handler onSubmit of form & clears form
function handleSubmit(e){
  e.preventDefault();
  const trueRoadblocks = roadblocks.trim();
  const  newEntry = {
    member, yesterday, today, roadblocks: trueRoadblocks
  
  };
  //clear form
  setEntries([...entries, newEntry]);
  setMember("");
  setYesterday("");
  setToday("");
  setRoadblocks("");
};





////////////////////////
// THE PURGE button 
const handlePurge = () => { 
  const confirmPurge = window.confirm("Are you really sure you want to permanently purge all these lovely records?");
    if(confirmPurge){
  localStorage.removeItem("scrumEntries");
  setEntries([]); //enter the void
    }
};


//////////////////////
//return

  return (
    <div>
      <h1>ScrumBot 🤖</h1>
      <h2> A fun rudimentary demo </h2>
        <center><i>It's scrum time!</i></center>
      <form onSubmit={handleSubmit}>
        <label>
          Who are you?
          <input type="text" value={member} onChange={(e) => setMember(e.target.value)} />
        </label>
        <br />
        <label>
          What did you do yesterday?
          <input type="text" value={yesterday} onChange={(e) => setYesterday(e.target.value)} />
        </label>
        <br />
        <label>
          What are you doing today?
          <input type="text" value={today} onChange={(e) => setToday(e.target.value)} />
        </label>
        <br />
        <label>
          List any roadblocks (leave blank if none):
          <input type="text" value={roadblocks} onChange={(e) => setRoadblocks(e.target.value)} />
        </label>
        <br />
        <button type="submit">Submit</button>
  

      </form>

      <h2>Today's TL;DR</h2>
      {entries.map((entry, index) => (
        <div key={index} className="entry">
          <p><strong>Awesome Team Member:</strong> {entry.member}</p>
          <p><strong>Yesterday:</strong> {entry.yesterday}</p>
          <p><strong>Today:</strong> {entry.today}</p>
          <p><strong>Roadblocks:</strong> {entry.roadblocks || "Wow! No roadblocks!"}</p>
          
          <hr/>
        </div>
              ))}
            <p><strong>Total entries:               {entries.length} </strong></p>
            <p><strong> Total Roadblocks: </strong>
            {entries.filter(entry => entry.roadblocks.trim() !=="").length}
          
            
            </p>
                  <br></br><hr></hr>
    {/*<!-- PURGE BUTTON --> */} 
<div style={{textAlign: 'center'}}>
    <button type="button" onClick={handlePurge} className="purgeButton"> 
    PURGE ALL RECORDS 💾🗑️😱 </button>
</div>
    </div>
    
  );

}


export default App;
