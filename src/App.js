import React,{useState} from 'react';
import Results from "./component/Results"
import Search from "./component/Search"
import axios from "axios"
import Popup from "./component/Popup"

function App() {

  const APIKEY=process.env.REACT_APP_KEY
  const [state,setState]=useState({
    s:"",
    results:[],
    selected:[]
  })

  const search=(e)=>{
    if(e.key==="Enter"){
    axios(APIKEY+"&s="+state.s).then(({data})=>{
      let results=data.Search
      setState(prevState=>{
        return {...prevState, results:results}
      })
    })
  }}

  const openPopup=(id)=>{
    axios(APIKEY + "&i=" + id).then(({ data })=>{
        let result=data
        //console.log(id)
        setState(prevState=>{
          return {...prevState, selected:result}
        })
    })
  }

  const closePopup=()=>{
    setState(prevState=>{
          return {...prevState, selected:{}}
        })
    }

  const handleInput=(e)=>{
    let s=e.target.value

    setState(prevState=>{
      return {...prevState,s:s}
    })

    console.log(state.s)
  }

  return (
    <div className="App">
        <header>
            <h1>MOVIE DATABASE</h1>
        </header>
        <main>
          <Search handleInput={handleInput} search={search}/>
          <Results results={state.results} openPopup={openPopup}/>
          {(typeof state.selected.Title !="undefined") ? <Popup selected={state.selected} closePopup={closePopup}/>:false}
        </main>
        
    </div>
  );
}

export default App;
