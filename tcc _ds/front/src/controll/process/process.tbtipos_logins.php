<?php

	require("../../domain/connection.php");
	require("../../domain/tbtipos_logins.php");

	class Tbtipos_loginsProcess {
		var $td;

		function doGet($arr){
			$td = new Tbtipos_loginsDAO();
			if ($arr["idti_lo"] == "0") {
				$result = $td->readAll();
			} else {
				$result = $td->read($arr["idti_lo"]);
			}
		//	$result = "use to result to DAO";
			http_response_code(200);
			echo json_encode($result);
		}


		function doPost($arr){
			$td = new Tbtipos_loginsDAO();
			$tbtipos_logins = new Tbtipos_logins();
			$tbtipos_logins->setTipo($arr["tipo"]);
			$result = $td->create($tbtipos_logins);
		//	$result = "use to result to DAO";
			http_response_code(200);
			echo json_encode($result);
		}


		function doPut($arr){
			$td = new Tbtipos_loginsDAO();
			$tbtipos_logins = new Tbtipos_logins();
			$tbtipos_logins->setIdti_lo($arr["idti_lo"]);
			$tbtipos_logins->setTipo($arr["tipo"]);
			$result = $td->update($tbtipos_logins);
			http_response_code(200);
			echo json_encode($result);
		}


		function doDelete($arr){
			$td = new Tbtipos_loginsDAO();
			$result = $td->delete($arr["idti_lo"]);
			http_response_code(200);
			echo json_encode($result);
		}
	}