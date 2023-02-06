<?php

	require("../process/process.estacionamento.php");

	include("configs.php");

	$ep = new EstacionamentoProcess();

	switch($_SERVER['REQUEST_METHOD']) {
		case "GET":
			$ep->doGet($_GET);
			break;

		case "POST":
			$ep->doPost($_POST);
			break;

		case "PUT":
			$ep->doPut($_PUT);
			break;

		case "DELETE":
			$ep->doDelete($_DELETE);
			break;
	}