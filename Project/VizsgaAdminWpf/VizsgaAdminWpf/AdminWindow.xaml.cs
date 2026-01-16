using System;
using System.Collections.Generic; 
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using Microsoft.Win32;
using System.Diagnostics;

namespace VizsgaAdminWpf
{
    public partial class AdminWindow : Window
    {
        ApiService apiService = new ApiService();
        string currentImageFilename = "";

        class AjandekItem
        {
            public int? Id { get; set; } = 0;
            public string? Nev { get; set; } = "";
            public int? Ar { get; set; } = 0;
            public string? Leiras { get; set; } = "";
            public string? Kategoria { get; set; } = "";
            public string? ImageUrl { get; set; } = "";
            public string? LinkUrl { get; set; } = "";

            public override string ToString()
            {
                return (Nev ?? "") + " - " + (Ar ?? 0) + " Ft";
            }
        }

        public AdminWindow()
        {
            InitializeComponent();
            listBoxGifts.SelectionChanged += listBoxGifts_SelectionChanged;
        }

        private void AdminWindow_Loaded(object sender, RoutedEventArgs e)
        {
            _ = LoadGifts();
        }

        // Make this return Task so exceptions can be propagated and awaited
        private async Task LoadGifts()
        {
            listBoxGifts.Items.Clear();

            try
            {
                List<AjandekDTO> gifts = await apiService.GetAjandekok();
                if (gifts == null || gifts.Count == 0)
                {
                    MessageBox.Show("Az API üres választ adott vagy nem elérhető.", "Hiba", MessageBoxButton.OK, MessageBoxImage.Warning);
                    return;
                }

                foreach (var g in gifts)
                {
                    var item = new AjandekItem
                    {
                        Id = g.id ?? 0,
                        Nev = g.nev ?? "",
                        Ar = g.ar ?? 0,
                        Leiras = g.leiras ?? "",
                        Kategoria = g.kategoria ?? "",
                        ImageUrl = g.image_url ?? "",
                        LinkUrl = g.link_url ?? ""
                    };
                    listBoxGifts.Items.Add(item);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Nem sikerült betölteni az ajándékokat.\n\nHiba: {ex.Message}\n\nLehetséges okok:\n- Az API (http://localhost:3000) nem fut\n- Hibás a backend\n- Hibás válasz érkezett\n\nRészletek: {ex}", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                Debug.WriteLine("LoadGifts hiba: " + ex.ToString());
            }
        }

        private void listBoxGifts_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (listBoxGifts.SelectedItem == null) return;

            var selected = (AjandekItem)listBoxGifts.SelectedItem;

            txtNev.Text = selected.Nev ?? "";
            txtAr.Text = (selected.Ar ?? 0).ToString();
            txtLeiras.Text = selected.Leiras ?? "";
            txtKategoria.Text = selected.Kategoria ?? "";
            currentImageFilename = selected.ImageUrl ?? "";

            if (!string.IsNullOrEmpty(selected.ImageUrl))
            {
                try
                {
                    var uri = new Uri("http://localhost:3000/images/" + (selected.ImageUrl ?? ""), UriKind.Absolute);
                    imageGift.Source = new BitmapImage(uri);
                }
                catch
                {
                    imageGift.Source = null;
                }
            }
            else
            {
                imageGift.Source = null;
            }
        }

        private async void btnUploadImage_Click(object sender, RoutedEventArgs e)
        {
            var ofd = new OpenFileDialog();
            ofd.Filter = "Képfájlok|*.jpg;*.jpeg;*.png;*.gif;*.bmp";

            bool? result = ofd.ShowDialog();
            if (result == true)
            {
                // előnézet
                try
                {
                    imageGift.Source = new BitmapImage(new Uri(ofd.FileName, UriKind.Absolute));
                }
                catch
                {
                    imageGift.Source = null;
                }

                try
                {
                    string uploaded = await apiService.UploadImage(ofd.FileName);
                    currentImageFilename = uploaded;
                    MessageBox.Show("Kép feltöltve.");
                }
                catch (Exception ex)
                {
                    MessageBox.Show("Nem sikerült feltölteni a képet.\n\nHiba: " + ex.Message, "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                    Debug.WriteLine("UploadImage hiba: " + ex.ToString());
                }
            }
        }

        private async void btnAdd_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                var uj = new AjandekDTO
                {
                    nev = txtNev.Text,
                    ar = int.TryParse(txtAr.Text, out int arValue) ? arValue : 0,
                    leiras = txtLeiras.Text,
                    kategoria = txtKategoria.Text,
                    image_url = currentImageFilename,
                    link_url = ""
                };

                await apiService.CreateAjandek(uj);
                MessageBox.Show("Hozzáadva.");
                await LoadGifts();
                ClearFields();
            }
            catch (Exception ex)
            {
                MessageBox.Show("Nem sikerült hozzáadni.\n\nHiba: " + ex.Message, "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                Debug.WriteLine("btnAdd hiba: " + ex.ToString());
            }
        }

        private async void btnEdit_Click(object sender, RoutedEventArgs e)
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
                    id = selected.Id ?? 0,
                    nev = txtNev.Text,
                    ar = int.TryParse(txtAr.Text, out int arValue) ? arValue : 0,
                    leiras = txtLeiras.Text,
                    kategoria = txtKategoria.Text,
                    image_url = currentImageFilename,
                    link_url = selected.LinkUrl ?? ""
                };

                await apiService.UpdateAjandek(selected.Id ?? 0, mod);
                MessageBox.Show("Módosítva.");
                await LoadGifts();
                ClearFields();
            }
            catch (Exception ex)
            {
                MessageBox.Show("Nem sikerült módosítani.\n\nHiba: " + ex.Message, "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                Debug.WriteLine("btnEdit hiba: " + ex.ToString());
            }
        }

        private async Task DeleteGift(int id)
        {
            try
            {
                await apiService.DeleteAjandek(id);
                MessageBox.Show("Törölve.");
                await LoadGifts();
                ClearFields();
            }
            catch (Exception ex)
            {
                MessageBox.Show("Nem sikerült törölni.\n\nHiba: " + ex.Message, "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                Debug.WriteLine("DeleteGift hiba: " + ex.ToString());
            }
        }

        private async void btnDelete_Click(object sender, RoutedEventArgs e)
        {
            if (listBoxGifts.SelectedItem == null)
            {
                MessageBox.Show("Előbb válassz ajándékot.");
                return;
            }

            var selected = (AjandekItem)listBoxGifts.SelectedItem;
            var result = MessageBox.Show(
                "Biztosan törlöd: " + (selected.Nev ?? "") + " ?",
                "Megerősítés",
                MessageBoxButton.YesNo);

            if (result == MessageBoxResult.Yes)
            {
                await DeleteGift(selected.Id ?? 0);
            }
        }

        private async void btnRefresh_Click(object sender, RoutedEventArgs e)
        {
            await LoadGifts();
        }

        private void ClearFields()
        {
            txtNev.Text = "";
            txtAr.Text = "";
            txtLeiras.Text = "";
            txtKategoria.Text = "";
            currentImageFilename = "";
            imageGift.Source = null;
            listBoxGifts.SelectedItem = null;
        }
    }
}
