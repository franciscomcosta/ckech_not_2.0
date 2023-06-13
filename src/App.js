import multi from './multi-logo.png';
import atlas from './atlas.png';
import './App.css';
import Axios from 'axios';
import React, {useState, useEffect} from 'react';



function App() {

  
  const [Sn, setSn] = useState([]);
  const [result, setResult] = useState([]);
  const [serial, setSerial] = useState([]);
  const [details, setDetails] = useState();
  const [nm, setNm] = useState()



  const changevalue = (event) =>{
      setSn((prevevent) =>({
        ...prevevent,
        [event.target.name]: event.target.value,
      }))
  }

  const changevalueM = (event) =>{
    setNm((prevevent) =>({
      ...prevevent,
      [event.target.name]: event.target.value,
    }))
}

const cap_nm = (event) => {
  event.preventDefault(); 
  if(nm){
    try{
    localStorage.setItem("n_matricula", nm.n_matricula);
    let s = document.getElementById("n_matricula");
    s.style.color = "grey"
    s.value = nm.n_matricula;
    s.readOnly = true
    console.log(localStorage.getItem("n_matricula"))
  }catch{
    console.log("tá")
  }
}
}

const def = (event) => {
  if(!localStorage.getItem("n_matricula")){
    alert("Insira seu número de matrícula!")
  }
  else{
  event.preventDefault(); 
  setSerial(Sn.sn)
  setSn({sn: ""})}
};

  var a = "-"
  var b = 0
  if(serial){
    b = serial
    if(b.length===16 && b[0] === "Q"){
      a = b
      console.log("show")
    }
    else{
      a = "-"
      console.log(a)
    }
  }
  


  const test_url = "localhost:8800/teste"
  var n_serie = b



  useEffect((a) => {
    setResult("Consultando...")
    if(b.length===16){
      Axios.get(`http://${test_url}`,{
        params:{
          n_serie: n_serie,
          id: localStorage.getItem("n_matricula")
        }
      })
      .then((res) => {
        
      if(res.data[0]){
        setResult(res.data[0])
        setDetails(res.data[0])
      } 
      else{
          console.log(res)
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
      <header id="multi" > 
        <img src={multi} width="200" alt="multi-logo.png" height="70" />
        <img src={atlas} width="200" alt="multi-logo.png" height="70" />
    </header>

    <div id="div_title">
        <h2 id="title">Packaging</h2>
    </div>
    <form onSubmit={cap_nm} >
      <h1>Employee number</h1>
      <input type="text" className='input' id='n_matricula' name='n_matricula' onChange={changevalueM}  />
    </form>

    <form onSubmit={def}>
      <h1>Serial Number</h1>
     <input type="text" className="input" onChange={changevalue} value={Sn.sn} placeholder="Insert the serial number here..." name="sn" id="sn" />
    </form>

    <h1>Result:</h1>

    <section className='container'> 
    
    <table>
      <tbody>
      <tr className='linha'>SN: {serial}</tr>  
      <tr className="linha"style={{ color: c === "PASS" ? "green" : result === "Consultando..." ? "SteelBlue" : "red" }}>
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
    <footer style={{color: "grey"}}> 
      Enveloment by Eng Test. MAO
    </footer>
    </div>
    
  );
}

export default App;
