package model;

public class Empresa {

	private String nomeEmpresa;
	private int cod, cnpj;

	public Empresa() {

	}

	public Empresa(int cod) {
		this.cod = cod;
	}

	public String getNomeEmpresa() {
		return nomeEmpresa;
	}

	public void setNomeEmpresa(String nomeEmpresa) {
		this.nomeEmpresa = nomeEmpresa;
	}

	public int getCod() {
		return cod;
	}

	public void setCod(int cod) {
		this.cod = cod;
	}

	public int getCnpj() {
		return cnpj;
	}

	public void setCnpj(int cnpj) {
		this.cnpj = cnpj;
	}

	public String toCSV() {
		return cod + ";" + nomeEmpresa + ";" + cnpj + "\r\n";
	}

	public String[] getStringVetor() {
		return new String[] { "" + cod, "" + nomeEmpresa, "" + cnpj };
	}
	
	public String cabecalho() {
		return "Id        Empresa                                                  Cnpj";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + cod;
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
		Empresa other = (Empresa) obj;
		if (cod != other.cod)
			return false;
		return true;
	}
}
