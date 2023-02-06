<?php

	class Tbali_has_tbped {
		var $idali;
		var $idpedido;
		var $qtdcli;

		function getIdali(){
			return $this->idali;
		}
		function setIdali($idali){
			$this->idali = $idali;
		}

		function getIdpedido(){
			return $this->idpedido;
		}
		function setIdpedido($idpedido){
			$this->idpedido = $idpedido;
		}

		function getQtdcli(){
			return $this->qtdcli;
		}
		function setQtdcli($qtdcli){
			$this->qtdcli = $qtdcli;
		}
	}

	class Tbali_has_tbpedDAO {
		function create($tbali_has_tbped) {
			$result = array();
			$idali = $tbali_has_tbped->getIdali();
			$idpedido = $tbali_has_tbped->getIdpedido();
			$qtdcli = $tbali_has_tbped->getQtdcli();
			
			try {
				$query = "INSERT INTO tbali_has_tbped VALUES ($idali, $idpedido, $qtdcli)";

				$con = new Connection();
				if(Connection::getInstance()->exec($query) >= 1){
					$result = $tbali_has_tbped;
				} else {
					$result["erro"] = "Erro ao salvar pedido!";
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
				$query = "SELECT * FROM tbali_has_tbped";
				$con = new Connection();
				$resultSet = Connection::getInstance()->query($query);

				while($row = $resultSet->fetchObject()){
					$inter = new Tbali_has_tbped();
					$inter->setIdali($row->idali);
					$inter->setIdpedido($row->idpedido);
					$inter->setQtdcli($row->qtdcli);
					$result[] = $inter;
				}
				$con = null;
			}catch(PDOException $e) {
				$result["err"] = $e->getMessage();
			}
			return $result;
		}

		function read($idpedido) {
			$result = array();

			try {
				$query = "SELECT * FROM tbali_has_tbped WHERE idpedido = $idpedido";
				$con = new Connection();
				$resultSet = Connection::getInstance()->query($query);

				while($row = $resultSet->fetchObject()){
					$inter = new Tbali_has_tbped();
					$inter->setIdali($row->idali);
					$inter->setIdpedido($row->idpedido);
					$inter->setQtdcli($row->qtdcli);
					$result[] = $inter;
				}
				$con = null;
			}catch(PDOException $e) {
				$result["err"] = $e->getMessage();
			}
			return $result;
		}


		function update($pedido) {
			$result = array();
			$idali = $pedido->getIdali();
			$idpedido = $pedido->getIdpedido();
			$qtdcli = $pedido->getQtdcli();
			try {
				$query = "UPDATE tbali_has_tbped SET qtdcli = '$qtdcli' WHERE idali = $idali";

				$con = new Connection();
				$status = Connection::getInstance()->prepare($query);
				if($status->execute()){
					$result = $pedido;
				} else {
					$result["erro"] = "Não foi possível atualizar os dados do pedido!";
				}
				$con = null;
			}catch(PDOException $e) {
				$result["err"] = $e->getMessage();
			}
			return $result;
		}

		function delete($idpedido) {
			$result = array();

			try {
				$query = "DELETE FROM tbali_has_tbped WHERE idpedido = $idpedido";

				$con = new Connection();
				if(Connection::getInstance()->exec($query) >= 1){
					$result["msg"] = "Pedido removido com sucesso! ";
				}else {
					$result["erro"] = "Falha ao remover pedido!";
				}
				$con = null;
			}catch(PDOException $e) {
				$result["err"] = $e->getMessage();
			}
			return $result;
		}
	}
