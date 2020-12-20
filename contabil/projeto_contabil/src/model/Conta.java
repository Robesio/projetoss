package model;

public class Conta {

	private int codConta;
	private String tipo, categoria, descricao;

	public Conta() { //Método vazio 

	}

	public Conta(int codConta) { //Método para chama o codConta
		this.codConta = codConta;
	}

	//GETS/SETS
	public int getCodConta() {
		return codConta;
	}

	public void setCodConta(int codConta) {
		this.codConta = codConta;
	}

	public String getTipo() {
		return tipo;
	}

	public void setTipo(String tipo) {
		this.tipo = tipo;
	}

	public String getCategoria() {
		return categoria;
	}

	public void setCategoria(String categoria) {
		this.categoria = categoria;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	@Override
	public String toString() { //Pega todos os objetos, gera automático
		return "  " + codConta + "\t\t" + tipo + "\t\t" + descricao;
	}

	public String toCSV() { //Arquivos csv
		return codConta + ";" + tipo + ";" + categoria + ";" + descricao + "\r\n";
	}

	public String cabecalho() { //Método para criar uma legenda para tela
		return "Cód     Tipo                          Categoria                 Descrição";
	}

	public String[] getStringVetor() { //Método para passa os valores para as classes Fomr
		return new String[] { codConta + "", tipo, categoria, descricao };
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + codConta;
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Conta other = (Conta) obj;
		if (codConta != other.codConta)
			return false;
		return true;
	}
}