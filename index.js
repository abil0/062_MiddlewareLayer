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
        duration : '${duration}ms'
        
        })
        }

        next()
        })

function successResponse(res, data, statusCode = 200) {
    res.status(statusCode).json({
        sucsess: true,
        message,
        data,
        eror: null
    });
}

function errorResponse(res,message,status, details= null) {
    return res.status(status).json({
        success: false,
        message,
        data: null,
        error: details
    });
}

//joi validation schema
const mahasiswaSchema = joi.object({
    id: joi.number().integer().positive(),
    nama: joi.string().trim().min(2).max(100).required(),
    nim: joi.string().trim().min(2).max(100).required(),
    kelas: joi.string().trim().min(1).max(20).required(),
});

const idschema = joi.object({
    id: joi.number().integer().positive().required()
})

//function middleware validation
function validateBody(schema) {
    return (req, res, next) => {
        const { error } = schema.validate(req.body)
            abortEarly: false,
             convert: true,
            allowUnknown: false,
           
        })

        if (error) {
            return errorResponse(res,
                 "Validasi input gagal",
                  400,
                   error.details.map(item => ({
                    field: item.path.join('.'),
                    message: item.message
                }))
            )
        }
req.body = value
next()
    }
}

//middleware validate parameter
function validateParams(schema) {
    return (req, res, next) => {
        const {eror,value} = schema.validate(req.params)

        if (error) {
            return errorResponse(
                res,
                "Validasi parameter gagal",
                400,
                error.details.map(item => ({
                    field: item.path.join('.'),
                    message: item.message
                }))
            )
        }
        req.params = value
        next()
    }
}
