// Modulos
const express = require("express");
const path = require('path');    
const dotenv =  require("dotenv");
const session = require('express-session');
const bcryptjs = require('bcryptjs');


// Inicializador del servidor
const app= express();

// Configuración del puerto
app.set('port', process.env.PORT || 4000);

// Gestor de plantillas
app.set('view engine', 'ejs');

// Rutas de las vistas
let rutasViews= path.join(__dirname,'../app/views');
app.set('views', rutasViews);

// Middlewares (Manejo de infromación)
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// Configuración del dotenv

dotenv.config({path: path.join(__dirname, '../app/env/.env')});

// Cobfiguración del css
var rutaPublic =  express.static(path.join(__dirname,'../public'));
app.use('/src', rutaPublic);

//Configurar sesiones
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

module.exports= app;