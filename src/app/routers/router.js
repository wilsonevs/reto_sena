// const conexion = require("../../config/connectionDb.js");
const { app } = require("express");
const { 
    getIndex,
    postIndex,

    getRegistro,
    postRegistro,

    getUsuarioRegistrados,
    postUsuarioRegistrados,
    postUpdateUsuarioRegistrados,
    getDeleteUsuarioRegistrados,

    getUsuarioActivo,
    postUsuarioActivos,
    getDeleteUsuarioActivos,
    postUpdateUsuarioActivos,


    getTerminos_condiciones,

    getPerfil,
    postUpdatePerfil,
    getLogout,

    getError, 
} = require("../controllers/controller");

module.exports = (app) => {
//   Get
  app.get("/", getIndex);
  app.post("/", postIndex);

  app.get("/registro", getRegistro);
  app.post("/registro", postRegistro);

  app.get("/usuarios_registrados", getUsuarioRegistrados);
  app.post("/usuarios_registrados", postUsuarioRegistrados);
  app.get("/deleteRegistro/:id", getDeleteUsuarioRegistrados);
  app.post("/UpdateRegistrado/:id", postUpdateUsuarioRegistrados);

  app.get("/usuarios_activos", getUsuarioActivo);
  app.post("/usuarios_activos", postUsuarioActivos);
  app.get("/deleteactivos/:id", getDeleteUsuarioActivos);
  app.post("/updateactivos/:id", postUpdateUsuarioActivos);

  app.get("/perfil", getPerfil);
  app.post("/updateperfil/:id",postUpdatePerfil);

  app.get("/logout", getLogout);
  app.get("*", getError);



};
