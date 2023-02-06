<?php

	require("../../domain/connection.php");
	require("../../domain/tbalimentos.php");

	class TbalimentosProcess {
		var $td;

		function doGet($arr){
			$td = new TbalimentosDAO();
			if ($arr["id_ca"] == "") {
				$sucess = $td->readAll();
			} else {
				$sucess = $td->read($arr["id_ca"]);
			}
			http_response_code(200);
			echo json_encode($sucess);
		}


		function doPost($arr){
			$td = new TbalimentosDAO();
			$tbalim = new Tbalimentos();
			//$tbalim->setIdali($arr["idali"]);
			$tbalim->setId_ca($arr["id_ca"]);
			$tbalim->setNomeali($arr["nomeali"]);
			$tbalim->setDescricao($arr["descricao"]);
			$tbalim->setQtd($arr["qtd"]);
			$tbalim->setPreco($arr["preco"]);
			$tbalim->setImg($arr["img"]);
			$sucess = $td->create($tbalim);
			http_response_code(200);
			echo json_encode($sucess);
		}


		function doPut($arr){
			$td = new TbalimentosDAO();
			$tbali = new Tbalimentos();
			$tbali->setIdali($arr["idali"]);
			$tbali->setId_ca($arr["id_ca"]);
			$tbali->setNomeali($arr["nomeali"]);
			$tbali->setDescricao($arr["descricao"]);
			$tbali->setQtd($arr["qtd"]);
			$tbali->setPreco($arr["preco"]);
			$tbali->setImg($arr["img"]);
			$sucess = $td->update($tbali);
			http_response_code(200);
			echo json_encode($sucess);
		}


		function doDelete($arr){
			$td = new TbalimentosDAO();
			$sucess = $td->delete($arr["idali"]);
			http_response_code(200);
			echo json_encode($sucess);
		}
	}