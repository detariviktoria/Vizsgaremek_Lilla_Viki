﻿using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace VizsgaAdmin
{
    public partial class AdminForm : Form
    {
        private ApiService apiService = new ApiService();

        // Segédosztály az ajándékok megjelenítéséhez
        public class AjandekItem
        {
            public int Id { get; set; }
            public string Nev { get; set; }
            public int Ar { get; set; }
            public string Leiras { get; set; }
            public string Kategoria { get; set; }

            public override string ToString()
            {
                return $"{Nev} - {Ar} Ft";
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
            try
            {
                List<AjandekDTO> gifts = await apiService.GetAjandekok();
                foreach (var gift in gifts)
                {
                    AjandekItem item = new AjandekItem
                    {
                        Id = gift.id,
                        Nev = gift.nev,
                        Ar = gift.ar,
                        Leiras = gift.leiras,
                        Kategoria = gift.kategoria
                    };
                    listBoxGifts.Items.Add(item);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Hiba az adatok betöltésekor: " + ex.Message, "Hiba", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void listBoxGifts_SelectedIndexChanged(object sender, EventArgs e)
        {
            if (listBoxGifts.SelectedItem != null)
            {
                AjandekItem selected = (AjandekItem)listBoxGifts.SelectedItem;
                txtNev.Text = selected.Nev;
                txtAr.Text = selected.Ar.ToString();
                txtLeiras.Text = selected.Leiras;
                txtKategoria.Text = selected.Kategoria;
            }
        }

        private async void btnAdd_Click(object sender, EventArgs e)
        {
            try
            {
                AjandekDTO newItem = new AjandekDTO
                {
                    nev = txtNev.Text,
                    ar = int.Parse(txtAr.Text),
                    leiras = txtLeiras.Text,
                    kategoria = txtKategoria.Text,
                    image_url = "", // Opcionális
                    link_url = ""   // Opcionális
                };

                await apiService.CreateAjandek(newItem);
                MessageBox.Show("Sikeres hozzáadás!", "Információ", MessageBoxButtons.OK, MessageBoxIcon.Information);
                LoadGifts();
                ClearFields();
            }
            catch (Exception ex)
            {
                MessageBox.Show("Hiba a hozzáadás során: " + ex.Message, "Hiba", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private async void btnEdit_Click(object sender, EventArgs e)
        {
            if (listBoxGifts.SelectedItem == null)
            {
                MessageBox.Show("Válassz ki egy elemet a módosításhoz!", "Figyelmeztetés", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }

            try
            {
                AjandekItem selected = (AjandekItem)listBoxGifts.SelectedItem;
                AjandekDTO updatedItem = new AjandekDTO
                {
                    id = selected.Id,
                    nev = txtNev.Text,
                    ar = int.Parse(txtAr.Text),
                    leiras = txtLeiras.Text,
                    kategoria = txtKategoria.Text,
                    image_url = "",
                    link_url = ""
                };

                await apiService.UpdateAjandek(selected.Id, updatedItem);
                MessageBox.Show("Sikeres módosítás!", "Információ", MessageBoxButtons.OK, MessageBoxIcon.Information);
                LoadGifts();
                ClearFields();
            }
            catch (Exception ex)
            {
                MessageBox.Show("Hiba a módosítás során: " + ex.Message, "Hiba", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void btnDelete_Click(object sender, EventArgs e)
        {
            if (listBoxGifts.SelectedItem == null)
            {
                MessageBox.Show("Kérlek válassz ki egy ajándékot a törléshez!", "Figyelmeztetés", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }

            AjandekItem selectedGift = (AjandekItem)listBoxGifts.SelectedItem;

            DialogResult result = MessageBox.Show($"Biztosan törölni szeretnéd a következőt: {selectedGift.Nev}?", "Megerősítés", MessageBoxButtons.YesNo, MessageBoxIcon.Question);

            if (result == DialogResult.Yes)
            {
                DeleteGift(selectedGift.Id);
            }
        }

        private async void DeleteGift(int id)
        {
            try
            {
                await apiService.DeleteAjandek(id);
                MessageBox.Show("Sikeres törlés!", "Információ", MessageBoxButtons.OK, MessageBoxIcon.Information);
                LoadGifts();
                ClearFields();
            }
            catch (Exception ex)
            {
                MessageBox.Show("Hiba a törlés során: " + ex.Message, "Hiba", MessageBoxButtons.OK, MessageBoxIcon.Error);
                LoadGifts();
            }
        }

        private void btnRefresh_Click(object sender, EventArgs e)
        {
            LoadGifts();
        }

        private void ClearFields()
        {
            txtNev.Text = "";
            txtAr.Text = "";
            txtLeiras.Text = "";
            txtKategoria.Text = "";
            listBoxGifts.SelectedIndex = -1;
        }
    }
}