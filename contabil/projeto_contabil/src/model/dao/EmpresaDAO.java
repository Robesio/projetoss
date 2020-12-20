package model.dao;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;

import model.Empresa;

public class EmpresaDAO {

	private BufferedReader br;
	private BufferedWriter bw;
	private String arquivo = "bd\\empresas.csv";
	private String campos[];
	private Empresa empresa;

	public boolean salvar(ArrayList<Empresa> empresas) {
		boolean retorno = false;
		try {
			bw = new BufferedWriter(new FileWriter(arquivo, false));
			for (Empresa e : empresas) {
				bw.write(e.toCSV());
			}
			bw.close();
			retorno = true;
		} catch (IOException e) {
			System.out.println("Erro ao Salvar" + e);
		}
		return retorno;
	}

	public ArrayList<Empresa> abrir() {
		ArrayList<Empresa> empresas = new ArrayList<>();
		try {
			br = new BufferedReader(new FileReader(arquivo));
			String linha = br.readLine();

			while (linha != null) {
				campos = linha.split(";");
				empresa = new Empresa();
				empresa.setCod(Integer.parseInt(campos[0]));
				empresa.setNomeEmpresa(campos[1]);
				empresa.setCnpj(Integer.parseInt(campos[2]));
				empresas.add(empresa);
				linha = br.readLine();
			}
			br.close();
		} catch (FileNotFoundException e) {
			System.out.println("O arquivo não foi encontrado " + e);
		} catch (IOException e) {
			System.out.println("Arquivo corompido " + e);
		}
		return empresas;
	}
}
