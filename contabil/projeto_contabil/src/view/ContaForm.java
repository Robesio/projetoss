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

import controll.ProcessaContas;
import model.Conta;

public class ContaForm extends JDialog implements ActionListener {
	private static final long serialVersionUID = 1L;

	private JPanel panel;
	private JTable table;
	private DefaultTableModel tableModel; //Tabela
	private JScrollPane scroll;
	private JButton btAdd, btDel, btCancelar, btSalvar;
	private JLabel lbCabecalho = new JLabel(new Conta().cabecalho()); //Está pegando o método 'cabecalho()' na classe 'Conta();'
	private int codConta;
	private JTextField tfCodConta = new JTextField(); //Campos de preenchimento
	private JTextField tfTipo = new JTextField();
	private JTextField tfCategoria = new JTextField();
	private JTextField tfDescricao = new JTextField();
	private Conta conta; //Chamando a classe Conta() 

	ContaForm() {
		setTitle("Gerenciamento de contas");
		setBounds(190, 5, 950, 690);
		panel = new JPanel();
		setContentPane(panel);
		panel.setBackground(Color.blue);
		setLayout(null);
		codConta = ProcessaContas.getAutoCodConta();

		// Label e TextFiels para Cadastro
		lbCabecalho.setBounds(10, 10, 980, 20);
		tfCodConta.setBounds(10, 30, 40, 28);
		tfTipo.setBounds(59, 30, 130, 28);
		tfCategoria.setBounds(195, 30, 140, 28);
		tfDescricao.setBounds(340, 30, 400, 28);
		tfTipo.setFont(new Font("SansSerif", Font.BOLD, 16));
		tfCategoria.setFont(new Font("SansSerif", Font.BOLD, 16));
		tfDescricao.setFont(new Font("SansSerif", Font.BOLD, 16));
		tfCodConta.setEnabled(false);
		lbCabecalho.setForeground(Color.white);
		lbCabecalho.setFont(new Font("SansSerif", Font.BOLD, 16));
		tfCodConta.setText(String.format("%d", codConta));
		panel.add(lbCabecalho);
		panel.add(tfCodConta);
		panel.add(tfTipo);
		panel.add(tfCategoria);
		panel.add(tfDescricao);

		btAdd = new JButton("Adicionar Conta");
		btAdd.setFont(new Font("SansSerif", Font.BOLD, 16));
		btAdd.setBackground(Color.blue);
		btAdd.setForeground(Color.white);
		btAdd.setBounds(744, 30, 180, 28);
		panel.add(btAdd);
		btAdd.addActionListener(this);

		//Tabela
		tableModel = new DefaultTableModel();
		tableModel.addColumn("Código");
		tableModel.addColumn("Tipo");
		tableModel.addColumn("Categoria");
		tableModel.addColumn("Descrição");
		if (!ProcessaContas.getContas().isEmpty()) {
			for (Conta c : ProcessaContas.getContas()) {
				tableModel.addRow(c.getStringVetor());
			}
		}
		table = new JTable(tableModel);
		table.setFont(new Font("Arial", Font.LAYOUT_LEFT_TO_RIGHT, 14)); // Varios tipos de fontes podem ser usadas
		// Ajuste das linhas
		table.setRowHeight(25);
		// Ajuste das colunas da table
		table.getColumnModel().getColumn(0).setMinWidth(50);
		table.getColumnModel().getColumn(0).setMaxWidth(50);
		table.getColumnModel().getColumn(1).setMinWidth(100);
		table.getColumnModel().getColumn(1).setMaxWidth(100);
		table.getColumnModel().getColumn(2).setMinWidth(130);
		table.getColumnModel().getColumn(2).setMaxWidth(130);
		table.getColumnModel().getColumn(3).setMinWidth(600);
		table.getColumnModel().getColumn(3).setMaxWidth(600);
		table.setBackground(Color.gray);

		scroll = new JScrollPane(table);
		scroll.setBounds(30, 65, 870, 540);
		panel.add(scroll);

		btDel = new JButton("Deletar");
		btDel.setFont(new Font("Arial", Font.BOLD, 16));
		btDel.setBackground(Color.blue);
		btDel.setForeground(Color.white);
		btDel.setBounds(606, 612, 100, 30);
		panel.add(btDel);
		btDel.addActionListener(this);

		btCancelar = new JButton("Cancelar");
		btCancelar.setFont(new Font("SansSerif", Font.BOLD, 16));
		btCancelar.setBackground(Color.blue);
		btCancelar.setForeground(Color.white);
		btCancelar.setBounds(708, 612, 110, 30);
		panel.add(btCancelar);
		btCancelar.addActionListener(this);

		// Botão Salvar (Renova a lista)
		btSalvar = new JButton("Salvar");
		btSalvar.setFont(new Font("SansSerif", Font.BOLD, 16));
		btSalvar.setBackground(Color.blue);
		btSalvar.setForeground(Color.white);
		btSalvar.setBounds(820, 612, 100, 30);
		panel.add(btSalvar);
		btSalvar.addActionListener(this);
	}

	@Override
	public void actionPerformed(ActionEvent e) {
		if (e.getSource() == btAdd) {
			if (!tfTipo.getText().isEmpty() && !tfCategoria.getText().isEmpty() && !tfDescricao.getText().isEmpty()) {
				// Utiliza o Model Produto para filtrar os dados e preenche o tableModel
				conta = new Conta();
				conta.setCodConta(codConta);
				conta.setTipo(tfTipo.getText());
				conta.setCategoria(tfCategoria.getText());
				conta.setDescricao(tfDescricao.getText());
				tableModel.addRow(conta.getStringVetor());
				// Limpar os campos
				codConta++;
				tfCodConta.setText(String.format("%d", codConta));
				tfTipo.setText("");
				tfCategoria.setText("");
				tfDescricao.setText("");
			}

		} else if (e.getSource() == btDel) {
			// Ao ser pressionado o botão Del
			if (table.getSelectedRow() >= 0) {
				tableModel.removeRow(table.getSelectedRow());
			} else {
				JOptionPane.showMessageDialog(null, "Selecione uma linha");
			}
		} else if (e.getSource() == btCancelar) {
			dispose(); //Fechar tela
		} else { //Senão, só resta o botão salvar
			ArrayList<Conta> contas = new ArrayList<>();
			// Passando os dados da tabela para uma Lista (ArrayList)
			for (int i = 0; i < tableModel.getRowCount(); i++) {
				conta = new Conta();
				conta.setCodConta(Integer.parseInt((String) tableModel.getValueAt(i, 0)));
				conta.setTipo((String) tableModel.getValueAt(i, 1));
				conta.setCategoria((String) tableModel.getValueAt(i, 2));
				conta.setDescricao((String) tableModel.getValueAt(i, 3));
				contas.add(conta);
			}
			ProcessaContas.setContas(contas); //Salvar
			dispose();
		}
	}
}
