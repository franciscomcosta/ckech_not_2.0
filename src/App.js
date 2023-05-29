import multi from './multi-logo.png';
import './App.css';
import Axios from 'axios';
import React, {useState, useEffect} from 'react';



function App() {

  
  const [Sn, setSn] = useState([]);
  const [result, setResult] = useState([]);
  const [serial, setSerial] = useState([]);
  const [details, setDetails] = useState();


  const def = (event) => {
    event.preventDefault(); 
    setSerial(Sn.sn)
    setSn({sn: ""})
  };

  const changevalue = (event) =>{
      setSn((prevevent) =>({
        ...prevevent,
        [event.target.name]: event.target.value,
      }))
  }


  var a = "-"
  var b = 0
  if(serial){
    b = serial
    if(b.length===15){
      a = parseFloat(b)
      
    }
    else{
      a = "-"
    }
  }
  


  const test_url = "localhost:8800/teste"
  var n_serie = b



  useEffect((a) => {
    setResult("Consultando...")
    if(b.length===15){
      Axios.get(`http://${test_url}`,{
        params:{
          n_serie: n_serie
        }
      })
      .then((res) => {
        
      if(res.data[0]){
        setResult(res.data[0])
        setDetails(res.data[0])
      } 
      else{
          setResult("Placa não testada!")
        }
      })
    }
    else{
      setResult("Insira um número de série válido!")
      }
    
    } ,[a,test_url,b,n_serie])


    
  var c = "Insira um Sn!"


    if(result.status){
      c = result.status;
    }
    else{
      c = result;
    }
  
 

  return (
    <div className="App">
      <div id="multi"> 
        <img src={multi} width="200" alt="multi-logo.png" height="70" />
    </div>

    <div id="div_title">
        <h2 id="title">Check X - Notebook</h2>
    </div>

    <form onSubmit={def}>
      <h1>Serial Number</h1>
     <input type="text" className="input" onChange={changevalue} value={Sn.sn} placeholder="Insira o número de série..." name="sn" id="sn" />
    </form>

    <h1>Resultado:</h1>

    <section className='container'> 
    
    <table>
      <tbody>
      <tr className='linha'>NS: {a}</tr>  
      <tr className="linha"style={{ color: c === "Aprovado" ? "green" : result === "Consultando..." ? "SteelBlue" : "red" }}>
        {c}
      </tr>
      <tr></tr>
      
      </tbody>
    </table>
        {typeof details !== "undefined" && Array(details).map((res) =>{
        
        let date = new Date(res.data);
        let dia = date.getDate();
        let mes = date.getMonth() + 1;
        let ano = date.getFullYear();
        let datef= dia + "/" + mes + "/" + ano;
        if(c==="Aprovado"){
        return (
          <>
      <table>
        <tbody>
          <td>
          <tr className='linha'>Modelo: {res.modelo}</tr>
          <tr className='linha'>Data: {datef}</tr>
          </td>
          <td>
          <tr className='linha'>Hora: {date.toLocaleTimeString()}</tr>
          <tr className='linha'>Linha: {res.linha}</tr>
          </td>
          </tbody>
      </table>
          </>
        
        )}
        else{
          return (
            <>
        <table>
        <tbody>
            <td>
            <tr className='linha'>Modelo: -</tr>
            <tr className='linha'>Data: -</tr>
            </td>
            <td>
            <tr className='linha'>Hora: -</tr>
            <tr className='linha'>Linha: -</tr>
            </td>
          </tbody>
        </table>
            </>
          )}
        })
      }
        
    </section>
    <footer style={{color: "SteelBlue"}}> 
      Enveloment by Eng Test. MAO
    </footer>
    </div>
    
  );
}

export default App;
