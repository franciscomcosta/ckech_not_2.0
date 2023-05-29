import multi from './multi-logo.png';
import './busca.css';
import Axios from 'axios';
import React, {useState, useEffect} from 'react';



function App() {


  const [Sn, setSn] = useState([])
  const [result, setResult] = useState([])

  const changevalue = (event) =>{
      setSn((prevevent) =>({
        ...prevevent,
        [event.target.name]: event.target.value,
      }))
 }
  let a = parseFloat(Sn.sn)
  console.log(a)

  console.log(Sn)
  
  useEffect(() => {
    Axios.get(`https://cors-anywhere.herokuapp.com/https://spm.multilaser.com.br/checkaudit/?ns=${a}`)
    .then((res) => {
      setResult(res.data)
    })
  },[])

  

  console.log(result)

  return (
    <div className="App">
      <div id="multi"> 
        <img src={multi} width="200" alt="multi-logo.png" height="70" />
    </div>

    <div id="div_title">
        <h2 id="title">Check X - Notebook</h2>
    </div>

    <form>
      <h1>Serial Number</h1>
      <input type="text" onChange={changevalue} name="sn" />
    </form>
 
    <button onClick={() => {window.open(`https://spm.multilaser.com.br/checkaudit/?ns=${a}`)}}>Pesquisar</button>

    <section className='container'> 
    {()=>{
          if(result.Resultado == "APROVADO"){
            return(
              <>
                <tr class="linha">{result.Resultado}</tr>
              </>
            )
          }
          else{
            <>
              <tr class="linha2">{result.Resultado}</tr>
            </>
          }
        }
    }
    </section>
    </div>
    
  );
}

export default App;
