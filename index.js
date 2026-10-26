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