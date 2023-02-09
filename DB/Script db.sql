create database lavie;
use lavie;
CREATE TABLE pacientes(
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(256) NOT NULL,
  email VARCHAR(256) NOT NULL,
  idade DATE NOT NULL
);
CREATE TABLE psicologos(
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(256) NOT NULL,
  email VARCHAR(256) NOT NULL,
  senha VARCHAR(256) NOT NULL,
  apresentacao TEXT NOT NULL
);

CREATE TABLE atendimentos(
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  paciente_id INT NOT NULL,
  psicologo_id INT NOT NULL,
  constraint paciente_psicologo foreign key (paciente_id) references pacientes(id),
  constraint psicologo_paciente foreign key (psicologo_id) references psicologos(id),
  data_atendimento DATE NOT NULL,
  observacao VARCHAR(256) NOT NULL  
  );
  




