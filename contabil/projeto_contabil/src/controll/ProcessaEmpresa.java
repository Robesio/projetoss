package controll;

import java.util.ArrayList;

import model.Empresa;
import model.dao.EmpresaDAO;

public class ProcessaEmpresa {

	private static EmpresaDAO ep = new EmpresaDAO();
	private static ArrayList<Empresa> empresas = ep.abrir();

	public static ArrayList<Empresa> getEmpresas() {
		return empresas;
	}

	public static void setEmpresas(ArrayList<Empresa> empresas) {
		ProcessaEmpresa.empresas = empresas;
	}

	public static int getAutoCod() {
		if (ProcessaEmpresa.empresas.isEmpty()) {
			return 1;
		} else {
			return ProcessaEmpresa.empresas.get(ProcessaEmpresa.empresas.size() - 1).getCod() + 1;
		}
	}

	public static Empresa getEmpresa(int cod) {
		Empresa e = new Empresa();
		e.setCod(cod);
		if (empresas.contains(e)) {
			return empresas.get(empresas.indexOf(e));
		}
		return null;
	}
}
