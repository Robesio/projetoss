package view;

import java.awt.Color;
import java.awt.Font;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import javax.swing.JButton;
import javax.swing.JComboBox;
import javax.swing.JDialog;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTable;
import javax.swing.JTextField;
import javax.swing.table.DefaultTableModel;

import controll.ProcessaContas;
import controll.ProcessaEmpresa;
import controll.ProcessaLancamentos;
import model.Conta;
import model.Empresa;
import model.Lancamento;

public class LancamentoForm extends JDialog implements ActionListener {
	private static final long serialVersionUID = 1L;

	private JPanel panel;
	private JTable table;
	private DefaultTableModel tableModel;
	private JScrollPane scroll;
	private JButton btAdd, btDel, btCancelar, btSalvar;
	private JLabel lbCabecalho = new JLabel(new Lancamento().cabecalho());
	private String hoje = new SimpleDateFormat("dd/MM/yyyy").format(new Date());
	private JTextField tfData = new JTextField(hoje);
	private JComboBox<String> cbConta = new JComboBox<String>();
	private JComboBox<String> cbEmpresa = new JComboBox<String>();
	private JTextField tfValor = new JTextField();

	private Conta conta;
	private Lancamento lancamento;

	LancamentoForm() {
		setTitle("Gerenciamento Lançamentos");
		setBounds(100, 5, 1110, 690);
		panel = new JPanel();
		setContentPane(panel);
		panel.setBackground(Color.blue);
		setLayout(null);
		tfData = new JTextField(new SimpleDateFormat("dd/MM/yyyy").format(new Date()));

		lbCabecalho.setBounds(10, 10, 980, 20);
		tfData.setBounds(10, 30, 80, 28);
		cbConta.setBounds(92, 30, 500, 28);
		cbEmpresa.setBounds(594, 30, 191, 28);
		tfValor.setBounds(787, 30, 105, 28);
		cbConta.setFont(new Font("SansSerif", Font.BOLD, 14));
		cbEmpresa.setFont(new Font("SansSerif", Font.BOLD, 14));
		tfValor.setFont(new Font("SansSerif", Font.BOLD, 16));
		tfData.setEnabled(false);
		lbCabecalho.setForeground(Color.white);
		lbCabecalho.setFont(new Font("SansSerif", Font.BOLD, 16));
		for (Conta c : ProcessaContas.getContas()) {
			cbConta.addItem(
					"  " + c.getCodConta() + "                " + c.getTipo() + "          " + c.getDescricao());
		}
		for (Empresa e : ProcessaEmpresa.getEmpresas()) {
			cbEmpresa.addItem("" + e.getCod() + "  " + e.getNomeEmpresa());
		}
		panel.add(lbCabecalho);
		panel.add(tfData);
		panel.add(cbConta);
		panel.add(cbEmpresa);
		panel.add(tfValor);

		btAdd = new JButton("Adicionar Lançamento");
		btAdd.setFont(new Font("Arial", Font.BOLD, 15));
		btAdd.setBackground(Color.blue);
		btAdd.setForeground(Color.white);
		btAdd.setBounds(895, 30, 194, 28);
		panel.add(btAdd);
		btAdd.addActionListener(this);

		tableModel = new DefaultTableModel();
		tableModel.addColumn("Data");
		tableModel.addColumn("Empresa");
		tableModel.addColumn("Conta");
		tableModel.addColumn("Tipo");
		tableModel.addColumn("Descrição");
		tableModel.addColumn("Valor(R$)");
		if (!ProcessaLancamentos.getLancamentos().isEmpty()) {
			for (Lancamento c : ProcessaLancamentos.getLancamentos()) {
				tableModel.addRow(c.getStringVetor());
			}
		}
		table = new JTable(tableModel);
		table.setFont(new Font("Arial", Font.LAYOUT_LEFT_TO_RIGHT, 14));
		// Ajuste das linhas
		table.setRowHeight(25);
		// Ajuste das colunas da table
		table.getColumnModel().getColumn(0).setMinWidth(100);
		table.getColumnModel().getColumn(0).setMaxWidth(100);
		table.getColumnModel().getColumn(1).setMinWidth(100);
		table.getColumnModel().getColumn(1).setMaxWidth(100);
		table.getColumnModel().getColumn(2).setMinWidth(80);
		table.getColumnModel().getColumn(2).setMaxWidth(80);
		table.getColumnModel().getColumn(3).setMinWidth(110);
		table.getColumnModel().getColumn(3).setMaxWidth(110);
		table.getColumnModel().getColumn(4).setMinWidth(480);
		table.getColumnModel().getColumn(4).setMaxWidth(480);
		table.getColumnModel().getColumn(5).setMinWidth(115);
		table.getColumnModel().getColumn(5).setMaxWidth(115);
		scroll = new JScrollPane(table);
		table.setBackground(Color.gray);
		scroll.setBounds(48, 65, 1000, 540);
		panel.add(scroll);

		btDel = new JButton("Deletar");
		btDel.setFont(new Font("Arial", Font.BOLD, 16));
		btDel.setBackground(Color.blue);
		btDel.setForeground(Color.white);
		btDel.setBounds(765, 612, 100, 30);
		panel.add(btDel);
		btDel.addActionListener(this);

		btCancelar = new JButton("Cancelar");
		btCancelar.setFont(new Font("Arial", Font.BOLD, 16));
		btCancelar.setBackground(Color.blue);
		btCancelar.setForeground(Color.white);
		btCancelar.setBounds(867, 612, 110, 30);
		panel.add(btCancelar);
		btCancelar.addActionListener(this);

		btSalvar = new JButton("Salvar");
		btSalvar.setFont(new Font("Arial", Font.BOLD, 16));
		btSalvar.setBackground(Color.blue);
		btSalvar.setForeground(Color.white);
		btSalvar.setBounds(979, 612, 100, 30);
		panel.add(btSalvar);
		btSalvar.addActionListener(this);
	}

	@Override
	public void actionPerformed(ActionEvent e) {
		if (e.getSource() == btAdd) {
			if (!tfValor.getText().isEmpty()) {
				lancamento = new Lancamento();
				lancamento.setData(tfData.getText());
				lancamento.setEmpresa(
						new Empresa(ProcessaEmpresa.getEmpresas().get(cbEmpresa.getSelectedIndex()).getCod()));
				lancamento.setValor(Double.parseDouble(tfValor.getText()));
				conta = ProcessaContas.getContas().get(cbConta.getSelectedIndex());
				if (ProcessaContas.getContas().get(cbConta.getSelectedIndex()) != null) {
					lancamento.setConta(conta);
					tableModel.addRow(lancamento.getStringVetor());
					tfValor.setText("");
				}
			}
		} else if (e.getSource() == btDel) {
			if (table.getSelectedRow() >= 0) {
				tableModel.removeRow(table.getSelectedRow());
			} else {
				JOptionPane.showMessageDialog(null, "Selecione uma linha");
			}
		} else if (e.getSource() == btCancelar) {
			dispose();
		} else {
			ArrayList<Lancamento> lancamentos = new ArrayList<>();
			for (int i = 0; i < tableModel.getRowCount(); i++) {
				lancamento = new Lancamento();
				lancamento.setData((String) tableModel.getValueAt(i, 0));
				lancamento.setEmpresa(new Empresa(Integer.parseInt((String) tableModel.getValueAt(i, 1))));
				lancamento.setConta(new Conta(Integer.parseInt((String) tableModel.getValueAt(i, 2))));
				lancamento.setValor(Double.parseDouble(tableModel.getValueAt(i, 5).toString().replaceAll(",", ".")));
				lancamentos.add(lancamento);
			}
			ProcessaLancamentos.setLancamentos(lancamentos);
			dispose();
		}
	}
}
