package model;

public class Lancamento {

	private String data;
	private Conta conta;
	private Empresa empresa;
	private double valor;

	public Lancamento() {

	}

	public Empresa getEmpresa() {
		return empresa;
	}

	public void setEmpresa(Empresa empresa) {
		this.empresa = empresa;
	}

	public Lancamento(double valor) {
		this.valor = valor;
	}

	public String getData() {
		return data;
	}

	public void setData(String data) {
		this.data = data;
	}

	public Conta getConta() {
		return conta;
	}

	public void setConta(Conta conta) {
		this.conta = conta;
	}

	public double getValor() {
		return valor;
	}

	public void setValor(double valor) {
		this.valor = valor;
	}

	@Override
	public String toString() {
		return "Lancamento [data=" + data + ", empresa=" + empresa + ", conta=" + conta + ", valor=" + valor + "]";
	}

	public String toCSV() {
		return data + ";" + empresa.getCod() + ";" + conta.getCodConta() + ";" + valor + "\r\n";
	}

	public String cabecalho() {
		return " Data           Conta         Tipo              Descrição                                                               Empresa                               Valor";
	}

	public String[] getStringVetor() {
		return new String[] { "" + data, "" + empresa.getCod(), "" + conta.getCodConta(), "" + conta.getTipo(),
				"" + conta.getDescricao(), String.format("%.2f", getValor()) };
	}
}
