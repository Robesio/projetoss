package view;

import java.awt.Color;
import java.awt.event.ActionEvent;

import java.awt.event.ActionListener;

import javax.swing.ImageIcon;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JMenu;
import javax.swing.JMenuBar;
import javax.swing.JMenuItem;
import javax.swing.JOptionPane;
import javax.swing.JPanel;

public class MainForm extends JFrame implements ActionListener {
	private static final long serialVersionUID = 1L;

	private JPanel panel;
	private JMenu menu1, menu2, menu3, menu4, menu5; //Menus um ao lado do outro
	private JMenuBar barraMenu = new JMenuBar();
	private JMenuItem itemContas, itemLancamentos, itemRelatorios, itemEmpresa, itemSair;
	private JLabel lbFundo = new JLabel();
	private ImageIcon img = new ImageIcon("./img/c.jpg"); //Imagem 

	MainForm() {
		setDefaultCloseOperation(EXIT_ON_CLOSE);
		setTitle("Empresa Contabil ");
		setBounds(320, 40, 780, 520);
		panel = new JPanel();
		setJMenuBar(barraMenu);
		setContentPane(panel);
		panel.setBackground(Color.blue);
		setLayout(null);

		lbFundo = new JLabel();
		lbFundo.setIcon(img);
		lbFundo.setBounds(20, 22, 720, 400);
		panel.add(lbFundo);

		setJMenuBar(barraMenu);
		menu1 = new JMenu("Conta");
		menu2 = new JMenu("Lancamento");
		menu3 = new JMenu("Relatório");
		menu4 = new JMenu("Empresa");
		menu5 = new JMenu("Sair");
		barraMenu.add(menu1);
		barraMenu.add(menu2);
		barraMenu.add(menu3);
		barraMenu.add(menu4);
		barraMenu.add(menu5);
		itemContas = new JMenuItem("Conta");
		itemLancamentos = new JMenuItem("Lançamento");
		itemRelatorios = new JMenuItem("Relatório");
		itemEmpresa = new JMenuItem("Empresa");
		itemSair = new JMenuItem("Sair");
		menu1.add(itemContas);
		menu2.add(itemLancamentos);
		menu3.add(itemRelatorios);
		menu4.add(itemEmpresa);
		menu5.add(itemSair);

		itemContas.addActionListener(this);
		itemLancamentos.addActionListener(this);
		itemRelatorios.addActionListener(this);
		itemEmpresa.addActionListener(this);
		itemSair.addActionListener(this);
	}

	@Override
	public void actionPerformed(ActionEvent e) {
		if (e.getSource() == itemContas) {
			ContaForm cf = new ContaForm();
			cf.setModal(true);
			cf.setVisible(true);
		} else if (e.getSource() == itemLancamentos) {
			LancamentoForm lf = new LancamentoForm();
			lf.setModal(true);
			lf.setVisible(true);
		} else if (e.getSource() == itemRelatorios) {
			BalancoForm bf = new BalancoForm();
			bf.setModal(true);
			bf.setVisible(true);
		} else if (e.getSource() == itemEmpresa) {
			EmpresaForm bf = new EmpresaForm();
			bf.setModal(true);
			bf.setVisible(true);
		} else {
			JOptionPane.showMessageDialog(this, "Obrigado ! ", " Sair do Sistema ", JOptionPane.INFORMATION_MESSAGE);
			dispose();
		}
	}
/*
	public static void main(String[] args) { //caso queira tirar a tela de login e abilitar essa tela de inicio, basta tirar os comentários
		MainForm mf = new MainForm();
		mf.setVisible(true);
	}
*/
}
