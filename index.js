import express from "express";
import pg from "pg";
import joi from "joi";

const app = express();
const port = 3000;
const { pool } = pg;

const pool = new pool({
    user : "Postgres",
    host : "localhost",
    database : "mahasiswa",
    password : "password",
    port,
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

 app.use((req, res, next) => {
    const start = Date.now();

    res.on("finish", () => {
        const duration = Date.now() - start;
        console.log({
        method :req.method
        url :req.originalUrl
        status : res.statusCode
        duration : ${duration}ms`
        
        })
        }

        next()
        })