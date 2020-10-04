using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Data.OleDb;

namespace PlayerUI
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
            aktivnaForma = null;
        }
        Form aktivnaForma;
        private void Albumi_Click(object sender, EventArgs e)
        {
            zatvoriFormu();
            FormaAlbumi forma = new FormaAlbumi();
            ubaciFormu(forma);
        }

        private void Izvodjaci_Click(object sender, EventArgs e)
        {
            zatvoriFormu();
            FormaIzvodjaci forma = new FormaIzvodjaci();
            ubaciFormu(forma);
        }

        private void Pesme_Click(object sender, EventArgs e)
        {
            zatvoriFormu();
            FormaPesme forma = new FormaPesme();
            ubaciFormu(forma);
        }
        public void zatvoriFormu()
        {
            if (aktivnaForma != null)
                aktivnaForma.Close();
        }
        public void ubaciFormu(Form form)
        {
            form.TopLevel = false;
            form.FormBorderStyle = FormBorderStyle.None;
            form.Dock = DockStyle.Fill;

            GlavniPanel.Controls.Add(form);
            form.Show();
            aktivnaForma = form;
        }
        public static DataTable SqlSelect(string upit)
        {
            try
            {
                OleDbConnection conn = new OleDbConnection();
                conn.ConnectionString = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source=D:\\Uros\\cd_kolekcija.accdb";
                conn.Open();
                OleDbDataAdapter adapter = new OleDbDataAdapter(upit, conn);
                DataTable tabela = new DataTable();
                adapter.Fill(tabela);
                adapter.Dispose();

                conn.Close();
                return tabela;
            }
            catch (Exception exception)
            {
                MessageBox.Show(exception.Message);
                return null;
            }
        }
    }
}
