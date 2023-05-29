import { db } from "../db.js";

export const getUsers = (_, res) => {
    const q = "select * from shopfloor_pc limit 1"
    db.query (q, (err, data) =>{
        if(err) return res.json(err);

        return res.status(200).json(data);
    })
}

export var search = (req, res) => {
    const n_serie = req.query.n_serie;
    db.query('SELECT * FROM shopfloor_pc WHERE n_serie = ?', 
    n_serie, (err,data) => {
        if(err) return res.json(err);

        return res.status(200).json(data);
      });
};
