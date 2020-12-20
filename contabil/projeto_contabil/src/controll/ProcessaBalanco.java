package controll;

import javax.swing.JOptionPane;

import model.dao.BalancoDAO;

public class ProcessaBalanco {

	private static BalancoDAO rd = new BalancoDAO();

	public static void setRd(String dados, String arquivo) {
		if (rd.saveReport(dados, arquivo)) { //Pega do método 'saveReport' na classe 'BalaçoDAO'
			JOptionPane.showMessageDialog(null, "Relatório salvo com sucesso");
		} else {
			JOptionPane.showMessageDialog(null, "Erro ao salvar Relatório");
		}
	}
}
