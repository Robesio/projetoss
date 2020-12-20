package model.dao;

import java.io.BufferedReader;

import java.io.BufferedWriter;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;

import model.Conta;
import model.Empresa;
import model.Lancamento;

public class LancamentoDAO {

	private Lancamento lancamento;
	private BufferedReader br;
	private BufferedWriter bw;
	private String arquivo = ".\\bd\\lancamentos.csv";
	private String[] campos;

	public boolean salvar(ArrayList<Lancamento> lancamentos) {
		boolean retorno = false;

		try {
			bw = new BufferedWriter(new FileWriter(arquivo, false));
			for (Lancamento l : lancamentos) {
				bw.write(l.toCSV());
			}
			bw.close();
			retorno = true;
		} catch (IOException e) {
			System.out.println("Erro ao salvar " + e);
		}
		return retorno;
	}

	public ArrayList<Lancamento> abrir() {
		ArrayList<Lancamento> lancamentos = new ArrayList<>();

		try {
			br = new BufferedReader(new FileReader(arquivo));
			String linha = br.readLine();

			while (linha != null) {
				campos = linha.split(";");
				lancamento = new Lancamento();
				lancamento.setData(campos[0]);
				lancamento.setEmpresa(new Empresa(Integer.parseInt(campos[1])));
				lancamento.setConta(new Conta(Integer.parseInt(campos[2])));
				lancamento.setValor(Double.parseDouble(campos[3]));
				lancamentos.add(lancamento);

				linha = br.readLine();
			}
			br.close();
		} catch (FileNotFoundException e) {
			System.out.println("O arquivo não foi encontrado.");
		} catch (IOException e) {
			System.out.println("Arquivo conrrompido.");
		}
		return lancamentos;
	}
}

/*
 * alterar a classe especifica no pacote controll, Antes: private static
 * ArrayList<Lancamento> lancamentos = new ArryList<>(); private static
 * LancamentoDAO ld = new LancamentoDAO(); depois: 1º private static
 * LancamentoDAO ld = new LancamentoDAO(); 2º private static
 * ArrayList<Lancamento> lancamentos = ld.abrir(); enseguida renomear os métodos
 * get e set, nas classes DAO: exemplo; setLancamento(); por / salvar(); e o
 * getLancamento(); por / abrir();
 */