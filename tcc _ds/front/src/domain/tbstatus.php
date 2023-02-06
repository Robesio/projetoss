<?php

	class Tbstatus {
		var $idstatus;
		var $nomestatus;

		function getIdstatus(){
			return $this->idstatus;
		}
		function setIdstatus($idstatus){
			$this->idstatus = $idstatus;
		}

		function getNomestatus(){
			return $this->nomestatus;
		}
		function setNomestatus($nomestatus){
			$this->nomestatus = $nomestatus;
		}
	}

	class TbstatusDAO {
		function create($tbstatus) {
			$result = array();
			$idstatus = $tbstatus->getIdstatus();
			$nomestatus = $tbstatus->getNomestatus();
			try {
				$query = "INSERT INTO tbstatus VALUES(default, '$nomestatus')";

				$con = new Connection();
				if(Connection::getInstance()->exec($query) >= 1){
					$result = $tbstatus;
				} else {
					$result["erro"] = "Erro ao salvar!";
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
				$query = "SELECT * FROM tbstatus";

				$con = new Connection();
				$resultSet = Connection::getInstance()->query($query);
				while($row = $resultSet->fetchObject()){
					$status = new Tbstatus();
					$status->setIdstatus($row->idstatus);
					$status->setNomestatus($row->nomestatus);
					$result[] = $status;
				}

				$con = null;
			}catch(PDOException $e) {
				$result["err"] = $e->getMessage();
			}
			return $result;
		}
		
		function read($idstatus) {
			$result = array();

			try {
				$query = "SELECT * FROM tbstatus WHERE idstatus = $idstatus";

				$con = new Connection();
				$resultSet = Connection::getInstance()->query($query);
				while($row = $resultSet->fetchObject()){
					$status = new Tbstatus();
					$status->setIdstatus($row->idstatus);
					$status->setNomestatus($row->nomestatus);
					$result[] = $status;
				}

				$con = null;
			}catch(PDOException $e) {
				$result["err"] = $e->getMessage();
			}
			return $result;
		}

		function update($tbstatus) {
			$result = array();
			$idstatus = $tbstatus->getIdstatus();
			$nomestatus = $tbstatus->getNomestatus();
			try {
				$query = "UPDATE tbstatus SET nomestatus = '$nomestatus' WHERE idstatus = $idstatus";

				$con = new Connection();
				$status = Connection::getInstance()->prepare($query);
				if($status->execute()){
					$result = $tbstatus;
				} else {
					$result["erro"] = "Não foi possível atualizar os dados!";
				}
				$con = null;
			}catch(PDOException $e) {
				$result["err"] = $e->getMessage();
			}

			return $result;
		}

		function delete($idstatus) {
			$result = array();

			try {
				$query = "DELETE FROM tbstatus WHERE idstatus = $idstatus";

				$con = new Connection();
				if(Connection::getInstance()->exec($query) >= 1){
					$result["msg"] = "Status removido com sucesso! ";
				}else {
					$result["erro"] = "Falha ao excluir!";
				}
				$con = null;
			}catch(PDOException $e) {
				$result["err"] = $e->getMessage();
			}
			return $result;
		}
	}
