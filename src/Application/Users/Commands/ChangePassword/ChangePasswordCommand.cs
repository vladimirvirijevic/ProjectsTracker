using MediatR;

namespace Application.Users.Commands.ChangePassword
{
    public class ChangePasswordCommand 
    {
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
        public string Username { get; set; }
    }
}
