<?php

	require("../../domain/connection.php");
	require("../../domain/tbstatus.php");

	class TbstatusProcess {
		var $td;

		function doGet($arr){
			$td = new TbstatusDAO();
			if ($arr["idstatus"] == "0") {
				$sucess = $td->readAll();
			} else {
				$sucess = $td->read($arr["idstatus"]);
			}
			http_response_code(200);
			echo json_encode($sucess);
		}


		function doPost($arr){
			$td = new TbstatusDAO();
			$tbstatus = new Tbstatus();
			$tbstatus->setIdstatus($arr["idstatus"]);
			$tbstatus->setNomestatus($arr["nomestatus"]);
			$sucess = $td->create($tbstatus);
			http_response_code(200);
			echo json_encode($sucess);
		}


		function doPut($arr){
			$td = new TbstatusDAO();
			$tbstatus = new Tbstatus();
			$tbstatus->setIdstatus($arr["idstatus"]);
			$tbstatus->setNomestatus($arr["nomestatus"]);
			$sucess = $td->update($tbstatus);
			http_response_code(200);
			echo json_encode($sucess);
		}


		function doDelete($arr){
			$td = new TbstatusDAO();
			$sucess = $td->delete($arr["idstatus"]);
			http_response_code(200);
			echo json_encode($sucess);
		}
	}