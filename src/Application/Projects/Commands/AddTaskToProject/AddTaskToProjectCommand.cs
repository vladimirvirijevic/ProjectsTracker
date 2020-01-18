using MediatR;

namespace Application.Projects.Commands.AddTaskToProject
{
    public class AddTaskToProjectCommand : IRequest
    {
        public int ProjectId { get; set; }
        public string Username { get; set; }
        public string Name { get; set; }
    }
}
