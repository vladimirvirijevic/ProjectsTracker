using Application.Dtos;
using MediatR;

namespace Application.Projects.Commands.CreateProject
{
    public class CreateProjectCommand : IRequest<ProjectDto>
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Username { get; set; }
    }
}
