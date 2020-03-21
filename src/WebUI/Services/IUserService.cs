using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace WebUI.Services
{
    public interface IUserService
    {
        User Authenticate(string username, string password);
        IEnumerable<User> GetAll();
        User GetById(int id);
        Task<User> CreateAsync(User user, string password);
        string GenerateToken(User user);
        User GetCurrentUser(ClaimsPrincipal principal);

        Task<bool> ChangePassword(User userInfo, string oldPassword, string newPassword);
    }
}
