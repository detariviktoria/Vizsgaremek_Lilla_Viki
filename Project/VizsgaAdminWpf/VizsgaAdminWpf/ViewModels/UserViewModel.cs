using System;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using System.Windows;
using VizsgaAdminWpf.ApiServices;
using VizsgaAdminWpf.Models;

namespace VizsgaAdminWpf.ViewModels
{
    public class UserViewModel : INotifyPropertyChanged
    {
        public ApiService Api { get; } = new ApiService();
        public ObservableCollection<UserListDto> Users { get; } = new();

        private bool _isLoggedIn;
        public bool IsLoggedIn { get => _isLoggedIn; set { _isLoggedIn = value; OnPropertyChanged(); OnPropertyChanged(nameof(IsNotLoggedIn)); } }
        public bool IsNotLoggedIn => !IsLoggedIn;

        private UserListDto? _selectedUser;
        public UserListDto? SelectedUser
        {
            get => _selectedUser;
            set
            {
                _selectedUser = value;
                OnPropertyChanged();
                if (value != null) { CurrentUserName = value.name ?? ""; CurrentUserEmail = value.email ?? ""; }
            }
        }

        private string _currentUserName = "";
        public string CurrentUserName { get => _currentUserName; set { _currentUserName = value; OnPropertyChanged(); } }

        private string _currentUserEmail = "";
        public string CurrentUserEmail { get => _currentUserEmail; set { _currentUserEmail = value; OnPropertyChanged(); } }

        private string _loginUsername = "";
        public string LoginUsername { get => _loginUsername; set { _loginUsername = value; OnPropertyChanged(); } }

        public event PropertyChangedEventHandler? PropertyChanged;
        private void OnPropertyChanged([CallerMemberName] string? name = null) => PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(name));

        public async Task<bool> LoginAsync(string password)
        {
            if (string.IsNullOrEmpty(LoginUsername) || string.IsNullOrEmpty(password))
            {
                MessageBox.Show("Kérlek add meg a felhasználónevet és a jelszót!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Warning);
                return false;
            }

            try
            {
                var response = await Api.Login(LoginUsername, password);
                if (response?.isAdmin == true)
                {
                    IsLoggedIn = true;
                    MessageBox.Show($"Üdv, {response.username}!", "Siker", MessageBoxButton.OK, MessageBoxImage.Information);
                    return true;
                }
                MessageBox.Show(response == null ? "Hibás adatok!" : "Nincs admin jogosultság!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Hiba a bejelentkezés során: {ex.Message}", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
            }
            return false;
        }

        public async Task<bool> UpdateUserAsync(string password)
        {
            if (SelectedUser == null) return false;

            try
            {
                var result = await Api.UpdateUserAdmin(SelectedUser.user_id ?? 0, CurrentUserName, CurrentUserEmail, string.IsNullOrWhiteSpace(password) ? null : password);
                if (result.Success)
                {
                    MessageBox.Show("Sikeres módosítás.", "Siker", MessageBoxButton.OK, MessageBoxImage.Information);
                    await LoadUsersAsync();
                    return true;
                }
                MessageBox.Show($"Hiba: {result.Message}", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Hiba: {ex.Message}", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
            }
            return false;
        }

        public async Task LoadUsersAsync()
        {
            try
            {
                Users.Clear();
                var list = await Api.GetUsers();
                if (list == null || list.Count == 0)
                {
                    MessageBox.Show("Nem érkeztek felhasználók az API-tól.", "Információ", MessageBoxButton.OK, MessageBoxImage.Information);
                }
                else
                {
                    foreach (var u in list) Users.Add(u);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Hiba a felhasználók betöltésekor: {ex.Message}", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }
    }
}
