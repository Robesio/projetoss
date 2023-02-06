<?php

	class Tbpedido {
		var $idpedido;
		var $id_ca;
		var $idali;
		var $nomecli;
		var $fonecli;
		var $ruacli;
		var $numerocli;
		var $bairrocli;
		var $datahora;
		var $idstatus;
		var $qtdcli;

		function getQtdcli(){
			return $this->qtdcli;
		}
		function setQtdcli($qtdcli){
			$this->qtdcli = $qtdcli;
		}

		function getIdpedido(){
			return $this->idpedido;
		}
		function setIdpedido($idpedido){
			$this->idpedido = $idpedido;
		}

		function getId_ca(){
			return $this->id_ca;
		}
		function setId_ca($id_ca){
			$this->id_ca = $id_ca;
		}

		function getIdali(){
			return $this->idali;
		}
		function setIdali($idali){
			$this->idali = $idali;
		}

		function getNomecli(){
			return $this->nomecli;
		}
		function setNomecli($nomecli){
			$this->nomecli = $nomecli;
		}

		function getFonecli(){
			return $this->fonecli;
		}
		function setFonecli($fonecli){
			$this->fonecli = $fonecli;
		}

		function getRuacli(){
			return $this->ruacli;
		}
		function setRuacli($ruacli){
			$this->ruacli = $ruacli;
		}

		function getNumerocli(){
			return $this->numerocli;
		}
		function setNumerocli($numerocli){
			$this->numerocli = $numerocli;
		}

		function getBairrocli(){
			return $this->bairrocli;
		}
		function setBairrocli($bairrocli){
			$this->bairrocli = $bairrocli;
		}

		function getDatahora(){
			return $this->datahora;
		}
		function setDatahora($datahora){
			$this->datahora = $datahora;
		}

		function getIdstatus(){
			return $this->idstatus;
		}
		function setIdstatus($idstatus){
			$this->idstatus = $idstatus;
		}
	}

	class TbpedidoDAO {
		function create($tbpedido) {
			$result = array();
			$id_ca = $tbpedido->getId_ca();
			$nomecli = $tbpedido->getNomecli();
			$fonecli = $tbpedido->getFonecli();
			$ruacli = $tbpedido->getRuacli();
			$numerocli = $tbpedido->getNumerocli();
			$bairrocli = $tbpedido->getBairrocli();
			$idstatus = $tbpedido->getIdstatus();
	
			try {
				$query = "INSERT INTO tbpedido VALUES(default, $id_ca,'$nomecli', '$fonecli', '$ruacli', '$numerocli', '$bairrocli', CURRENT_TIMESTAMP(), $idstatus)";
								
				$con = new Connection();				
				if(Connection::getInstance()->exec($query) >= 1){
					$result = $tbpedido;
				} else {
					$result["erro"] = "Não foi possível add um novo pedido";
				}
				$con = null;
			}catch(PDOException $e) {
				$result["err"] = $e->getMessage();
			}
			return $result;
		}
        
		function read($id_ca) {		
			$result = array();

			try {
				$query = "SELECT * FROM vw_pedidos WHERE id_ca = $id_ca";

				$con = new Connection();
				$resultSet = Connection::getInstance()->query($query);
				while($row = $resultSet->fetchObject()){
					$tbpedido = new Tbpedido();
					$tbpedido->setIdpedido($row->idpedido);
					$tbpedido->setId_ca($row->id_ca);
					$tbpedido->setIdali($row->idali);
					$tbpedido->setNomecli($row->nomecli);
					$tbpedido->setFonecli($row->fonecli);
					$tbpedido->setRuacli($row->ruacli);
					$tbpedido->setNumerocli($row->numerocli);
					$tbpedido->setBairrocli($row->bairrocli);
					$tbpedido->setDatahora($row->datahora);
					$tbpedido->setIdstatus($row->idstatus);
					$tbpedido->setQtdcli($row->qtdcli);	
					$result[] = $tbpedido;
				}
				$con = null;
			}catch(PDOException $e) {
				$result["err"] = $e->getMessage();
			}			
			return $result;			
		}
        /*
		function readAll() {
			$result = array();
			try {
				$query = "SELECT * FROM vw_pedidos";
				var_dump($query);
				$con = new Connection();
				$resultSet = Connection::getInstance()->query($query);

				while($row = $resultSet->fetchObject()){
					$tbpedido = new Tbpedido();
					$tbpedido->setIdpedido($row->idpedido);
					$tbpedido->setId_ca($row->id_ca);
					$tbpedido->setNomecli($row->nomecli);
					$tbpedido->setFonecli($row->fonecli);
					$tbpedido->setRuacli($row->ruacli);
					$tbpedido->setNumerocli($row->numerocli);
					$tbpedido->setBairrocli($row->bairrocli);
					$tbpedido->setDatahora($row->datahora);
					$tbpedido->setIdstatus($row->idstatus);	
					$tbpedido->setQtdcli($row->qtdcli);	
					$result[] = $tbpedido;
				}

				$con = null;
			}catch(PDOException $e) {
				$result["err"] = $e->getMessage();
			}
			return $result;
		}*/
		
		function update($ped) {
			
			$result = array();
			$idpedido = $ped->getIdpedido();
			$id_ca = $ped->getId_ca();
			$nomecli = $ped->getNomecli();
			$fonecli = $ped->getFonecli();
			$ruacli = $ped->getRuacli();
			$numerocli = $ped->getNumerocli();
			$bairrocli = $ped->getBairrocli();
			$datahora = $ped->getDatahora();
			$idstatus = $ped->getIdstatus();
			try {
				$query = "UPDATE tbpedido SET id_ca = '$id_ca', nomecli = '$nomecli', fonecli = '$fonecli', ruacli = '$ruacli', numerocli = '$numerocli', bairrocli = '$bairrocli', datahora = '$datahora', idstatus = '$idstatus' WHERE idpedido = $idpedido";
				$con = new Connection();
				$status = Connection::getInstance()->prepare($query);
				if($status->execute()){
					$result = $ped; 
				}else {
					$result["erro"] = "Não foi possível atualizar os dados!"; 
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
				$query = "DELETE FROM tbpedido WHERE idpedido = $idpedido";

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
