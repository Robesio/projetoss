package controll;

import java.util.ArrayList;
import model.Lancamento;
import model.dao.LancamentoDAO;

public class ProcessaLancamentos {

	private static LancamentoDAO ld = new LancamentoDAO();
	private static ArrayList<Lancamento> lancamentos = ld.abrir();

	public static ArrayList<Lancamento> getLancamentos() {
		for (Lancamento l : lancamentos) {
			l.setConta(ProcessaContas.getConta(l.getConta().getCodConta())); //Abrir o código da conta
		}
		return lancamentos;
	}

	public static void setLancamentos(ArrayList<Lancamento> lancamentos) {
		ProcessaLancamentos.lancamentos = lancamentos;
		ld.salvar(lancamentos);
	}
}
