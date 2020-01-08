using Application.Dtos;
using MediatR;
using System.Collections.Generic;

namespace Application.Projects.Queries.GetAllProjects
{
    public class GetAllProjectsQuery : IRequest<List<ProjectDto>>
    {
        public string Username { get; set; }
    }
}
