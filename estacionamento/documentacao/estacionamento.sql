DROP DATABASE IF EXISTS projeto;
CREATE DATABASE projeto;
USE projeto;

CREATE TABLE veiculo(
    id_ve INTEGER(3) PRIMARY KEY NOT NULL ,
    placa VARCHAR(20) NOT NULL UNIQUE,
    veiculo VARCHAR(20) NOT NULL
    
);

INSERT INTO veiculo VALUES
(1,"ASD-1234","CARRO"),
(2,"ZXC-4566","MOTO"),
(3,"MNB-0987","CARRO"),
(4,"LKJ-5643","MOTO"),
(5,"LKJ-5640","MOTO");

CREATE TABLE vaga_estaci(
    id_es INTEGER(3) PRIMARY KEY NOT NULL auto_increment,
    id_ve INTEGER(3) NOT NULL,
    data DATE NOT NULL,
    hora_e TIME NOT NULL,
    hora_s TIME,
    valor DECIMAL(8,2) NOT NULL,
    CONSTRAINT PK_esta_veic FOREIGN KEY (id_ve) REFERENCES veiculo (id_ve) ON DELETE CASCADE
);

INSERT INTO vaga_estaci VALUES
(1,1,CURDATE(),"06:07:12","07:47:12",10),
(2,2,CURDATE(),"06:07:12","08:07:12",20),
(3,3,CURDATE(),"06:07:12","09:07:12",30),
(4,4,CURDATE(),"06:07:12","10:07:12",40),
(5,5,CURDATE(),"06:07:12","10:27:12",50);

CREATE VIEW vw_funcionario as
SELECT v.placa, v.veiculo, e.data, e.hora_e, e.hora_s, round(TIME_TO_SEC(TIMEDIFF(hora_s, hora_e))/3600.0 ,2)  AS hora_dif,
round((TIME_TO_SEC(TIMEDIFF(hora_s, hora_e))/3600.0 * valor),2) AS valor_total
FROM vaga_estaci e LEFT JOIN veiculo v on v.id_ve = e.id_es;

SELECT * FROM vaga_estaci;
SELECT * FROM vw_funcionario;
SELECT * FROM veiculo;
SHOW TABLES;