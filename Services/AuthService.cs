using System.Net.Http.Json;
using Newtonsoft.Json;
using AppUser = SurplusEats.Models.User;

namespace SurplusEats.Services {
    public class AuthService : IAuthService {
        private readonly IDatabaseService _databaseService;
        private readonly HttpClient _httpClient;
        private string? _currentUserId;
        private string? _authToken;

        public AuthService(IDatabaseService databaseService) {
            _databaseService = databaseService;
            _httpClient = new HttpClient();
        }

        public bool IsAuthenticated => !string.IsNullOrEmpty(_currentUserId) && !string.IsNullOrEmpty(_authToken);

        public string? CurrentUserId => _currentUserId;

        public async Task<bool> SignUpAsync(string email, string password, AppUser user) {
            try {
                // Firebase REST API endpoint for sign up
                var url = $"https://identitytoolkit.googleapis.com/v1/accounts:signUp?key={Constants.FirebaseApiKey}";
                
                var payload = new {
                    email,
                    password,
                    returnSecureToken = true
                };

                var response = await _httpClient.PostAsJsonAsync(url, payload);
                
                if (!response.IsSuccessStatusCode) {
                    var error = await response.Content.ReadAsStringAsync();
                    System.Diagnostics.Debug.WriteLine($"SignUp Error: {error}");
                    return false;
                }

                var result = await response.Content.ReadAsStringAsync();
                var authResult = JsonConvert.DeserializeObject<FirebaseAuthResponse>(result);

                if (authResult == null) return false;

                // Set user ID from Firebase auth
                user.Id = authResult.LocalId;
                user.Email = email;
                
                // Store authentication info
                _currentUserId = authResult.LocalId;
                _authToken = authResult.IdToken;
                
                // Store user data in database
                await _databaseService.SaveUserAsync(user);
                
                return true;
            } catch (Exception ex) {
                System.Diagnostics.Debug.WriteLine($"SignUp Error: {ex.Message}");
                return false;
            }
        }

        public async Task<AppUser?> SignInAsync(string email, string password) {
            try {
                // Firebase REST API endpoint for sign in
                var url = $"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key={Constants.FirebaseApiKey}";
                
                var payload = new {
                    email,
                    password,
                    returnSecureToken = true
                };

                var response = await _httpClient.PostAsJsonAsync(url, payload);
                
                if (!response.IsSuccessStatusCode) {
                    var error = await response.Content.ReadAsStringAsync();
                    System.Diagnostics.Debug.WriteLine($"SignIn Error: {error}");
                    return null;
                }

                var result = await response.Content.ReadAsStringAsync();
                var authResult = JsonConvert.DeserializeObject<FirebaseAuthResponse>(result);

                if (authResult == null) return null;

                // Store authentication info
                _currentUserId = authResult.LocalId;
                _authToken = authResult.IdToken;
                
                // Retrieve user data from database
                var user = await _databaseService.GetUserAsync(authResult.LocalId);
                
                return user;
            } catch (Exception ex) {
                System.Diagnostics.Debug.WriteLine($"SignIn Error: {ex.Message}");
                return null;
            }
        }

        public Task<bool> SignOutAsync() {
            try {
                _currentUserId = null;
                _authToken = null;
                return Task.FromResult(true);
            } catch {
                return Task.FromResult(false);
            }
        }

        public async Task<AppUser?> GetCurrentUserAsync() {
            if (!IsAuthenticated || CurrentUserId == null) {
                return null;
            }

            return await _databaseService.GetUserAsync(CurrentUserId);
        }

        // Helper class for Firebase auth response
        private class FirebaseAuthResponse {
            [JsonProperty("localId")]
            public string LocalId { get; set; } = string.Empty;

            [JsonProperty("idToken")]
            public string IdToken { get; set; } = string.Empty;

            [JsonProperty("refreshToken")]
            public string RefreshToken { get; set; } = string.Empty;

            [JsonProperty("expiresIn")]
            public string ExpiresIn { get; set; } = string.Empty;
        }
    }
}

