package view;

import java.awt.Color;
import java.awt.Font;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JPasswordField;
import javax.swing.JTextField;

public class Login extends JFrame implements ActionListener {
	private static final long serialVersionUID = 1L;

	private JPanel panel;
	private JLabel lbNome, lbSenha;
	private JTextField tfPrimeiroCampo;
	private JTextField tfSegundoCampo;
	private JButton btLogin;

	Login() {
		setDefaultCloseOperation(EXIT_ON_CLOSE);
		setTitle("Logar no Sistema");
		setBounds(470, 120, 350, 450);
		panel = new JPanel();
		setContentPane(panel);
		panel.setBackground(Color.blue);
		setLayout(null);

		lbNome = new JLabel("Usuário");
		lbNome.setBounds(120, 55, 100, 30);
		panel.add(lbNome);
		lbNome.setForeground(Color.white);
		lbNome.setFont(new Font("SansSerif", Font.BOLD, 20));

		lbSenha = new JLabel("Senha");
		lbSenha.setBounds(120, 140, 80, 30);
		panel.add(lbSenha);
		lbSenha.setForeground(Color.white);
		lbSenha.setFont(new Font("SansSerif", Font.BOLD, 20));

		tfPrimeiroCampo = new JTextField();
		tfPrimeiroCampo.setBounds(60, 90, 200, 35);
		panel.add(tfPrimeiroCampo);
		tfPrimeiroCampo.setFont(new Font("SansSerif", Font.BOLD, 20));
		tfPrimeiroCampo.setForeground(Color.blue);
		tfSegundoCampo = new JPasswordField(); //Não mostrar senha que está cendo digitada
		tfSegundoCampo.setBounds(60, 180, 200, 35);
		panel.add(tfSegundoCampo);
		tfSegundoCampo.setFont(new Font("SansSerif", Font.BOLD, 20));
		tfSegundoCampo.setForeground(Color.blue);

		btLogin = new JButton("Login");
		btLogin.setBounds(100, 270, 100, 30);
		panel.add(btLogin);
		btLogin.addActionListener(this);
		btLogin.setForeground(Color.white);
		btLogin.setBackground(Color.blue);
		btLogin.setFont(new Font("SansSerif", Font.BOLD, 20));
	}

	@Override
	public void actionPerformed(ActionEvent e) {
		if (e.getSource() == btLogin && tfPrimeiroCampo.getText() == null
				|| tfPrimeiroCampo.getText().trim().equals("") && tfSegundoCampo.getText() == null
				|| tfSegundoCampo.getText().trim().equals("")) { //Se os campos não estiverem preenchido
			JOptionPane.showMessageDialog(this, "Preencha Todos os Campos !", " Atenção ",
					JOptionPane.INFORMATION_MESSAGE);
		} else if (tfPrimeiroCampo.getText().equals("Robésio") && tfSegundoCampo.getText().equals("12345")) { //Se não for engual a isso o funcionário não tem acesso ao sistema
			MainForm mf = new MainForm();
			mf.setVisible(true);
			dispose();
		} else if (tfPrimeiroCampo.getText().equals("Elis") && tfSegundoCampo.getText().equals("67890")) {
			MainForm mf = new MainForm();
			mf.setVisible(true);
			dispose();
		} else if (tfPrimeiroCampo.getText().equals("Maisa") && tfSegundoCampo.getText().equals("54321")) {
			MainForm mf = new MainForm();
			mf.setVisible(true);
			dispose();
		} else if (tfPrimeiroCampo.getText().equals("Hiago") && tfSegundoCampo.getText().equals("22222")) {
			MainForm mf = new MainForm();
			mf.setVisible(true);
			dispose();
		} else if (tfPrimeiroCampo.getText().equals("Raul") && tfSegundoCampo.getText().equals("11111")) {
			MainForm mf = new MainForm();
			mf.setVisible(true);
			dispose();
		} else if (tfPrimeiroCampo.getText().equals("Weliton") && tfSegundoCampo.getText().equals("12345")) {
			MainForm mf = new MainForm();
			mf.setVisible(true);
			dispose();
		} else { //Se as informações preenchidas não corresponderem com as cadastradas
			JOptionPane.showMessageDialog(this,
					"Você Não Tem Acesso ! Procure Seu Supervisor\n e Faço Seu Cadastro Para Ter Acesso !", " Atenção ",
					JOptionPane.INFORMATION_MESSAGE);
			dispose();
		}
	}

	public static void main(String[] args) { //Determina essa tela para abrir primeiro
		Login lg = new Login();
		lg.setVisible(true);

	}
}
