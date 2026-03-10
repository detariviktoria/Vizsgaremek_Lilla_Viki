using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;

namespace VizsgaAdminWpf
{
    public class AdminViewModel : INotifyPropertyChanged
    {
        private readonly ApiService _api = new ApiService();

        public ObservableCollection<AjandekDTO> Gifts { get; } = new();
        public ObservableCollection<UserListDto> Users { get; } = new();

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

        public event PropertyChangedEventHandler? PropertyChanged;

        private void OnPropertyChanged([CallerMemberName] string? name = null)
            => PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(name));

        public async Task LoadGiftsAsync()
        {
            Gifts.Clear();
            var list = await _api.GetAjandekok();
            foreach (var g in list)
                Gifts.Add(g);
        }

        public async Task LoadUsersAsync()
        {
            Users.Clear();
            var list = await _api.GetUsers();
            foreach (var u in list)
                Users.Add(u);
        }
    }
}

