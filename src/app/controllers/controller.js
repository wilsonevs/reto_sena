
const connection = require("../../config/connectionDb.js");
const bcryptjs = require("bcryptjs");

// Sesión
const getIndex = (req, res) => {
  if (req.session.loggedin) {
    res.render("usuarios_registrados.ejs", {
      // Enviar parametros
      username: req.session.username,
      login: true,
    });
  } else {
    res.render("index.ejs", {
      username: req.session.username,
      login: false,
    });
  }
};

const postIndex = (req, res) => {
  const { username, passw } = req.body;
  console.log(req.body);
  connection.query(
    "SELECT * FROM tb_usuario WHERE username = ? ",
    [username], (err, result) => {
      // if (result.length === 0 ||!(await bcryptjs.compare(passw, result[0].passw))) {
        if ( username === "admin" || passw === "admon123" ) {
          req.session.loggedin = true;
          req.session.username = result[0].username;
          res.redirect("/usuarios_registrados");
      } else {
        res.render("index.ejs", {
          login: false,
          alert: true,
          alertTitle: "Invalido",
          alertMessage: "Usuario y/o Contraseña Inconrrectas",
          alertIcon: "error",
          showConfirmButton: false,
          timer: 3500,
          ruta: "/",
        });
   
      }
    }
  );
};
 
// Registro

const getRegistro =  (req, res) => {
  if (req.session.loggedin) {
    res.render("registro.ejs", {
      // Enviar parametros
      username: req.session.username,
      login: true,
    });
  } else {
    res.render("registro.ejs", {
      username: req.session.username,
      login: false,
    });
  }
}


const postRegistro = async (req, res) => {
  const {username, firstname, lastname, passw} = req.body;
  console.log(req.body);
  let passHaash = await bcryptjs.hash(passw, 8);
  connection.query("SELECT * FROM tb_usuario WHERE username = ?",[username],(err, result) => {
      if (result.length === 0) {
        connection.query(
          "INSERT INTO tb_usuario SET ?",
          {
            username: username,
            firstname: firstname,
            lastname: lastname,
            passw: passHaash,
            activo: "activo",
          },
          async (error, results) => {
            if (error) {
              console.log("Que error tengo" + error);
            } else {
              res.render("index.ejs", {
                login: false,
                alert: true,
                alertTitle: "Registrar",
                alertMessage: "Registro exitoso",
                alertIcon: "success",
                showConfirmButton: false,
                timer: 2500,
                ruta: "/",
              });
            }
          }
        );
      } else {
        res.render("registro.ejs", {
          login: false,
          alert: true,
          alertTitle: "¡Cuidado!",
          alertMessage: "Usuario no se encuentar disponible",
          alertIcon: "info",
          showConfirmButton: false,
          timer: 3500,
          ruta: "registro",
        });
      }
    }
  );
};

// Usuarios registrados

const getUsuarioRegistrados = (req, res) => {
  connection.query("SELECT * FROM tb_usuario", (error, results) => {
    if (error) {
      console.log("Que error tengo" + error);
    } else {
      if (req.session.loggedin) {
        res.render("usuarios_registrados.ejs", {
          // Enviar parametros
          username: req.session.username,
          login: true,
          datos: results,
        });
      } else {
        res.render("index.ejs", {
          username: req.session.username,
          login: false,
        });
      }
    }
  });
};

const postUsuarioRegistrados = async (req, res) => {
  const { username, firstname, lastname, activo, passw} = req.body;
  console.log(req.body);
  let passHaash = await bcryptjs.hash(passw, 8);
  connection.query(
    "INSERT INTO tb_usuario SET ?",
    {
      username : username,
      firstname: firstname,
      lastname: lastname,
      activo: activo,
      passw: passHaash,
    },
    async (error, results) => {
      if (error) {
        console.log("Que error tengo" + error);
      } else {
        res.render("usuarios_registrados.ejs", {
          datos: results,
          username: req.session.username,
          login: true,
          alert: true,
          alertTitle: "Registro",
          alertMessage: "!Registro Ingresado!",
          alertIcon: "success",
          showConfirmButton: false,
          timer: 2500,
          ruta: "usuarios_registrados",
        });
      }
    }
  );
}


const postUpdateUsuarioRegistrados = (req,res) => {
  const id= req.params.id;
  const {username, firstname, lastname, activo} = req.body;
  console.log(req.body);
  connection.query("UPDATE tb_usuario SET username = ?, firstname = ?, lastname = ?, activo = ? WHERE id_usuario = ?", 
  [username, firstname, lastname, activo , id], (err, results) =>  {
    if(err){
      res.send(err);
    }else{
      res.redirect("/usuarios_registrados");
    }
  });
};


const getDeleteUsuarioRegistrados = (req,res) => {
  const id= req.params.id;
  connection.query("DELETE FROM tb_usuario WHERE id_usuario = ?", [id], (err,result) => {
    if(err){
      res.send(err);
    }else{
       res.redirect("/usuarios_registrados");
    }
  });
}

// 

const getUsuarioActivo = (req, res) => {
  connection.query("SELECT * FROM tb_usuario", (error, results) => {
    if (error) {
      console.log("Que error tengo" + error);
    } else {
      if (req.session.loggedin) {
        res.render("usuarios_activos.ejs", {
          // Enviar parametros
          username: req.session.username,
          login: true,
          datos: results,
        });
      } else {
        res.render("index.ejs", {
          username: req.session.username,
          login: false,
        });
      }
    }
  });
};


const postUsuarioActivos = async (req, res) => {
  const { username, firstname, lastname, activo, passw} = req.body;
  console.log(req.body);
  let passHaash = await bcryptjs.hash(passw, 8);
  connection.query(
    "INSERT INTO tb_usuario SET ?",
    {
      username : username,
      firstname: firstname,
      lastname: lastname,
      activo: activo,
      passw: passHaash,
    },
    async (error, results) => {
      if (error) {
        console.log("Que error tengo" + error);
      } else {
        res.render("usuarios_activos.ejs", {
          datos: results,
          username: req.session.username,
          login: true,
          alert: true,
          alertTitle: "Registro",
          alertMessage: "!Registro Ingresado!",
          alertIcon: "success",
          showConfirmButton: false,
          timer: 2500,
          ruta: "usuarios_activos",
        });
      }
    }
  );
}


const getDeleteUsuarioActivos = (req,res) => {
  const id= req.params.id;
  connection.query("DELETE FROM tb_usuario WHERE id_usuario = ?", [id], (err,result) => {
    if(err){
      res.send(err);
    }else{
       res.redirect("/usuarios_activos");
    }
  });
}

const postUpdateUsuarioActivos = (req,res) => {
  const id= req.params.id;
  const {username, firstname, lastname, activo} = req.body;
  console.log(req.body);
  connection.query("UPDATE tb_usuario SET username = ?, firstname = ?, lastname = ?, activo = ? WHERE id_usuario = ?", 
  [username, firstname, lastname, activo , id], (err, results) =>  {
    if(err){
      res.send(err);
    }else{
      res.redirect("/usuarios_activos");
    }
  });
};


const getPerfil = (req, res) => {
  connection.query("SELECT * FROM tb_usuario ", (error, results) => {
    if (error) {
      console.log("Que error tengo" + error);
    } else {
      if (req.session.loggedin) {
        res.render("perfil.ejs", {
          // Enviar parametros
          username: req.session.username, 
          login: true,
          datos: results,
        });
      } else {
        res.render("index.ejs", {
          username: req.session.username,
          login: false,
        });
      }
    }
  });
};

const postUpdatePerfil =  (req,res) => {
  const id= req.params.id;
  const{username, firstname, lastname, activo} = req.body;
  console.log(req.body);
  connection.query("UPDATE tb_usuario SET username = ?, firstname = ?, lastname = ?, activo = ? WHERE id_usuario = ?", 
      [username, firstname, lastname, activo, id], (err, results) =>  {
        if(err){
          res.send(err);
        }else{
          res.redirect("/perfil");
        }
      });
  
}

const getLogout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

const getTerminos_condiciones = (req, res) => {
  if (req.session.loggedin) {
    res.render("terminos_condiciones.ejs", {
      // Enviar parametros
      username: req.session.username,
      
      login: true,
    });
  } else {
    res.render("terminos_condiciones.ejs", {
      username: req.session.username,
      
      login: false,
    });
  }
}
const getError = (req, res) => {
  if (req.session.loggedin) {
    res.render("./404.ejs", {
      // Enviar parametros
      username: req.session.username,
      login: true,
    });
  } else {
    res.render("./404.ejs", {
      username: req.session.username,
      login: false,
    });
  }
}

module.exports = {
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

  getPerfil,
  postUpdatePerfil,
  getLogout,

  getTerminos_condiciones, 
  getError,
};