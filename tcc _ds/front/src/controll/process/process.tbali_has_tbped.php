<?php

	require("../../domain/connection.php");
	require("../../domain/tbali_has_tbped.php");

	class Tbali_has_tbpedProcess {
		var $td;

		function doGet($arr){
			$td = new Tbali_has_tbpedDAO();
			if ($arr["idpedido"] == "0") {
				$sucess = $td->readAll();
			} else {
				$sucess = $td->read($arr["idpedido"]);
			}
			http_response_code(200);
			echo json_encode($sucess);
		}


		function doPost($arr){
			$td = new Tbali_has_tbpedDAO();
			$inter = new Tbali_has_tbped();
			$inter->setIdali($arr["idali"]);
			$inter->setIdpedido($arr["idpedido"]);
			$inter->setQtdcli($arr["qtdcli"]);
			$sucess = $td->create($inter);
			http_response_code(200);
			echo json_encode($sucess);
		}


		function doPut($arr){
			$td = new Tbali_has_tbpedDAO();
			$inter = new Tbali_has_tbped();
			$inter->setIdali($arr["idali"]);
			$inter->setIdpedido($arr["idpedido"]);
			$inter->setQtdcli($arr["qtdcli"]);
			$sucess = $td->update($inter);
			http_response_code(200);
			echo json_encode($sucess);
		}


		function doDelete($arr){
			$td = new Tbali_has_tbpedDAO();
			$sucess = $td->delete($arr["idpedido"]);
			http_response_code(200);
			echo json_encode($sucess);
		}
	}