/* CONCEPTOS DDL(DATA DEFINITION LANGUAGE) MEJOR APLICADOS HASTA EL MOMENTO, SIRVE DE REFERENCIA PARA LA CREACIÓN DE NUEVAS BASES DE DATOS */
CREATE DATABASE adminProHospitals;

USE adminProhospitals;

CREATE TABLE
IF NOT EXISTS users
(
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR
(20) NOT NULL,
  password VARCHAR
(70) NOT NULL,
  email VARCHAR
(25) NOT NULL UNIQUE,
  img TEXT NULL,
  role VARCHAR
(25) NOT NULL DEFAULT 'USER_ROLE',
  google BOOLEAN NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

/* Agregando Un Campo A La Tabla De Users */
ALTER TABLE users ADD activate BOOLEAN NOT NULL DEFAULT true;
/* Modificando Un Campo De La Tabla Users */
ALTER TABLE users MODIFY google BOOLEAN NULL DEFAULT FALSE;
/* Modificando Un Campo De La Tabla Users */
ALTER TABLE users MODIFY name VARCHAR
(50) NOT NULL;
/* Modificando Un Campo De La Tabla Users */
ALTER TABLE users MODIFY email VARCHAR
(100) NOT NULL UNIQUE;

CREATE TABLE
IF NOT EXISTS hospitals
(
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name TEXT NOT NULL,
  img TEXT NULL,
  user_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_users_hospitals FOREIGN KEY
(user_id) REFERENCES users
(id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

/* Agregando Un Campo A La Tabla De Hospitals */
ALTER TABLE hospitals ADD activate BOOLEAN NOT NULL DEFAULT true;

CREATE TABLE
IF NOT EXISTS doctors
(
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR
(20) NOT NULL,
  img TEXT NULL,
  user_id INT NOT NULL,
  hospital_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_users_doctors FOREIGN KEY
(user_id) REFERENCES users
(id),
  CONSTRAINT fk_hospitals_doctors FOREIGN KEY
(hospital_id) REFERENCES hospitals
(id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

/* Agregando Un Campo A La Tabla De Doctors */
ALTER TABLE doctors ADD activate BOOLEAN NOT NULL DEFAULT true;