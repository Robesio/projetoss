<?php

	require("../../domain/connection.php");
	require("../../domain/tbcadastro.php");

	class TbcadastroProcess {
		var $td;

		/*function doGet($arr){
			$td = new TbcadastroDAO();
			if ($arr["id_ca"] == "0") {
				$sucess = $td->readAll();
			}else{
				$sucess = $td->read($arr["id_ca"]);
			}	
			http_response_code(200);
			echo json_encode($sucess);
		}*/

		function doGet($arr){
			if(isset($arr["id_ca"])) {
				$td = new TbcadastroDAO();
				$result = $td->read($arr["id_ca"]);
			}else {
				$result["status"] = "entrou!";
			}			
			http_response_code(200);
			echo json_encode($result);
		}


		function doPost($arr){
			$td = new TbcadastroDAO();
			$cadastro = new Tbcadastro();
			//$cadastro->setId_ca($arr["id_ca"]);
			$cadastro->setNome($arr["nome"]);
			$cadastro->setCpf($arr["cpf"]);
			$cadastro->setFone($arr["fone"]);
			$cadastro->setBairro($arr["bairro"]);
			$cadastro->setRua($arr["rua"]);
			$cadastro->setNumero($arr["numero"]);
			$cadastro->setCidade($arr["cidade"]);
			$cadastro->setUf($arr["uf"]);
			$cadastro->setCnpj($arr["cnpj"]);
			$cadastro->setLinksite($arr["linksite"]);
			$cadastro->setEmail($arr["email"]);
			$cadastro->setIdti_lo($arr["idti_lo"]);
			$cadastro->setSenha($arr["senha"]);
			$sucess = $td->create($cadastro);
			http_response_code(200);
			echo json_encode($sucess);
		}


		function doPut($arr){
			$td = new TbcadastroDAO();
			$cadastro = new Tbcadastro();
			$cadastro->setId_ca($arr["id_ca"]);
			$cadastro->setNome($arr["nome"]);
			$cadastro->setCpf($arr["cpf"]);
			$cadastro->setFone($arr["fone"]);
			$cadastro->setBairro($arr["bairro"]);
			$cadastro->setRua($arr["rua"]);
			$cadastro->setNumero($arr["numero"]);
			$cadastro->setCidade($arr["cidade"]);
			$cadastro->setUf($arr["uf"]);
			$cadastro->setCnpj($arr["cnpj"]);
			$cadastro->setLinksite($arr["linksite"]);
			$cadastro->setEmail($arr["email"]);
			$cadastro->setIdti_lo($arr["idti_lo"]);
			$cadastro->setSenha($arr["senha"]);
			$sucess = $td->update($cadastro);
			http_response_code(200);
			echo json_encode($sucess);
		}


		function doDelete($arr){
			$td = new TbcadastroDAO();
			$sucess = $td->delete($arr["id_ca"]);
			http_response_code(200);
			echo json_encode($sucess);
		}
	}