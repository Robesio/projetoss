<?php

	require("../../domain/connection.php");
	require("../../domain/tblogins.php");

	class TbloginsProcess {
		var $td;

		function doGet($arr){
			$td = new TbloginsDAO();
			$result = "use to result to DAO";
			http_response_code(200);
			echo json_encode($result);
		}


		function doPost($arr){
			if(
				isset($arr["email"]) &&
				isset($arr["senha"])
			) {
				$login = new Tblogins();

				$login->setEmail($arr["email"]);
				$login->setSenha($arr["senha"]);

				$td = new TbloginsDAO();

				$result = $td->read($login);
			}else {
				$result["error"] = "aqui";
			}
			http_response_code(200);
			echo json_encode($result);
		}


		function doPut($arr){
			$td = new TbloginsDAO();
			$result = "use to result to DAO";
			http_response_code(200);
			echo json_encode($result);
		}


		function doDelete($arr){
			$td = new TbloginsDAO();
			$result = "use to result to DAO";
			http_response_code(200);
			echo json_encode($result);
		}
	}