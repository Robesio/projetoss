<?php

	class Veiculo {
		var $id_ve;
		var $placa;
		var $veiculo;

		function getId_ve(){
			return $this->id_ve;
		}
		function setId_ve($id_ve){
			$this->id_ve = $id_ve;
		}

		function getPlaca(){
			return $this->placa;
		}
		function setPlaca($placa){
			$this->placa = $placa;
		}

		function getVeiculo(){
			return $this->veiculo;
		}
		function setVeiculo($veiculo){
			$this->veiculo = $veiculo;
		}
	}

	class VeiculoDAO {
		function create($veiculo) {
			$result = array();
			try {
				$query = "INSERT INTO veiculo VALUES (default, '".$veiculo->getPlaca()."', '".$veiculo->getVeiculo()."')";
				$con = new Connection();
				if(Connection::getInstance()->exec($query) >= 1){
					$result["id_ve"] = Connection::getInstance()->lastInsertId();
					$result["placa"] = $veiculo->getPlaca();
					$result["veiculo"] = $veiculo->getVeiculo();
				} else {
					$result["erro"] = "Não foi possível add um novo veículo";
				}
				$con = null;
			}catch(PDOException $e) {
				$result["err"] = $e->getMessage();
			}
			return $result;
		}

		function read($id_ve) {
			$result = array();
			try {
				$query = "SELECT * FROM veiculo WHERE id_ve = $id_ve";
				$con = new Connection();
				$resultSet = Connection::getInstance()->query($query);
				while($row = $resultSet->fetchObject()){
					$veiculo = new Veiculo();
					$veiculo->setId_ve($row->id_ve);
					$veiculo->setPlaca($row->placa);
					$veiculo->setVeiculo($row->veiculo);
					$result[] = $veiculo;
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
				$query = "SELECT * FROM veiculo";
				$con = new Connection();
				$resultSet = Connection::getInstance()->query($query);
				while($row = $resultSet->fetchObject()){
					$veiculo = new Veiculo();
					$veiculo->setId_ve($row->id_ve);
					$veiculo->setPlaca($row->placa);
					$veiculo->setVeiculo($row->veiculo);
					$result[] = $veiculo;
				}
				$con = null;
			}catch(PDOException $e) {
				$result["err"] = $e->getMessage();
			}
			return $result;
		}

		function update($vei) {
			$result = array();
			$id_ve = $vei->getId_ve();
			$placa = $vei->getPlaca();
			$veiculo = $vei->getVeiculo();
			try {
				$query = "UPDATE veiculo SET placa = '$placa', veiculo = '$veiculo' WHERE id_ve = $id_ve";
				$con = new Connection();
				$status = Connection::getInstance()->prepare($query);
				if($status->execute()){
					$result = $vei;
				} else {
					$result["erro"] = "Não foi possível atualizar os dados!";
				}
				$con = null;
			}catch(PDOException $e) {
				$result["err"] = $e->getMessage();
			}
			return $result;
		}

		function delete($id_ve) {
			$result = array();
			try {
				$query = "DELETE FROM veiculo WHERE id_ve = $id_ve";
				$con = new Connection();
				if(Connection::getInstance()->exec($query) >= 1){
					$result["msg"] = "Veiculo removido com sucesso! ";
				}else {
					$result["erro"] = "Veiculo não removido!";
				}
				$con = null;
			}catch(PDOException $e) {
				$result["err"] = $e->getMessage();
			}
			return $result;
		}
	}
