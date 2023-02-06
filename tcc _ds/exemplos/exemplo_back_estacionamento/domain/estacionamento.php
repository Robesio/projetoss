<?php

	include 'veiculo.php';

	class Estacionamento {
		var $id_es;
		var $id_ve;
		var $data;
		var $hora_e;
		var $hora_s;
		var $valor;
		var $veiculo;
		var $hora_dif;

		function getId_es(){
			return $this->id_es;
		}
		function setId_es($id_es){
			$this->id_es = $id_es;
		}

		function getId_ve(){
			return $this->id_ve;
		}
		function setId_ve($id_ve){
			$this->id_ve = $id_ve;
		}

		function getData(){
			return $this->data;
		}
		function setData($data){
			$this->data = $data;
		}

		function getHora_e(){
			return $this->hora_e;
		}
		function setHora_e($hora_e){
			$this->hora_e = $hora_e;
		}

		function getHora_s(){
			return $this->hora_s;
		}
		function setHora_s($hora_s){
			$this->hora_s = $hora_s;
		}

		function getValor(){
			return $this->valor;
		}
		function setValor($valor){
			$this->valor = $valor;
		}

		
		function getVeiculo(){
			return $this->veiculo;
		}
		function setVeiculo($veiculo){
			$this->veiculo = $veiculo;
		}

		function getHora_dif(){
			return $this->hora_dif;
		}
		function setHora_dif($hora_dif){
			$this->hora_dif = $hora_dif;
		}
	}

	class EstacionamentoDAO {
		function create($estacionamento) {
			$result = array();
			$id_ve = $estacionamento->getId_ve();
			//$data = $estacionamento->getData();
			//$hora_e = $estacionamento->getHora_e();
			$hora_s = $estacionamento->getHora_s();
			$valor = $estacionamento->getValor();
			try {
				$query = "INSERT INTO vaga_estaci VALUES (default, $id_ve, curdate(), CURTIME(),'$hora_s','$valor')";
				$con = new Connection();
				if(Connection::getInstance()->exec($query) >= 1){
					$result = $estacionamento;
				} else {
					$result["erro"] = "Erro ao salvar!";
				}
				$con = null;
			}catch(PDOException $e) {
				$result["err"] = $e->getMessage();
			}
			return $result;
		}
		
		function readView() {
			$result = array();
			try {
				$query = "SELECT * FROM vw_funcionario";
				$con = new Connection();
				$resultSet = Connection::getInstance()->query($query);
				while($row = $resultSet->fetchObject()){
					$estacionamento = new Estacionamento();
					$veiculo = new Veiculo();
					$veiculo->setId_ve($row->id_ve);
					$veiculo->setPlaca($row->placa);
					$veiculo->setVeiculo($row->veiculo);
					$estacionamento->setVeiculo($veiculo);
					$estacionamento->setHora_dif($row->hora_dif);
					$estacionamento->setId_es($row->id_es);
					$estacionamento->setId_ve($row->id_ve);
					$estacionamento->setData($row->data);
					$estacionamento->setHora_e($row->hora_e);
					$estacionamento->setHora_s($row->hora_s);
					$estacionamento->setValor($row->valor_total);
					$result[] = $estacionamento;
				}
				$con = null;
			}catch(PDOException $e) {
				$result["err"] = $e->getMessage();
			}
			return $result;
		}

		function update($estaci) {
			$result = array();
			$id_es = $estaci->getId_es();
			$data = $estaci->getData();
			$hora_e = $estaci->getHora_e();
			$hora_s = $estaci->getHora_s();
			$valor = $estaci->getValor();
			try {
				$query = "UPDATE vaga_estaci SET data = '$data', hora_e = '$hora_e', hora_s = '$hora_s', valor = '$valor' WHERE id_es = $id_es";
				$con = new Connection();
				$status = Connection::getInstance()->prepare($query);
				if($status->execute()){
					$result = $estaci;
 				} else {
					 $result["erro"] = $query;
				 }
				 $con = null;
			}catch(PDOException $e) {
				$result["err"] = $e->getMessage();
			}
			return $result;
		}

		function delete($id_es) {
			$result = array();
			try {
				$query = "DELETE FROM vaga_estaci WHERE id_es = $id_es";
				$con = new Connection();
				if(Connection::getInstance()->exec($query) >= 1){
					$result["msg"] = "Vaga disponível! ";
				} else {
					$result["erro"] = "Vaga oculpada!";
				}
			}catch(PDOException $e) {
				$result["err"] = $e->getMessage();
			}
			return $result;
		}
	}
