<?php

	class Tbtipos_logins {
		var $idti_lo;
		var $tipo;

		function getIdti_lo(){
			return $this->idti_lo;
		}
		function setIdti_lo($idti_lo){
			$this->idti_lo = $idti_lo;
		}

		function getTipo(){
			return $this->tipo;
		}
		function setTipo($tipo){
			$this->tipo = $tipo;
		}
	}

	class Tbtipos_loginsDAO {
		function create($tbtipos_logins) {
			$result = array();

			try {
				$query = "INSERT INTO tbtipos_logins VALUES (default, '".$tbtipos_logins->getTipo()."')";

				$con = new Connection();

				if(Connection::getInstance()->exec($query) >= 1){
					$result["idti_lo"] = Connection::getInstance()->lastInsertId();
					$result["tipo"] = $tbtipos_logins->getTipo();
				}else {
					$result["erro"] = "Não foi possível add um novo tipo";
				}

				$con = null;
			}catch(PDOException $e) {
				$result["err"] = $e->getMessage();
			}

			return $result;
		}

		function read($idti_lo) {
			
			$result = array();

			try {
				$query = "SELECT * FROM tbtipos_logins WHERE idti_lo = $idti_lo";
				
				$con = new Connection();

				$resultSet = Connection::getInstance()->query($query);

				while($row = $resultSet->fetchObject()){
					$tbtipos_logins = new Tbtipos_logins();
					$tbtipos_logins->setIdti_lo($row->idti_lo);
					$tbtipos_logins->setTipo($row->tipo);
					$result[] = $tbtipos_logins;
				}

				$con = null;
			}catch(PDOException $e) {
				$result["err"] = $e->getMessage();
			}

			return $result;
		}

		function readAll() {
			$result = array();
			try {
				$query = "SELECT * FROM tbtipos_logins";
				$con = new Connection();

				$resultSet = Connection::getInstance()->query($query);

				while($row = $resultSet->fetchObject()){
					$tbtipos_logins = new Tbtipos_logins();
					$tbtipos_logins->setIdti_lo($row->idti_lo);
					$tbtipos_logins->setTipo($row->tipo);
					$result[] = $tbtipos_logins;
				}

				$con = null;
			}catch(PDOException $e) {
				$result["err"] = $e->getMessage();
			}

			return $result;
		}

		function update($tip) {
			$result = array();
			$idti_lo = $tip->getIdti_lo();
			$tipo = $tip->getTipo();

			try {
				$query = "UPDATE tbtipos_logins SET  tipo = '$tipo' WHERE idti_lo = $idti_lo";

				$con = new Connection();

				$status = Connection::getInstance()->prepare($query);

				if($status->execute()){
					$result = $tip;
				}else {
					$result["erro"] = "Não foi possível atualizar os dados!"; 
				}

				$con = null;
			}catch(PDOException $e) {
				$result["err"] = $e->getMessage();
			}

			return $result;
		}

		function delete($idti_lo) {
			$result = array();

			try {
				$query = "DELETE FROM tbtipos_logins WHERE idti_lo = $idti_lo";

				$con = new Connection();

				if(Connection::getInstance()->exec($query) >= 1){
					$result["msg"] = "Id removido com sucesso! ";
				}else {
					$result["erro"] = "Id não removido!";
				}

				$con = null;
			}catch(PDOException $e) {
				$result["err"] = $e->getMessage();
			}

			return $result;
		}
	}
