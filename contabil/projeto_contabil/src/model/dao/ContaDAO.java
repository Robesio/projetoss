package model.dao;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;

import model.Conta;

public class ContaDAO {

	private Conta conta;
	private BufferedReader br;
	private BufferedWriter bw;
	private String arquivo = ".\\bd\\contas.csv"; //Abrir a pasta bd e o contas.csv
	private String[] campos;

	public boolean salvar(ArrayList<Conta> contas) { //Salvar
		boolean retorno = false;

		try {
			bw = new BufferedWriter(new FileWriter(arquivo, false));
			for (Conta c : contas) {
				bw.write(c.toCSV()); //Salvando os arquivos que o 'toSCV()' direcionou na classa Conta()
			}
			bw.close();
			retorno = true;
		} catch (IOException e) {
			System.out.println("Erro ao salvar " + e);
		}
		return retorno;
	}

	public ArrayList<Conta> abrir() { //Abre todos os arquivos salvos em contas.csv
		ArrayList<Conta> contas = new ArrayList<>();

		try {
			br = new BufferedReader(new FileReader(arquivo));
			String linha = br.readLine();
			while (linha != null) {
				campos = linha.split(";");
				conta = new Conta();
				conta.setCodConta(Integer.parseInt(campos[0])); //Coluna 0 tem o codConta, a nessecidade de transformar para int, 'Integer.parseInt'
				conta.setTipo(campos[1]); //Coluna 1 tem o Tipo
				conta.setCategoria(campos[2]); //Coluna 2 tem a catégoria
				conta.setDescricao(campos[3]); //Coluna 3 tem a descrição
				contas.add(conta);

				linha = br.readLine();
			}
			br.close();
		} catch (FileNotFoundException e) {
			System.out.println("O arquivo não foi encontrado.");
		} catch (IOException e) {
			System.out.println("Arquivo conrompido.");
		}
		return contas;
	}
}
