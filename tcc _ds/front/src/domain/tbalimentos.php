<?php

	class Tbalimentos {
		var $idali;
		var $id_ca;
		var $nomeali;
		var $descricao;
		var $qtd;
		var $preco;
		var $img;
		var $email;
		var $idti_lo;
		var $linksite;

		function getLinksite(){
			return $this->linksite;
		}
		function setLinksite($linksite){
			$this->linksite = $linksite;
		}

		function getIdti_lo(){
			return $this->idti_lo;
		}
		function setIdti_lo($idti_lo){
			$this->idti_lo = $idti_lo;
		}

		function getEmail(){
			return $this->email;
		}
		function setEmail($email){
			$this->email = $email;
		}

		function getIdali(){
			return $this->idali;
		}
		function setIdali($idali){
			$this->idali = $idali;
		}

		function getId_ca(){
			return $this->id_ca;
		}
		function setId_ca($id_ca){
			$this->id_ca = $id_ca;
		}

		function getNomeali(){
			return $this->nomeali;
		}
		function setNomeali($nomeali){
			$this->nomeali = $nomeali;
		}

		function getDescricao(){
			return $this->descricao;
		}
		function setDescricao($descricao){
			$this->descricao = $descricao;
		}

		function getQtd(){
			return $this->qtd;
		}
		function setQtd($qtd){
			$this->qtd = $qtd;
		}

		function getPreco(){
			return $this->preco;
		}
		function setPreco($preco){
			$this->preco = $preco;
		}

		function getImg(){
			return $this->img;
		}
		function setImg($img){
			$this->img = $img;
		}
	}

	class TbalimentosDAO {
		function create($tbalimentos) {
			$result = array();
			$id_ca = $tbalimentos->getId_ca();
			$nomeali = $tbalimentos->getNomeali();
			$descricao = $tbalimentos->getDescricao();
			$qtd = $tbalimentos->getQtd();
			$preco = $tbalimentos->getPreco();
			$img = $tbalimentos->getImg();

			try {
				$query = "INSERT INTO tbalimentos VALUES(default, $id_ca, '$nomeali', '$descricao', $qtd, '$preco', '$img')";

				$con = new Connection();
				if(Connection::getInstance()->exec($query) >= 1){
					$result = $tbalimentos;
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
				//$query = "SELECT tbalimentos.idali, id_ca, nomeali, descricao, qtd, preco, img FROM tbalimentos";
				$query = "SELECT tbalimentos.id_ca, idali, nomeali, descricao, qtd, preco, img
				FROM tbalimentos INNER JOIN tbcadastro ON tbalimentos.id_ca = tbcadastro.id_ca
				INNER JOIN tblogins ON tblogins.idti_lo = tblogins.idti_lo
				WHERE tbcadastro.linksite = '$linksite' 
				AND tblogins.idti_lo = 2 AND tbcadastro.id_ca = '$id_ca'";

				$con = new Connection();
				$resultSet = Connection::getInstance()->query($query);
				while($row = $resultSet->fetchObject()){
					$alim = new Tbalimentos();
					$alim->setIdali($row->idali);
					$alim->setId_ca($row->id_ca);
					$alim->setNomeali($row->nomeali);
					$alim->setDescricao($row->descricao);
					$alim->setQtd($row->qtd);
					$alim->setPreco($row->preco);
					$alim->setImg($row->img);
					$result[] = $alim;
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
				$query = "SELECT * FROM tbalimentos WHERE id_ca = $id_ca";

				$con = new Connection();
				$resultSet = Connection::getInstance()->query($query);
				while($row = $resultSet->fetchObject()){
					$alim = new Tbalimentos();
					$alim->setIdali($row->idali);
					$alim->setId_ca($row->id_ca);
					$alim->setNomeali($row->nomeali);
					$alim->setDescricao($row->descricao);
					$alim->setQtd($row->qtd);
					$alim->setPreco($row->preco);
					$alim->setImg($row->img);
					$result[] = $alim;
				}

				$con = null;
			}catch(PDOException $e) {
				$result["err"] = $e->getMessage();
			}
			return $result;
		}

		function update($ali) {
			$result = array();
			$idali = $ali->getIdali();
			$id_ca = $ali->getId_ca();
			$nomeali = $ali->getNomeali();
			$descricao = $ali->getDescricao();
			$qtd = $ali->getQtd();
			$preco = $ali->getPreco();
			$img = $ali->getImg();
			
			try {
				$query = "UPDATE tbalimentos SET nomeali = '$nomeali', descricao = '$descricao', qtd = '$qtd', preco = '$preco', img = '$img' WHERE idali = $idali";

				$con = new Connection();
				$status = Connection::getInstance()->prepare($query);

				if($status->execute()){
					$result = $ali;
				} else {
					$result["erro"] = "Não foi possível atualizar os dados!";
				}
				$con = null;
			}catch(PDOException $e) {
				$result["err"] = $e->getMessage();
			}
			return $result;
		}

		function delete($idali) {
			$result = array();

			try {
				$query = "DELETE FROM tbalimentos WHERE idali = $idali";

				$con = new Connection();
				if(Connection::getInstance()->exec($query) >= 1){
					$result["msg"] = "Alimento removido com sucesso! ";
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
