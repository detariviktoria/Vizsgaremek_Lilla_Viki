using System;
using System.Collections.Generic;
using System.Drawing;
using System.Windows.Forms;

namespace VizsgaAdmin
{
    public partial class AdminForm : Form
    {
        ApiService apiService = new ApiService();
        string currentImageFilename = "";

        // Egyszerű segédosztály a ListBox-hoz
        class AjandekItem
        {
            public int Id { get; set; }
            public string Nev { get; set; }
            public int Ar { get; set; }
            public string Leiras { get; set; }
            public string Kategoria { get; set; }
            public string ImageUrl { get; set; }
            public string LinkUrl { get; set; }

            public override string ToString()
            {
                return Nev + " - " + Ar + " Ft";
            }
        }

        public AdminForm()
        {
            InitializeComponent();
            listBoxGifts.SelectedIndexChanged += listBoxGifts_SelectedIndexChanged;
        }

        private void AdminForm_Load(object sender, EventArgs e)
        {
            LoadGifts();
        }

        private async void LoadGifts()
        {
            listBoxGifts.Items.Clear();

            // egyszerű: ha elromlik, csak kiírjuk, nem részletezzük
            try
            {
                List<AjandekDTO> gifts = await apiService.GetAjandekok();
                foreach (var g in gifts)
                {
                    var item = new AjandekItem
                    {
                        Id = g.id,
                        Nev = g.nev,
                        Ar = g.ar,
                        Leiras = g.leiras,
                        Kategoria = g.kategoria,
                        ImageUrl = g.image_url,
                        LinkUrl = g.link_url
                    };
                    listBoxGifts.Items.Add(item);
                }
            }
            catch
            {
                MessageBox.Show("Nem sikerült betölteni az ajándékokat.");
            }
        }

        private void listBoxGifts_SelectedIndexChanged(object sender, EventArgs e)
        {
            if (listBoxGifts.SelectedItem == null) return;

            var selected = (AjandekItem)listBoxGifts.SelectedItem;

            txtNev.Text = selected.Nev;
            txtAr.Text = selected.Ar.ToString();
            txtLeiras.Text = selected.Leiras;
            txtKategoria.Text = selected.Kategoria;
            currentImageFilename = selected.ImageUrl;

            // kép betöltése egyszerűbben
            if (!string.IsNullOrEmpty(selected.ImageUrl))
            {
                try
                {
                    pictureBoxImage.ImageLocation =
                        "http://localhost:3000/images/" + selected.ImageUrl;
                }
                catch
                {
                    pictureBoxImage.Image = null;
                }
            }
            else
            {
                pictureBoxImage.Image = null;
            }
        }

        private async void btnUploadImage_Click(object sender, EventArgs e)
        {
            OpenFileDialog ofd = new OpenFileDialog();
            ofd.Filter = "Képfájlok|*.jpg;*.jpeg;*.png;*.gif;*.bmp";

            if (ofd.ShowDialog() == DialogResult.OK)
            {
                // előnézet egyszerűen
                pictureBoxImage.Image = Image.FromFile(ofd.FileName);

                try
                {
                    // ha nagyon akarod, itt egyszerűsítheted még tovább
                    string uploaded = await apiService.UploadImage(ofd.FileName);
                    currentImageFilename = uploaded;
                    MessageBox.Show("Kép feltöltve.");
                }
                catch
                {
                    MessageBox.Show("Nem sikerült feltölteni a képet.");
                }
            }
        }

        private async void btnAdd_Click(object sender, EventArgs e)
        {
            try
            {
                var uj = new AjandekDTO
                {
                    nev = txtNev.Text,
                    ar = int.Parse(txtAr.Text),
                    leiras = txtLeiras.Text,
                    kategoria = txtKategoria.Text,
                    image_url = currentImageFilename,
                    link_url = ""
                };

                await apiService.CreateAjandek(uj);
                MessageBox.Show("Hozzáadva.");
                LoadGifts();
                ClearFields();
            }
            catch
            {
                MessageBox.Show("Nem sikerült hozzáadni.");
            }
        }

        private async void btnEdit_Click(object sender, EventArgs e)
        {
            if (listBoxGifts.SelectedItem == null)
            {
                MessageBox.Show("Előbb válassz ajándékot.");
                return;
            }

            try
            {
                var selected = (AjandekItem)listBoxGifts.SelectedItem;

                var mod = new AjandekDTO
                {
                    id = selected.Id,
                    nev = txtNev.Text,
                    ar = int.Parse(txtAr.Text),
                    leiras = txtLeiras.Text,
                    kategoria = txtKategoria.Text,
                    image_url = currentImageFilename,
                    link_url = selected.LinkUrl
                };

                await apiService.UpdateAjandek(selected.Id, mod);
                MessageBox.Show("Módosítva.");
                LoadGifts();
                ClearFields();
            }
            catch
            {
                MessageBox.Show("Nem sikerült módosítani.");
            }
        }

        private async void DeleteGift(int id)
        {
            try
            {
                await apiService.DeleteAjandek(id);
                MessageBox.Show("Törölve.");
                LoadGifts();
                ClearFields();
            }
            catch
            {
                MessageBox.Show("Nem sikerült törölni.");
            }
        }

        private void btnDelete_Click(object sender, EventArgs e)
        {
            if (listBoxGifts.SelectedItem == null)
            {
                MessageBox.Show("Előbb válassz ajándékot.");
                return;
            }

            var selected = (AjandekItem)listBoxGifts.SelectedItem;
            var result = MessageBox.Show(
                "Biztosan törlöd: " + selected.Nev + " ?",
                "Megerősítés",
                MessageBoxButtons.YesNo
            );

            if (result == DialogResult.Yes)
            {
                DeleteGift(selected.Id);
            }
        }

        private void btnRefresh_Click(object sender, EventArgs e)
        {
            LoadGifts();
        }

        void ClearFields()
        {
            txtNev.Text = "";
            txtAr.Text = "";
            txtLeiras.Text = "";
            txtKategoria.Text = "";
            currentImageFilename = "";
            pictureBoxImage.Image = null;
            listBoxGifts.ClearSelected();
        }
    }
}
