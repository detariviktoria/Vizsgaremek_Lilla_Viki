using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Diagnostics;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using System.Windows;
using VizsgaAdminWpf.ApiServices;
using VizsgaAdminWpf.Models;

namespace VizsgaAdminWpf.ViewModels
{
    public class GiftsViewModel : INotifyPropertyChanged
    {
        public GiftApiService Api { get; set; } = new();

        private List<GiftDto> _gifts = new();
        public List<GiftDto> Gifts 
        { 
            get => _gifts; 
            set { _gifts = value; OnPropertyChanged(); } 
        }

        private GiftDto? _selectedGift;
        public GiftDto? SelectedGift
        {
            get => _selectedGift;
            set
            {
                _selectedGift = value;
                OnPropertyChanged();
                
                if (value != null)
                {
                    CurrentGift = new GiftDto 
                    { 
                        Id = value.Id, 
                        Name = value.Name, 
                        Price = value.Price, 
                        Description = value.Description, 
                        Category = value.Category, 
                        ImageUrl = value.ImageUrl 
                    };
                }
                else
                {
                    CurrentGift = new();
                }
            }
        }

        private GiftDto _currentGift = new();
        public GiftDto CurrentGift 
        { 
            get => _currentGift; 
            set 
            { 
                _currentGift = value; 
                OnPropertyChanged(); 
            } 
        }

        public event PropertyChangedEventHandler? PropertyChanged;
        private void OnPropertyChanged([CallerMemberName] string? name = null) => 
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(name));

        public async Task<bool> SaveGiftAsync()
        {
            if (string.IsNullOrWhiteSpace(CurrentGift.Name) || 
                CurrentGift.Price == null || 
                string.IsNullOrWhiteSpace(CurrentGift.Description) || 
                string.IsNullOrWhiteSpace(CurrentGift.Category))
            {
                MessageBox.Show("Minden mezőt ki kell tölteni!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Warning);
                return false;
            }

            if (CurrentGift.Category != "tárgy" && CurrentGift.Category != "élmény")
            {
                MessageBox.Show("A kategória csak 'tárgy' vagy 'élmény' lehet!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Warning);
                return false;
            }

            if (Gifts.Any(g => g.Name == CurrentGift.Name && g.Id != CurrentGift.Id))
            {
                MessageBox.Show("Már létezik ajándék ezzel a névvel!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Warning);
                return false;
            }

            try
            {
                var result = CurrentGift.Id == null 
                    ? await Api.CreateGift(CurrentGift) 
                    : await Api.UpdateGift(CurrentGift.Id.Value, CurrentGift);

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
            if (SelectedGift?.Id == null) return false;

            try
            {
                if (await Api.DeleteGift(SelectedGift.Id.Value))
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
                Gifts = await Api.GetGifts();
                
                if (Gifts == null || Gifts.Count == 0)
                {
                    MessageBox.Show("Nem érkezett adat az API-tól.", "Információ", MessageBoxButton.OK, MessageBoxImage.Information);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Hiba a betöltéskor: {ex.Message}", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }
    }
}
