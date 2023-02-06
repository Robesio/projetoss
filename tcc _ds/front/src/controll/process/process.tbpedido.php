<?php

	require("../../domain/connection.php");
	require("../../domain/tbpedido.php");

	class TbpedidoProcess {
		var $td;

		function doGet($arr){
			$td = new TbpedidoDAO();
			if ($arr["id_ca"] == "0") {
				$result = $td->readAll();
			} else {
				$result = $td->read($arr["id_ca"]);
			}
			http_response_code(200);
			echo json_encode($result);
		}


		function doPost($arr){
			$td = new TbpedidoDAO();
			$tbpedido = new Tbpedido();
			$tbpedido->setId_ca($arr["id_ca"]);
		    $tbpedido->setNomecli($arr["nomecli"]);
		    $tbpedido->setFonecli($arr["fonecli"]);
		    $tbpedido->setRuacli($arr["ruacli"]);
		    $tbpedido->setNumerocli($arr["numerocli"]);
		    $tbpedido->setBairrocli($arr["bairrocli"]);
		    $tbpedido->setIdstatus($arr["idstatus"]);
			$result = $td->create($tbpedido);
			http_response_code(200);
			echo json_encode($result);
		}


		function doPut($arr){
			$td = new TbpedidoDAO();
			$tbpedido = new Tbpedido();
			$tbpedido->setIdpedido($arr["idpedido"]);
			$tbpedido->setId_ca($arr["id_ca"]);
		    $tbpedido->setNomecli($arr["nomecli"]);
		    $tbpedido->setFonecli($arr["fonecli"]);
		    $tbpedido->setRuacli($arr["ruacli"]);
		    $tbpedido->setNumerocli($arr["numerocli"]);
		    $tbpedido->setBairrocli($arr["bairrocli"]);
		    $tbpedido->setDatahora($arr["datahora"]);
		    $tbpedido->setIdstatus($arr["idstatus"]);
			$result = $td->update($tbpedido);
			http_response_code(200);
			echo json_encode($result);
		}


		function doDelete($arr){
			$td = new TbpedidoDAO();
			$result = $td->delete($arr["idpedido"]);
			http_response_code(200);
			echo json_encode($result);
		}
	}