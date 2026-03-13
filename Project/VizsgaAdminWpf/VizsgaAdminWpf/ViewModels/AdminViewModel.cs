using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using VizsgaAdminWpf.Models;
using VizsgaAdminWpf.Services;

namespace VizsgaAdminWpf.ViewModels
{
    public class AdminViewModel : INotifyPropertyChanged
    {
        private readonly ApiService apiService = new ApiService();
        public event PropertyChangedEventHandler? PropertyChanged;

        public ObservableCollection<AjandekDTO> Gifts { get; set; } = new();
        public ObservableCollection<UserListDto> Users { get; set; } = new();

        private AjandekDTO? _selectedGift;
        public AjandekDTO? SelectedGift
        {
            get => _selectedGift;
            set { _selectedGift = value; OnPropertyChanged(); }
        }

        private UserListDto? _selectedUser;
        public UserListDto? SelectedUser
        {
            get => _selectedUser;
            set { _selectedUser = value; OnPropertyChanged(); }
        }

        protected void OnPropertyChanged([CallerMemberName] string? name = null)
            => PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(name));

        public async Task LoadGiftsAsync()
        {
            try
            {
                Gifts.Clear();
                var list = await apiService.GetAjandekokAsync();
                foreach (var g in list)
                    Gifts.Add(g);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Hiba az ajándékok betöltésekor: {ex.Message}");
                throw;
            }
        }

        public async Task LoadUsersAsync()
        {
            try
            {
                Users.Clear();
                var list = await apiService.GetUsersAsync();
                foreach (var u in list)
                    Users.Add(u);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Hiba a felhasználók betöltésekor: {ex.Message}");
                throw;
            }
        }

        public async Task<bool> AddGiftAsync(AjandekDTO gift)
        {
            try
            {
                return await apiService.CreateAjandekAsync(gift);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Hiba az ajándék hozzáadásakor: {ex.Message}");
                return false;
            }
        }

        public async Task<bool> DeleteGiftAsync(int id)
        {
            try
            {
                return await apiService.DeleteAjandekAsync(id);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Hiba az ajándék törlésekor: {ex.Message}");
                return false;
            }
        }

        public async Task<bool> UpdateGiftAsync(int id, AjandekDTO gift)
        {
            try
            {
                return await apiService.UpdateAjandekAsync(id, gift);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Hiba az ajándék módosításakor: {ex.Message}");
                return false;
            }
        }
    }
}
