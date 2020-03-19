using MediatR;

namespace Application.Users.Commands.ChangeUsername
{
    public class ChangeUsernameCommand : IRequest
    {
        public string Username { get; set; }
        public string NewUsername { get; set; }
    }
}
