using MediatR;

namespace Application.Timers.Commands.DeleteActivity
{
    public class DeleteActivityCommand : IRequest
    {
        public int Id { get; set; }
        public string Username { get; set; }
    }
}
