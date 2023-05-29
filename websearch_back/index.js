import express from "express";
import cors from "cors";
import userRoutes from "./routes/users.js"
import { db } from "./db.js";

const app = express();

app.use(express.json());
app.use(cors());

app.get('/teste',(req, res) => {
    const n_serie = req.query.n_serie;
    db.query('SELECT * FROM shopfloor_pc WHERE n_serie = ? order by data desc limit 1', n_serie, (err,data) => {
        if(err) return res.json(err);

        return res.status(200).json(data);
      });
});

app.use("/search", userRoutes)
app.use("/", userRoutes)

app.listen(8800);