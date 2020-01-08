using Application.Common.Interfaces;
using Application.Dtos;
using Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Projects.Commands.CreateProject
{
    public class CreateProjectCommandHandler : IRequestHandler<CreateProjectCommand, ProjectDto>
    {
        private readonly IApplicationDbContext _context;

        public CreateProjectCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<ProjectDto> Handle(CreateProjectCommand request, CancellationToken cancellationToken)
        {
            var entity = new Project
            {
                Name = request.Name,
                Description = request.Description,
                Username = request.Username
            };

            _context.Projects.Add(entity);
            await _context.SaveChangesAsync(cancellationToken);

            ProjectDto projectDto = new ProjectDto(entity);

            return projectDto;
        }
    }
}
