import express from "express";
import cors from "cors";
import userRoutes from "./routes/users.js"
import { db } from "./db.js";

const app = express();

app.use(express.json());
app.use(cors());

app.get('/teste',(req, res) => {
    const n_serie = req.query.n_serie;
    const id_func = req.body.id;
    db.query('SELECT * FROM tracelog_nokia_current WHERE SerialNumber = ?', n_serie, (err,data) => {
        if(err) console.log (err);

        else{
        if(data.status){
          if(data.status === "FAIL"){
            return res.send({msg: "Falhou"})
          }
          else{
            const model = db.query("select * from packing_embarque",(err,result) => {
              if(err) console.log(err)
              else  return result;
            })
            let status = data;
            let date = new Date();
            let cb = "MB" + "00001";
            let go = date.toLocaleDateString();
            db.query('insert into packing_registro_sn (SN, CaixaBox, Modelo,Embarque,Data_embalagem,Linha,ID_Operavional) VALUES (?,?,?,?,?,?,?,?)',
            [status.SerialNumber,cb , model.Modelo, model.Processo,go,status.line,id_func], (err, resultado) =>{
              if(err) console.log(err)
              else{
                res.send({msg: "PASS"})
              }
            })
          }
        }
      }
      });
});

app.use("/search", userRoutes)
app.use("/", userRoutes)

app.listen(8800);