using AppUser = SurplusEats.Models.User;

namespace SurplusEats.Services {
    public interface IAuthService {
        Task<bool> SignUpAsync(string email, string password, AppUser user);
        Task<AppUser?> SignInAsync(string email, string password);
        Task<bool> SignOutAsync();
        Task<AppUser?> GetCurrentUserAsync();
        bool IsAuthenticated { get; }
        string? CurrentUserId { get; }
    }
}

