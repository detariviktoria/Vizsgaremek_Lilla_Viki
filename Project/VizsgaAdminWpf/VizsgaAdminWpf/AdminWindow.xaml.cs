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
using VizsgaAdminWpf.Models;
using VizsgaAdminWpf.ApiServices;
using VizsgaAdminWpf.ViewModels;

namespace VizsgaAdminWpf
{
    public partial class AdminWindow : Window
    {
        private readonly AdminViewModel _vm = new AdminViewModel();
        string currentImageFilename = "";

        public AdminWindow()
        {
            InitializeComponent();
            DataContext = _vm;
            listBoxGifts.SelectionChanged += listBoxGifts_SelectionChanged;
            listBoxUsers.SelectionChanged += listBoxUsers_SelectionChanged;
        }

        private void AdminWindow_Loaded(object sender, RoutedEventArgs e)
        {
            _ = LoadGifts();
        }

        private void tabMain_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (!ReferenceEquals(sender, tabMain))
                return;

            if (tabMain.SelectedIndex == 1 && _vm.Users.Count == 0)
            {
                _ = LoadUsers(null);
            }
        }

        private async Task LoadGifts()
        {
            try
            {
                await _vm.LoadGiftsAsync();
                if (_vm.Gifts.Count == 0)
                {
                    MessageBox.Show("Az API üres választ adott vagy nem elérhető.", "Hiba", MessageBoxButton.OK, MessageBoxImage.Warning);
                    return;
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Nem sikerült betölteni az ajándékokat.\n\nHiba: {ex.Message}\n\nLehetséges okok:\n- Az API (http://localhost:3000) nem fut\n- Hibás a backend\n- Hibás válasz érkezett\n\nRészletek: {ex}", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private void listBoxGifts_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (_vm.SelectedGift == null) return;

            var selected = _vm.SelectedGift;
            txtNev.Text = selected.nev ?? "";
            txtAr.Text = (selected.ar ?? 0).ToString();
            txtLeiras.Text = selected.leiras ?? "";
            txtKategoria.Text = selected.kategoria ?? "";
            currentImageFilename = selected.image_url ?? "";

            if (!string.IsNullOrEmpty(selected.image_url))
            {
                try
                {
                    var uri = new Uri("http://localhost:3000/images/" + (selected.image_url ?? ""), UriKind.Absolute);
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

        // ========== AJÁNDÉKOK GOMBOK ==========

        // Kép feltöltése az API-n keresztül
        private async void btnUploadImage_Click(object sender, RoutedEventArgs e)
        {
            var openFile = new OpenFileDialog
            {
                Filter = "Képfájlok|*.jpg;*.jpeg;*.png;*.webp;*.bmp|Minden fájl|*.*"
            };

            if (openFile.ShowDialog() == true)
            {
                try
                {
                    var filename = await _vm.Api.UploadImage(openFile.FileName);
                    currentImageFilename = filename ?? "";

                    if (!string.IsNullOrEmpty(currentImageFilename))
                    {
                        try
                        {
                            var uri = new Uri($"http://localhost:3000/images/{currentImageFilename}", UriKind.Absolute);
                            imageGift.Source = new BitmapImage(uri);
                        }
                        catch
                        {
                            imageGift.Source = null;
                        }
                    }

                    MessageBox.Show("Kép feltöltve!", "Információ", MessageBoxButton.OK, MessageBoxImage.Information);
                }
                catch (Exception ex)
                {
                    MessageBox.Show($"Hiba a kép feltöltésekor: {ex.Message}", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                }
            }
        }

        // Új ajándék hozzáadása
        private async void btnAdd_Click(object sender, RoutedEventArgs e)
        {
            if (string.IsNullOrWhiteSpace(txtNev.Text))
            {
                MessageBox.Show("A név megadása kötelező.", "Hiba", MessageBoxButton.OK, MessageBoxImage.Warning);
                return;
            }

            if (!int.TryParse(txtAr.Text, out var ar))
            {
                MessageBox.Show("Az árnak számnak kell lennie.", "Hiba", MessageBoxButton.OK, MessageBoxImage.Warning);
                return;
            }

            var ajandek = new AjandekDTO
            {
                nev = txtNev.Text,
                ar = ar,
                leiras = txtLeiras.Text,
                kategoria = txtKategoria.Text.Trim().ToLower(),
                image_url = currentImageFilename
            };

            try
            {
                var result = await _vm.Api.CreateAjandek(ajandek);
                if (result.Success)
                {
                    MessageBox.Show("Ajándék hozzáadva.", "Információ", MessageBoxButton.OK, MessageBoxImage.Information);
                    ClearFields();
                    await LoadGifts();
                }
                else
                {
                    MessageBox.Show($"Nem sikerült az ajándék hozzáadása.\n\nAPI válasz: {result.Message}", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Hiba történt: {ex.Message}", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        // Kiválasztott ajándék módosítása
        private async void btnEdit_Click(object sender, RoutedEventArgs e)
        {
            if (_vm.SelectedGift == null || _vm.SelectedGift.id == null)
            {
                MessageBox.Show("Előbb válassz ki egy ajándékot.", "Hiba", MessageBoxButton.OK, MessageBoxImage.Warning);
                return;
            }

            if (!int.TryParse(txtAr.Text, out var ar))
            {
                MessageBox.Show("Az árnak számnak kell lennie.", "Hiba", MessageBoxButton.OK, MessageBoxImage.Warning);
                return;
            }

            var ajandek = new AjandekDTO
            {
                id = _vm.SelectedGift.id.Value,
                nev = txtNev.Text,
                ar = ar,
                leiras = txtLeiras.Text,
                kategoria = txtKategoria.Text.Trim().ToLower(),
                image_url = currentImageFilename
            };

            try
            {
                var result = await _vm.Api.UpdateAjandek(_vm.SelectedGift.id.Value, ajandek);
                if (result.Success)
                {
                    MessageBox.Show("Ajándék módosítva.", "Információ", MessageBoxButton.OK, MessageBoxImage.Information);
                    await LoadGifts();
                }
                else
                {
                    MessageBox.Show($"Nem sikerült a módosítás.\n\nAPI válasz: {result.Message}", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Hiba történt: {ex.Message}", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        // Ajándék törlése API hívással
        private async Task DeleteGift(int id)
        {
            try
            {
                await _vm.Api.DeleteAjandek(id);
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Nem sikerült az ajándék törlése.\n\nHiba: {ex.Message}", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        // Törlés gomb eseménykezelő
        private async void btnDelete_Click(object sender, RoutedEventArgs e)
        {
            if (_vm.SelectedGift == null || _vm.SelectedGift.id == null)
            {
                MessageBox.Show("Előbb válassz ki egy ajándékot.", "Hiba", MessageBoxButton.OK, MessageBoxImage.Warning);
                return;
            }

            var result = MessageBox.Show("Biztosan törölni szeretnéd ezt az ajándékot?", "Megerősítés",
                MessageBoxButton.YesNo, MessageBoxImage.Question);

            if (result == MessageBoxResult.Yes)
            {
                await DeleteGift(_vm.SelectedGift.id.Value);
                await LoadGifts();
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
        }

        // ========== FELHASZNÁLÓK ==========
        private async Task LoadUsers(int? userIdToKeep)
        {
            try
            {
                await _vm.LoadUsersAsync();

                if (userIdToKeep.HasValue)
                {
                    var toSelect = _vm.Users.FirstOrDefault(x => (x.user_id ?? 0) == userIdToKeep.Value);
                    if (toSelect != null)
                    {
                        _vm.SelectedUser = toSelect;
                        listBoxUsers.SelectedItem = toSelect;
                        txtUserNev.Text = toSelect.name ?? "";
                        txtUserEmail.Text = toSelect.email ?? "";
                        txtUserPassword.Password = "";
                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Nem sikerült betölteni a felhasználókat.\n\nHiba: {ex.Message}", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private void listBoxUsers_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (_vm.SelectedUser is UserListDto u)
            {
                txtUserNev.Text = u.name ?? "";
                txtUserEmail.Text = u.email ?? "";
                txtUserPassword.Password = "";
            }
        }

        private async void btnUserRefresh_Click(object sender, RoutedEventArgs e)
        {
            await LoadUsers(null);
        }

        private async void btnUserUpdate_Click(object sender, RoutedEventArgs e)
        {
            var u = _vm.SelectedUser;
            if (u == null)
            {
                MessageBox.Show("Előbb válassz felhasználót.");
                return;
            }
            var name = txtUserNev.Text?.Trim() ?? "";
            var email = txtUserEmail.Text?.Trim() ?? "";
            if (string.IsNullOrEmpty(name) || string.IsNullOrEmpty(email))
            {
                MessageBox.Show("A név és az e-mail megadása kötelező.");
                return;
            }

            try
            {
                var pwd = string.IsNullOrWhiteSpace(txtUserPassword.Password) ? null : txtUserPassword.Password;
                var result = await _vm.Api.UpdateUserAdmin(u.user_id ?? 0, name, email, pwd);
                if (result.Success)
                {
                    MessageBox.Show("Felhasználó adatai frissítve.");
                    var userIdToKeep = u.user_id ?? 0;
                    await LoadUsers(userIdToKeep);
                }
                else
                {
                    MessageBox.Show($"Nem sikerült a módosítás.\n\nAPI válasz: {result.Message}", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Hiba történt: " + ex.Message, "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private void ClearUserFields()
        {
            txtUserNev.Text = "";
            txtUserEmail.Text = "";
            txtUserPassword.Password = "";
        }
    }
}
