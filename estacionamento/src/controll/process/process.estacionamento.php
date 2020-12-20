<?php

	require("../../domain/connection.php");
	require("../../domain/Estacionamento.php");

	class EstacionamentoProcess {
		var $ed;
		function doGet($arr){
			$ed = new EstacionamentoDAO();
			if ($arr["id_es"] == "0") {
				$sucess = $ed->readView();
			} 
			http_response_code(200);
			echo json_encode($sucess);
		}

		function doPost($arr){
			$ed = new EstacionamentoDAO();
			$estacionamento = new Estacionamento();
			//$estacionamento->setId_es($arr["id_es"]);
			$estacionamento->setId_ve($arr["id_ve"]);
			//$estacionamento->setData($arr["data"]);
			//$estacionamento->setHora_e($arr["hora_e"]);
			$estacionamento->setHora_s($arr["hora_s"]);
			$estacionamento->setValor($arr["valor"]);
			$sucess = $ed->create($estacionamento);
			http_response_code(200);
			echo json_encode($sucess);
		}

		function doPut($arr){
			$ed = new EstacionamentoDAO();
			$estacionamento = new Estacionamento();
			$estacionamento->setId_es($arr["id_es"]);
			$estacionamento->setData($arr["data"]);
			$estacionamento->setHora_e($arr["hora_e"]);
			$estacionamento->setHora_s($arr["hora_s"]);
			$estacionamento->setValor($arr["valor"]);
			$sucess = $ed->update($estacionamento);
			http_response_code(200);
			echo json_encode($sucess);
		}

		function doDelete($arr){
			$ed = new EstacionamentoDAO();
			$sucess = $ed->delete($arr["id_es"]);
			http_response_code(200);
			echo json_encode($sucess);
		}
	}