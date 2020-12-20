package view;

import java.awt.Color;

import java.awt.Font;
import java.awt.event.ActionEvent;

import java.awt.event.ActionListener;
import java.io.File;

import javax.swing.JButton;
import javax.swing.JComboBox;
import javax.swing.JDialog;
import javax.swing.JFileChooser;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTextArea;
import javax.swing.filechooser.FileNameExtensionFilter;

import controll.ProcessaBalanco;
import controll.ProcessaEmpresa;
import controll.ProcessaLancamentos;
import model.Empresa;
import model.Lancamento;

public class BalancoForm extends JDialog implements ActionListener {
	private static final long serialVersionUID = 1L;

	private JPanel panel;
	private JTextArea areaDeTexto; //Area de texto onde será exibido o relatório
	private JLabel lbCodEmpresa; //Legenda 
	private JButton btSalvar, btCancelar, btGeral, btJan, btFev, btMar, btAbr, btMai, btJun, btJul, btAgo, btSet, btOut,
			btNov, btDez; //Botões
	private JScrollPane scroll; //Tabela
	private String dados; //variavél
	private JComboBox<Integer> cbCodEmpresa = new JComboBox<Integer>(); //Campo de escolha, lista os itens

	BalancoForm() {
		//Janela
		setTitle("Balanços");
		setBounds(8, 5, 1350, 690);
		panel = new JPanel();
		setContentPane(panel);
		panel.setBackground(Color.blue);
		setLayout(null);

		lbCodEmpresa = new JLabel("Cod Empresa");
		lbCodEmpresa.setBounds(10, 15, 115, 30);
		lbCodEmpresa.setFont(new Font("SansSerif", Font.BOLD, 16));
		lbCodEmpresa.setForeground(Color.white);
		panel.add(lbCodEmpresa);

		cbCodEmpresa.setBounds(127, 15, 60, 30);
		cbCodEmpresa.setFont(new Font("SansSerif", Font.BOLD, 16)); //Fonte da legenda
		panel.add(cbCodEmpresa);

		for (Empresa e : ProcessaEmpresa.getEmpresas()) { //Pegar o código da empresa
			cbCodEmpresa.addItem(e.getCod());
		}
		areaDeTexto = new JTextArea(dados()); //Método criado após o último botão dez. 'dados()'
		scroll = new JScrollPane(areaDeTexto);
		scroll.setBounds(10, 50, 1315, 560);
		panel.add(scroll);

		//Botões 
		btSalvar = new JButton("Salvar");
		btSalvar.setFont(new Font("Arial", Font.BOLD, 16)); //Fonte
		btSalvar.setBackground(Color.blue); //Cor do background do botão
		btSalvar.setForeground(Color.white); //cor do texto do botão
		btSalvar.setBounds(1223, 614, 100, 30);
		panel.add(btSalvar);
		btSalvar.addActionListener(this); //Permite com que o botão possa receber um evento

		btCancelar = new JButton("Cancelar");
		btCancelar.setFont(new Font("Arial", Font.BOLD, 16));
		btCancelar.setBackground(Color.blue);
		btCancelar.setForeground(Color.white);
		btCancelar.setBounds(1110, 614, 110, 30);
		panel.add(btCancelar);
		btCancelar.addActionListener(this);

		btGeral = new JButton("Geral");
		btGeral.setFont(new Font("Arial", Font.BOLD, 16));
		btGeral.setBackground(Color.blue);
		btGeral.setForeground(Color.white);
		btGeral.setBounds(145, 614, 80, 30);
		panel.add(btGeral);
		btGeral.addActionListener(this);

		btJan = new JButton("Jan");
		btJan.setFont(new Font("Arial", Font.BOLD, 15));
		btJan.setBackground(Color.blue);
		btJan.setForeground(Color.white);
		btJan.setBounds(227, 614, 62, 30);
		panel.add(btJan);
		btJan.addActionListener(this);

		btFev = new JButton("Fev");
		btFev.setFont(new Font("Arial", Font.BOLD, 15));
		btFev.setBackground(Color.blue);
		btFev.setForeground(Color.white);
		btFev.setBounds(291, 614, 62, 30);
		panel.add(btFev);
		btFev.addActionListener(this);

		btMar = new JButton("Mar");
		btMar.setFont(new Font("Arial", Font.BOLD, 15));
		btMar.setBackground(Color.blue);
		btMar.setForeground(Color.white);
		btMar.setBounds(355, 614, 62, 30);
		panel.add(btMar);
		btMar.addActionListener(this);

		btAbr = new JButton("Abr");
		btAbr.setFont(new Font("Arial", Font.BOLD, 15));
		btAbr.setBackground(Color.blue);
		btAbr.setForeground(Color.white);
		btAbr.setBounds(419, 614, 60, 30);
		panel.add(btAbr);
		btAbr.addActionListener(this);

		btMai = new JButton("Mai");
		btMai.setFont(new Font("Arial", Font.BOLD, 15));
		btMai.setBackground(Color.blue);
		btMai.setForeground(Color.white);
		btMai.setBounds(481, 614, 60, 30);
		panel.add(btMai);
		btMai.addActionListener(this);

		btJun = new JButton("Jun");
		btJun.setFont(new Font("Arial", Font.BOLD, 15));
		btJun.setBackground(Color.blue);
		btJun.setForeground(Color.white);
		btJun.setBounds(543, 614, 60, 30);
		panel.add(btJun);
		btJun.addActionListener(this);

		btJul = new JButton("Jul");
		btJul.setFont(new Font("Arial", Font.BOLD, 15));
		btJul.setBackground(Color.blue);
		btJul.setForeground(Color.white);
		btJul.setBounds(605, 614, 60, 30);
		panel.add(btJul);
		btJul.addActionListener(this);

		btAgo = new JButton("Ago");
		btAgo.setFont(new Font("Arial", Font.BOLD, 15));
		btAgo.setBackground(Color.blue);
		btAgo.setForeground(Color.white);
		btAgo.setBounds(667, 614, 61, 30);
		panel.add(btAgo);
		btAgo.addActionListener(this);

		btSet = new JButton("Set");
		btSet.setFont(new Font("Arial", Font.BOLD, 15));
		btSet.setBackground(Color.blue);
		btSet.setForeground(Color.white);
		btSet.setBounds(730, 614, 60, 30);
		panel.add(btSet);
		btSet.addActionListener(this);

		btOut = new JButton("Out");
		btOut.setFont(new Font("Arial", Font.BOLD, 15));
		btOut.setBackground(Color.blue);
		btOut.setForeground(Color.white);
		btOut.setBounds(792, 614, 60, 30);
		panel.add(btOut);
		btOut.addActionListener(this);

		btNov = new JButton("Nov");
		btNov.setFont(new Font("Arial", Font.BOLD, 15));
		btNov.setBackground(Color.blue);
		btNov.setForeground(Color.white);
		btNov.setBounds(854, 614, 63, 30);
		panel.add(btNov);
		btNov.addActionListener(this);

		btDez = new JButton("Dez");
		btDez.setFont(new Font("Arial", Font.BOLD, 15));
		btDez.setBackground(Color.blue);
		btDez.setForeground(Color.white);
		btDez.setBounds(919, 614, 62, 30);
		panel.add(btDez);
		btDez.addActionListener(this);
	}

	public String dados() { // Método para ler todos os dados
		dados = "\n\t\t\t\t\t\tBalanço de Contas\n";
		dados += "  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------\n";
		dados += "       DATA\t|\tEMPRESA\t|\tCONTA\t|\tTIPO\t|\tDESCRIÇÃO\t|\t\t\tVALOR(R$)\n";
		dados += "  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------\n";
		double entrada = 0, saida = 0, saldo = 0;
		for (Lancamento l : ProcessaLancamentos.getLancamentos()) {
			dados += "       " + l.getData() + "\t\t" + l.getEmpresa().getCod() + "\t\t" + l.getConta() + "\t\t\t"
					+ String.format("R$ %.2f", l.getValor()) + "\t\n\n";
			if (l.getConta().getTipo().equals("Débito")) { //Percorre o tipo da conta para ver qual delas e do tipo débito
				saida += l.getValor(); //Saida vai ser débito
			} else { //Se não é crédito
				entrada += l.getValor(); //Entrada vai ser crédito
			}
		}
		saldo = entrada - saida; //Balanço geral dos lançamentos
		dados += "  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------\n";
		dados += "       Entrada = " + String.format("R$ %.2f", entrada) + "\t\t\tSaída = "
				+ String.format("R$ %.2f", saida) + "\t\t\tSaldo = " + String.format("R$ %.2f", saldo) + "\n";
		dados += "  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------\n";
		return dados;
	}

	public String dados(String mes) { // Método para filtrar por mês
		dados = "\n\t\t\t\t\t\tBalanço de Contas\n";
		dados += "  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------\n";
		dados += "       DATA\t|\tEMPRESA\t|\tCONTA\t|\tTIPO\t|\tDESCRIÇÃO\t|\t\t\tVALOR(R$)\n";
		dados += "  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------\n";
		double entrada = 0, saida = 0, saldo = 0;
		for (Lancamento l : ProcessaLancamentos.getLancamentos()) {
			if (l.getData().split("/")[1].contentEquals(mes)) {
				dados += "       " + l.getData() + "\t\t" + l.getEmpresa().getCod() + "\t\t" + l.getConta() + "\t\t\t"
						+ String.format("R$ %.2f", l.getValor()) + "\t\n\n";
				if (l.getConta().getTipo().equals("Débito")) {
					saida += l.getValor();
				} else {
					entrada += l.getValor();
				}
			}
		}

		saldo = entrada - saida;
		dados += "  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------\n";
		dados += "       Entrada = " + String.format("R$ %.2f", entrada) + "\t\t\tSaída = "
				+ String.format("R$ %.2f", saida) + "\t\t\tSaldo = " + String.format("R$ %.2f", saldo) + "\n";
		dados += "  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------\n";
		return dados;
	}

	@Override
	public void actionPerformed(ActionEvent e) {
		if (btSalvar == e.getSource()) { //'getSource()' mostrao conteúdo
			JFileChooser fc = new JFileChooser();
			FileNameExtensionFilter filter = new FileNameExtensionFilter("selecione apenas TXT", "txtx");
			fc.setFileFilter(filter);
			if (fc.showSaveDialog(this) != 1) {
				File arquivo = fc.getSelectedFile();
				if (arquivo.getPath().endsWith(".txt")) {
					ProcessaBalanco.setRd(dados, arquivo.getPath());
				} else {
					ProcessaBalanco.setRd(dados, arquivo.getPath() + ".txt");
				}
				dispose();
			}
		} else if (btJan == e.getSource()) { // Ação dos botões mês
			areaDeTexto.setText(dados("01"));
		} else if (btFev == e.getSource()) {
			areaDeTexto.setText(dados("02"));
		} else if (btMar == e.getSource()) {
			areaDeTexto.setText(dados("03"));
		} else if (btAbr == e.getSource()) {
			areaDeTexto.setText(dados("04"));
		} else if (btMai == e.getSource()) {
			areaDeTexto.setText(dados("05"));
		} else if (btJun == e.getSource()) {
			areaDeTexto.setText(dados("06"));
		} else if (btJul == e.getSource()) {
			areaDeTexto.setText(dados("07"));
		} else if (btAgo == e.getSource()) {
			areaDeTexto.setText(dados("08"));
		} else if (btSet == e.getSource()) {
			areaDeTexto.setText(dados("09"));
		} else if (btOut == e.getSource()) {
			areaDeTexto.setText(dados("10"));
		} else if (btNov == e.getSource()) {
			areaDeTexto.setText(dados("11"));
		} else if (btDez == e.getSource()) {
			areaDeTexto.setText(dados("12"));
		} else if (e.getSource() == btCancelar) {
			dispose();
		} else if (btGeral == e.getSource()) {
			areaDeTexto.setText(dados());
		} else if (cbCodEmpresa == e.getSource()) {
			areaDeTexto.setText(dados);
		}
	}
}
