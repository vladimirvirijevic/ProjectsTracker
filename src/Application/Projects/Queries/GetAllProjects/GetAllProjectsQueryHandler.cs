using Application.Common.Interfaces;
using Application.Dtos;
using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using System.Linq;

namespace Application.Projects.Queries.GetAllProjects
{
    public class GetAllProjectsQueryHandler : IRequestHandler<GetAllProjectsQuery, List<ProjectDto>>
    {
        private readonly IApplicationDbContext _context;

        public GetAllProjectsQueryHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<ProjectDto>> Handle(GetAllProjectsQuery request, CancellationToken cancellationToken)
        {
            var projects = _context.Projects.Where(p => p.Username == request.Username);
            var projectDtos = new List<ProjectDto>();

            foreach (var project in projects)
            {
                projectDtos.Add(new ProjectDto(project));
            }

            return projectDtos;
        }
    }
}
