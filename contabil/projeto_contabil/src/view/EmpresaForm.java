package view;

import java.awt.Color;

import java.awt.Font;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.ArrayList;

import javax.swing.JButton;
import javax.swing.JDialog;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTable;
import javax.swing.JTextField;
import javax.swing.table.DefaultTableModel;

import controll.ProcessaEmpresa;
import model.Empresa;

public class EmpresaForm extends JDialog implements ActionListener {
	private static final long serialVersionUID = 1L;

	private JPanel panel;
	private JTable table;
	private DefaultTableModel tableModel;
	private JScrollPane scroll;
	private JLabel lbCabecalho = new JLabel(new Empresa().cabecalho());
	private JTextField tfEmpresa = new JTextField();
	private JTextField tfCnpj = new JTextField();
	private JTextField tfCod = new JTextField();
	private JButton btAdd, btDel, btCancelar, btSalvar;
	private int cod;
	private Empresa empresa;

	EmpresaForm() {
		setTitle("Gerenciamento de Empresas");
		setBounds(250, 5, 850, 670);
		panel = new JPanel();
		setContentPane(panel);
		panel.setBackground(Color.blue);
		setLayout(null);

		lbCabecalho.setBounds(10, 10, 680, 20);
		tfCod.setBounds(10, 30, 40, 28);
		tfEmpresa.setBounds(55, 30, 260, 28);
		tfCnpj.setBounds(320, 30, 200, 28);
		tfEmpresa.setFont(new Font("SansSerif", Font.BOLD, 16));
		tfCnpj.setFont(new Font("SansSerif", Font.BOLD, 16));
		tfCod.setEnabled(false);
		tfCod.setText(String.format("%d", cod));
		lbCabecalho.setForeground(Color.white);
		lbCabecalho.setFont(new Font("SansSerif", Font.BOLD, 16));
		panel.add(lbCabecalho);
		panel.add(tfCod);
		panel.add(tfEmpresa);
		panel.add(tfCnpj);

		btAdd = new JButton("Adicionar Empresa");
		btAdd.setFont(new Font("SansSerif", Font.BOLD, 16));
		btAdd.setBackground(Color.blue);
		btAdd.setForeground(Color.white);
		btAdd.setBounds(527, 30, 180, 30);
		panel.add(btAdd);
		btAdd.addActionListener(this);

		btDel = new JButton("Deletar");
		btDel.setFont(new Font("Arial", Font.BOLD, 16));
		btDel.setBackground(Color.blue);
		btDel.setForeground(Color.white);
		btDel.setBounds(611, 590, 100, 30);
		panel.add(btDel);
		btDel.addActionListener(this);

		btCancelar = new JButton("Cancelar");
		btCancelar.setFont(new Font("SansSerif", Font.BOLD, 16));
		btCancelar.setBackground(Color.blue);
		btCancelar.setForeground(Color.white);
		btCancelar.setBounds(715, 590, 110, 30);
		panel.add(btCancelar);
		btCancelar.addActionListener(this);

		btSalvar = new JButton("Salvar");
		btSalvar.setFont(new Font("SansSerif", Font.BOLD, 16));
		btSalvar.setBackground(Color.blue);
		btSalvar.setForeground(Color.white);
		btSalvar.setBounds(715, 30, 100, 30);
		panel.add(btSalvar);
		btSalvar.addActionListener(this);

		tableModel = new DefaultTableModel();
		tableModel.addColumn("Id");
		tableModel.addColumn("Empresa");
		tableModel.addColumn("Cnpj");
		if (!ProcessaEmpresa.getEmpresas().isEmpty()) {
			for (Empresa e : ProcessaEmpresa.getEmpresas()) {
				tableModel.addRow(e.getStringVetor());
			}
		}
		table = new JTable(tableModel);
		table.setFont(new Font("Arial", Font.LAYOUT_LEFT_TO_RIGHT, 14));
		// Ajuste das linhas
		table.setRowHeight(25);
		// Ajuste das colunas da table
		table.getColumnModel().getColumn(0).setMinWidth(90);
		table.getColumnModel().getColumn(0).setMaxWidth(90);
		table.getColumnModel().getColumn(1).setMinWidth(400);
		table.getColumnModel().getColumn(1).setMaxWidth(400);
		table.getColumnModel().getColumn(2).setMinWidth(320);
		table.getColumnModel().getColumn(2).setMaxWidth(320);

		scroll = new JScrollPane(table);
		table.setBackground(Color.gray);
		scroll.setBounds(10, 65, 810, 510);
		panel.add(scroll);
	}

	@Override
	public void actionPerformed(ActionEvent e) {
		if (e.getSource() == btAdd) {
			if (!tfEmpresa.getText().isEmpty() && !tfCnpj.getText().isEmpty()) {
				// Utiliza o Model Produto para filtrar os dados e preenche o tableModel
				empresa = new Empresa();
				empresa.setCod(cod);
				empresa.setNomeEmpresa(tfEmpresa.getText());
				empresa.setCnpj(Integer.parseInt(tfCnpj.getText()));
				tableModel.addRow(empresa.getStringVetor());
				// Limpar os campos
				cod++;
				tfCod.setText(String.format("%d", cod));
				tfEmpresa.setText("");
				tfCnpj.setText("");
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
			ArrayList<Empresa> empresas = new ArrayList<>();
			for (int i = 0; i < tableModel.getRowCount(); i++) {
				empresa = new Empresa();
				empresa.setCod(Integer.parseInt((String) tableModel.getValueAt(i, 0)));
				empresa.setNomeEmpresa((String) tableModel.getValueAt(i, 1));
				empresa.setCnpj(Integer.parseInt((String) tableModel.getValueAt(i, 2)));
				empresas.add(empresa);
			}
			ProcessaEmpresa.setEmpresas(empresas);
			dispose();
		}
	}
}