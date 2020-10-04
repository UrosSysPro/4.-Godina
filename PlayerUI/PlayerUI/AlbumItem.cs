using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
namespace PlayerUI
{
    class AlbumItem
    {
        public Panel glavniPanel;
        PictureBox slika;
        Label nazivAlbuma;
        Label nazivIzvodjaca;
        public AlbumItem(string naziv,string izvodjac)
        {
            glavniPanel = new Panel();
            glavniPanel.Width=100;
            glavniPanel.Height = 20;
            //glavniPanel.BackColor = ;
            
            slika = new PictureBox();
            slika.Dock = DockStyle.Top;
            nazivAlbuma = new Label();
            
            nazivIzvodjaca = new Label();

            nazivAlbuma.Text = naziv;
            nazivIzvodjaca.Text = izvodjac;

            glavniPanel.Controls.Add(slika);
            slika.Dock = DockStyle.Top;
            glavniPanel.Controls.Add(nazivAlbuma);
            nazivAlbuma.Dock = DockStyle.Top;
            glavniPanel.Controls.Add(nazivIzvodjaca);
            nazivIzvodjaca.Dock = DockStyle.Top;
        }

    }
}
