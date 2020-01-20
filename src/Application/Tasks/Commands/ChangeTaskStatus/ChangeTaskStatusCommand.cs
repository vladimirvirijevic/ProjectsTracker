using Application.Dtos;
using MediatR;

namespace Application.Tasks.Commands.ChangeTaskStatus
{
    public class ChangeTaskStatusCommand : IRequest<TaskItemDto>
    {
        public int ProjectId { get; set; }
        public int Id { get; set; }
        public string Status { get; set; }
        public string Username { get; set; }
    }
}
