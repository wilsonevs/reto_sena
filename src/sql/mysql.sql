CREATE DATABASE reto_sena;
USE reto_sena;
CREATE TABLE IF NOT EXISTS tb_usuario(
id_usuario INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
username VARCHAR(45) NOT NULL UNIQUE,
firstname VARCHAR(75) NOT NULL,
lastname VARCHAR(75) NOT NULL,
passw VARCHAR(255) NOT NULL,
activo VARCHAR(25)  NOT NULL,
fecha_creacion TIMESTAMP
)ENGINE = InnoDB;

INSERT INTO tb_usuario (username,firstname,lastname,passw,activo) VALUES ('admin', 'JAIRO ANDRES', ' RODRIGUEZ  RODRIGUEZ', 'admon123',"activo");
SELECT * FROM reto_sena.tb_usuario;
DROP TABLE tb_usuario;


