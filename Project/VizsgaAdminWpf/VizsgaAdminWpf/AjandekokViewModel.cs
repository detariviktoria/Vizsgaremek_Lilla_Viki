using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Threading.Tasks;
using VizsgaAdminWpf;

namespace VizsgaAdminWpf
{
    public class AjandekokViewModel : INotifyPropertyChanged
    {
        private readonly ApiService apiService = new ApiService();

        public event PropertyChangedEventHandler? PropertyChanged;

        public ObservableCollection<Ajandek> Ajandekok { get; set; } = new();

        public async Task BetoltesAsync()
        {
            Ajandekok.Clear();
            var lista = await apiService.LekerdezAjandekokAsync();
            foreach (var ajandek in lista)
                Ajandekok.Add(ajandek);
        }

        public async Task<bool> MentesAsync(Ajandek ajandek)
        {
            return await apiService.HozzaadAjandekAsync(ajandek);
        }

        public async Task<bool> TorlesAsync(int id)
        {
            return await apiService.TorolAjandekAsync(id);
        }

        public async Task<bool> ModositasAsync(int id, Ajandek ajandek)
        {
            return await apiService.ModositAjandekAsync(id, ajandek);
        }
    }
}
