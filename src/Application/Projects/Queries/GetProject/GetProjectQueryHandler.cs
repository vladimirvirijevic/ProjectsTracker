using Application.Common.Interfaces;
using Application.Dtos;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Projects.Queries.GetProject
{
    public class GetProjectQueryHandler : IRequestHandler<GetProjectQuery, ProjectDto>
    {
        private readonly IApplicationDbContext _context;

        public GetProjectQueryHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<ProjectDto> Handle(GetProjectQuery request, CancellationToken cancellationToken)
        {
            var entity = _context.Projects.Where(p => p.Username == request.Username && p.Id == request.Id).FirstOrDefault();

            var project = new ProjectDto(entity);

            return project;
        }
    }
}
