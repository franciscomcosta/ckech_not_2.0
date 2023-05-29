import mysql from "mysql";

export const db = mysql.createConnection({
    host:"18.210.195.41",
    user:"audit_manaus",
    password:"@ud1t0r14_m@n4u5",
    database:"pc"
})