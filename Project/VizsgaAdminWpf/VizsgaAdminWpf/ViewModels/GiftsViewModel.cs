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
    public class GiftsViewModel : INotifyPropertyChanged
    {
        public ApiService Api { get; } = new ApiService();
        public ObservableCollection<AjandekDTO> Gifts { get; } = new();

        private AjandekDTO? _selectedGift;
        public AjandekDTO? SelectedGift
        {
            get => _selectedGift;
            set
            {
                _selectedGift = value;
                OnPropertyChanged();
                CurrentGift = value != null 
                    ? new AjandekDTO { id = value.id, nev = value.nev, ar = value.ar, leiras = value.leiras, kategoria = value.kategoria, image_url = value.image_url } 
                    : new AjandekDTO();
            }
        }

        private AjandekDTO _currentGift = new();
        public AjandekDTO CurrentGift 
        { 
            get => _currentGift; 
            set { _currentGift = value; OnPropertyChanged(); } 
        }

        public event PropertyChangedEventHandler? PropertyChanged;
        private void OnPropertyChanged([CallerMemberName] string? name = null) => PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(name));

        public async Task<bool> SaveGiftAsync()
        {
            if (string.IsNullOrWhiteSpace(CurrentGift.nev))
            {
                MessageBox.Show("A név megadása kötelező.", "Hiba", MessageBoxButton.OK, MessageBoxImage.Warning);
                return false;
            }

            try
            {
                var result = CurrentGift.id == null 
                    ? await Api.CreateAjandek(CurrentGift) 
                    : await Api.UpdateAjandek(CurrentGift.id.Value, CurrentGift);

                if (result.Success)
                {
                    MessageBox.Show("Sikeres mentés.", "Siker", MessageBoxButton.OK, MessageBoxImage.Information);
                    await LoadGiftsAsync();
                    SelectedGift = null;
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

        public async Task<bool> DeleteGiftAsync()
        {
            if (SelectedGift?.id == null) return false;

            try
            {
                if (await Api.DeleteAjandek(SelectedGift.id.Value))
                {
                    await LoadGiftsAsync();
                    SelectedGift = null;
                    return true;
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Hiba: {ex.Message}", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
            }
            return false;
        }

        public async Task LoadGiftsAsync()
        {
            try
            {
                Gifts.Clear();
                var list = await Api.GetAjandekok();
                if (list == null || list.Count == 0)
                {
                    MessageBox.Show("Nem érkezett adat az API-tól.", "Információ", MessageBoxButton.OK, MessageBoxImage.Information);
                }
                else
                {
                    foreach (var g in list) Gifts.Add(g);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Hiba a betöltéskor: {ex.Message}", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }
    }
}
