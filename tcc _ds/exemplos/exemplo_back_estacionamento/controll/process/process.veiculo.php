<?php

	require("../../domain/connection.php");
	require("../../domain/Veiculo.php");

	class VeiculoProcess {
		var $vd;
		function doGet($arr){
			$vd = new VeiculoDAO();
			if ($arr["id_ve"] == "0") {
				$sucess = $vd->readAll();
			} else {
				$sucess = $vd->read($arr["id_ve"]);
			}
			http_response_code(200);
			echo json_encode($sucess);
		}

		function doPost($arr){
			$vd = new VeiculoDAO();
			$veiculo = new Veiculo();
			$veiculo->setPlaca($arr["placa"]);
			$veiculo->setVeiculo($arr["veiculo"]);
			$sucess = $vd->create($veiculo);
			http_response_code(200);
			echo json_encode($sucess);
		}

		function doPut($arr){
			$vd = new VeiculoDAO();
			$veiculo = new Veiculo();
			$veiculo->setId_ve($arr["id_ve"]);
			$veiculo->setPlaca($arr["placa"]);
			$veiculo->setVeiculo($arr["veiculo"]);
			$sucess = $vd->update($veiculo);
			http_response_code(200);
			echo json_encode($sucess);
		}

		function doDelete($arr){
			$vd = new VeiculoDAO();
			$sucess = $vd->delete($arr["id_ve"]);
			http_response_code(200);
			echo json_encode($sucess);
		}
	}