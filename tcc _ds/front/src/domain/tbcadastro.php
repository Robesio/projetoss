<?php
//include 'tbtipos_logins';

	class Tbcadastro {
		var $id_ca;
		var $nome;
		var $cpf;
		var $fone;
		var $bairro;
		var $rua;
		var $numero;
		var $cidade;
		var $uf;
		var $cnpj;
		var $linksite;
		var $email;
		var $senha;
		var $idti_lo;
		//var $nomestatus;

		function getId_ca(){
			return $this->id_ca;
		}
		function setId_ca($id_ca){
			$this->id_ca = $id_ca;
		}

		function getNome(){
			return $this->nome;
		}
		function setNome($nome){
			$this->nome = $nome;
		}

		function getCpf(){
			return $this->cpf;
		}
		function setCpf($cpf){
			$this->cpf = $cpf;
		}

		function getFone(){
			return $this->fone;
		}
		function setFone($fone){
			$this->fone = $fone;
		}

		function getBairro(){
			return $this->bairro;
		}
		function setBairro($bairro){
			$this->bairro = $bairro;
		}

		function getRua(){
			return $this->rua;
		}
		function setRua($rua){
			$this->rua = $rua;
		}

		function getNumero(){
			return $this->numero;
		}
		function setNumero($numero){
			$this->numero = $numero;
		}

		function getCidade(){
			return $this->cidade;
		}
		function setCidade($cidade){
			$this->cidade = $cidade;
		}

		function getUf(){
			return $this->uf;
		}
		function setUf($uf){
			$this->uf = $uf;
		}

		function getCnpj(){
			return $this->cnpj;
		}
		function setCnpj($cnpj){
			$this->cnpj = $cnpj;
		}

		function getLinksite(){
			return $this->linksite;
		}
		function setLinksite($linksite){
			$this->linksite = $linksite;
		}

		function getEmail(){
			return $this->email;
		}
		function setEmail($email){
			$this->email = $email;
		}

		function getIdti_lo(){
			return $this->idti_lo;
		}
		function setIdti_lo($idti_lo){
			$this->idti_lo = $idti_lo;
		}

		function getSenha(){
			return $this->senha;
		}
		function setSenha($senha){
			$this->senha = $senha;
		}
	}

	class TbcadastroDAO {
		function create($tbcadastro) {
			$result = array();
			//$id_ca = $tbcadastro->getId_ca();
			$nome = $tbcadastro->getNome();
			$cpf = $tbcadastro->getCpf();
			$fone = $tbcadastro->getFone();
			$bairro = $tbcadastro->getBairro();
			$rua = $tbcadastro->getRua();
			$numero = $tbcadastro->getNumero();
			$cidade = $tbcadastro->getCidade();
			$uf = $tbcadastro->getUf();
			$cnpj = $tbcadastro->getCnpj();
			$linksite = $tbcadastro->getLinksite();
			$email = $tbcadastro->getEmail();
			$idti_lo = $tbcadastro->getIdti_lo();
			$senha = $tbcadastro->getSenha();
			
			try {
				$query = "INSERT INTO tbcadastro (nome, cpf, fone, bairro, rua, numero, cidade, uf, cnpj, linksite, email) VALUES".
				"('$nome', '$cpf', '$fone', '$bairro', '$rua', '$numero', '$cidade', '$uf', '$cnpj', '$linksite', '$email')";
			
				$con = new Connection();
			
				if(Connection::getInstance()->exec($query) >= 1){					
					$id_ca = Connection::getInstance()->lastInsertId();

					$query = "INSERT INTO tblogins (id_ca, idti_lo, senha) VALUES($id_ca, $idti_lo, '$senha')";
				
					if(Connection::getInstance()->exec($query) >= 1){
						$tbcadastro->setId_ca($id_ca);

						$result = $tbcadastro;
					} else {
						$result["erro"] = "Erro ao salvar!";
					}	
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
				$query = "SELECT * FROM vw_usuario";
				//$query = "SELECT * FROM tbcadastro";

				$con = new Connection();
				$resultSet = Connection::getInstance()->query($query);

				while($row = $resultSet->fetchObject()){
					$cadastro = new Tbcadastro();
					$cadastro->setId_ca($row->id_ca);
					$cadastro->setNome($row->nome);
					$cadastro->setCpf($row->cpf);
					$cadastro->setFone($row->fone);
					$cadastro->setBairro($row->bairro);
					$cadastro->setRua($row->rua);
					$cadastro->setNumero($row->numero);
					$cadastro->setCidade($row->cidade);
					$cadastro->setUf($row->uf);
					$cadastro->setCnpj($row->cnpj);
					$cadastro->setLinksite($row->linksite);
					$cadastro->setEmail($row->email);
					$cadastro->setIdti_lo($row->idti_lo);
					$cadastro->setSenha($row->senha);
					$result[] = $cadastro;
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
				if($id_ca == 0) {
					$cond = "";
				}else {
					$cond = " WHERE id_ca = $id_ca";
				}
				$query = "SELECT * FROM vw_usuario" . $cond;
				//$query = "SELECT * FROM tbcadastro" . $cond;

				$con = new Connection();
				$resultSet = Connection::getInstance()->query($query);
				while($row = $resultSet->fetchObject()){
					$result[] = $row;
				}
				$con = null;
			}catch(PDOException $e) {
				$result["status"] = "PDO".$e->getCode();
			}
			return $result;
		}

		/*function read($id_ca) {
			$result = array();

			try {
				$query = "SELECT * FROM tbcadastro WHERE id_ca = $id_ca";

				$con = new Connection();
				$resultSet = Connection::getInstance()->query($query);

				while($row = $resultSet->fetchObject()){
					$cadastro = new Tbcadastro();
					$cadastro->setId_ca($row->id_ca);
					$cadastro->setNome($row->nome);
					$cadastro->setCpf($row->cpf);
					$cadastro->setFone($row->fone);
					$cadastro->setBairro($row->bairro);
					$cadastro->setRua($row->rua);
					$cadastro->setNumero($row->numero);
					$cadastro->setCidade($row->cidade);
					$cadastro->setUf($row->uf);
					$cadastro->setCnpj($row->cnpj);
					$cadastro->setLinksite($row->linksite);
					$cadastro->setEmail($row->email);
					$cadastro->setSenha($row->senha);
					$result[] = $cadastro;
				}

				$con = null;
			}catch(PDOException $e) {
				$result["err"] = $e->getMessage();
			}
			return $result;
		}*/

		function update($cadastro) {
			$result = array();
			$id_ca = $cadastro->getId_ca();
			$nome = $cadastro->getNome();
			$cpf = $cadastro->getCpf();
			$fone = $cadastro->getFone();
			$bairro = $cadastro->getBairro();
			$rua = $cadastro->getRua();
			$numero = $cadastro->getNumero();
			$cidade = $cadastro->getCidade();
			$uf = $cadastro->getUf();
			$cnpj = $cadastro->getCnpj();
			$linksite = $cadastro->getLinksite();
			$email = $cadastro->getEmail();
			$idti_lo = $cadastro->getIdti_lo();
			$senha = $cadastro->getSenha();

			try {
				$query = "UPDATE tbcadastro SET nome = '$nome', cpf = '$cpf', fone = '$fone', bairro = '$bairro', rua = '$rua', numero = '$numero', 
				cidade = '$cidade', uf = '$uf', cnpj = '$cnpj', linksite = '$linksite', email = '$email' WHERE id_ca = $id_ca";

				$con = new Connection();
				$status = Connection::getInstance()->prepare($query);
		
				if($status->execute()){
					$query = "UPDATE tblogins SET idti_lo = $idti_lo, senha = '$senha' WHERE id_ca = $id_ca";
					
					$status = Connection::getInstance()->prepare($query);
				if($status->execute()){
					$result = $cadastro;
				}else{
					$result["erro"] = "Não sei";
				}	
			}
				$con = null;
			}catch(PDOException $e) {
				$result["err"] = $e->getMessage();
			}
			return $result;
		}

		function delete($id_ca) {
			$result = array();

			try {
				$query = "DELETE FROM tbcadastro WHERE id_ca = $id_ca";

				$con = new Connection();
				if(Connection::getInstance()->exec($query) >= 1){
					$result["msg"] = "Usuário deletado com sucesso!";
				}else{
					$result["erro"] = "Error ao deletar usuário!";
				}	

				$con = null;
			}catch(PDOException $e) {
				$result["err"] = $e->getMessage();
			}

			return $result;
		}
	}
