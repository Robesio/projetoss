package controll;

import java.util.ArrayList;

import model.Conta;
import model.dao.ContaDAO;

public class ProcessaContas {

	private static ContaDAO cd = new ContaDAO();
	private static ArrayList<Conta> contas = cd.abrir();

	public static ArrayList<Conta> getContas() { //Abrir os arquivo da classe DAO
		return contas;
	}

	public static void setContas(ArrayList<Conta> contas) { //Salvar os arquivos da classe DAO
		ProcessaContas.contas = contas;
		cd.salvar(contas);
	}

	public static int getAutoCodConta() {
		if (ProcessaContas.contas.isEmpty()) {
			return 1;
		} else {
			return ProcessaContas.contas.get(ProcessaContas.contas.size() - 1).getCodConta() + 1; //Sempre que cadastrada uma nova vai ser um número a mais relacionado ao arquivo já cadastrado
		}
	}

	public static Conta getConta(int codigo) {
		Conta c = new Conta();
		c.setCodConta(codigo);
		if (contas.contains(c)) {
			return contas.get(contas.indexOf(c));
		}
		return null;
	}
}
