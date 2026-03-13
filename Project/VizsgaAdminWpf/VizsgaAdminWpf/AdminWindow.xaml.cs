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
using VizsgaAdminWpf.Services;
using VizsgaAdminWpf.ViewModels;

namespace VizsgaAdminWpf
{
    public partial class AdminWindow : Window
    {
        ApiService apiService = new ApiService();
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

            if (tabMain.SelectedIndex == 1)
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
                MessageBox.Show($"Nem sikerült betölteni az ajándékokat.\n\nHiba: {ex.Message}", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
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
                    var filename = await apiService.UploadImageAsync(openFile.FileName);
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
                kategoria = txtKategoria.Text,
                image_url = currentImageFilename
            };

            try
            {
                await apiService.CreateAjandekAsync(ajandek);
                MessageBox.Show("Ajándék hozzáadva.", "Információ", MessageBoxButton.OK, MessageBoxImage.Information);
                ClearFields();
                await LoadGifts();
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Nem sikerült az ajándék hozzáadása.\n\nHiba: {ex.Message}", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

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
                kategoria = txtKategoria.Text,
                image_url = currentImageFilename
            };

            try
            {
                await apiService.UpdateAjandekAsync(_vm.SelectedGift.id.Value, ajandek);
                MessageBox.Show("Ajándék módosítva.", "Információ", MessageBoxButton.OK, MessageBoxImage.Information);
                await LoadGifts();
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Nem sikerült az ajándék módosítása.\n\nHiba: {ex.Message}", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

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
                try
                {
                    await apiService.DeleteAjandekAsync(_vm.SelectedGift.id.Value);
                    await LoadGifts();
                }
                catch (Exception ex)
                {
                    MessageBox.Show($"Nem sikerült az ajándék törlése.\n\nHiba: {ex.Message}", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                }
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

        private void listBoxUsers_PreviewMouseLeftButtonDown(object sender, MouseButtonEventArgs e)
        {
            var lb = sender as ListBox;
            if (lb == null) return;

            var dep = (DependencyObject)e.OriginalSource;
            var item = ItemsControl.ContainerFromElement(lb, dep) as ListBoxItem;
            if (item == null)
            {
                while (dep != null && dep is not ListBoxItem)
                    dep = VisualTreeHelper.GetParent(dep);
                item = dep as ListBoxItem;
            }

            if (item != null)
            {
                lb.SelectedItem = item.DataContext;
                item.Focus();
                e.Handled = true;
            }
        }

        private void listBoxUsers_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (_vm.SelectedUser is UserListDto u)
            {
                txtUserNev.Text = u.name ?? "";
                txtUserEmail.Text = u.email ?? "";
                txtUserPassword.Password = "";

                try
                {
                    listBoxUsers.Focus();
                }
                catch { }
            }
        }

        private async void btnUserRefresh_Click(object sender, RoutedEventArgs e)
        {
            await LoadUsers(null);
        }

        private async void btnUserModosit_Click(object sender, RoutedEventArgs e)
        {
            var u = _vm.SelectedUser ?? listBoxUsers.SelectedItem as UserListDto;
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
                await apiService.UpdateUserAdminAsync(u.user_id ?? 0, name, email, pwd);
                MessageBox.Show("Felhasználó adatai frissítve.");
                var userIdToKeep = u.user_id ?? 0;
                await LoadUsers(userIdToKeep);
            }
            catch (Exception ex)
            {
                MessageBox.Show("Nem sikerült módosítani.\n\nHiba: " + ex.Message, "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
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
