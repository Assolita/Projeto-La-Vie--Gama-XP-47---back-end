CREATE DATABASE `gama_lavie`;

USE `gama_lavie`;

create table psicologos (id integer not null auto_increment PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    apresentacao TEXT NOT NULL,
    email VARCHAR(255) NOT NULL );

create table pacientes (id integer not null auto_increment PRIMARY KEY,
nome VARCHAR(255) NOT NULL,
idade DATE NOT NULL );

create table atendimentos (
id integer not null auto_increment PRIMARY KEY,
data_atendimento date NOT NULL,
observacao VARCHAR(255) NOT NULL,
psicologo_id INTEGER NOT NULL,
paciente_id INTEGER NOT NULL,
CONSTRAINT psicologo_id FOREIGN KEY
	(psicologo_id) REFERENCES psicologos(id),
CONSTRAINT paciente_id FOREIGN KEY
	(paciente_id) REFERENCES pacientes(id) 
);
