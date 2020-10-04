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
    public partial class FormaAlbumi : Form
    {
        public FormaAlbumi()
        {
            InitializeComponent();
        }

        private void FormaAlbumi_Load(object sender, EventArgs e)
        {
            string upit = "SELECT Izvodjaci.izvodjac,albumi.naziv " +
                "FROM Izvodjaci " +
                "INNER JOIN Albumi " +
                "ON Izvodjaci.ID=Albumi.izvodjac";
            //dataGridView1.DataSource=Form1.SqlSelect(upit);
            DataTable tabela = Form1.SqlSelect(upit);
            for (int i = 0; i < tabela.Rows.Count; i+=1)
            {
                string izvodjac = tabela.Rows[i][0].ToString();
                string naziv = tabela.Rows[i][0].ToString();
                //Label item = new Label();
                //item.Dock = DockStyle.Top;
                //item.Text = naziv + " " + izvodjac;
                
                AlbumItem item1 = new AlbumItem(naziv, izvodjac);
                this.Controls.Add(item1.glavniPanel);
                item1.glavniPanel.Dock = DockStyle.Top;
                
            }
           
        }
        
    }
}
