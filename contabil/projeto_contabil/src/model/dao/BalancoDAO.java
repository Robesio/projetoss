package model.dao;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;

public class BalancoDAO {

	private BufferedWriter bw;

	public boolean saveReport(String dados, String arquivo) { //Método para salvar os dados
		boolean retorno = false;
		try {
			bw = new BufferedWriter(new FileWriter(arquivo));
			bw.write(dados);
			bw.close();
		} catch (IOException e) {
			System.out.println("Erro. " + e);
		} finally {
			retorno = true;
		}
		return retorno;
	}
}
