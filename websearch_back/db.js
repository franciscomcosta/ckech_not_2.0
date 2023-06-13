import mysql from "mysql";

export const db = mysql.createConnection({
    host:"10.1.0.36",
    user:"balanca",
    password:"multilaser",
    database:"SGE_MAO"
})