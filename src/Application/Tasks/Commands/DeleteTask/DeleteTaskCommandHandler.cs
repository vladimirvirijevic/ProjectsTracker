using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Tasks.Commands.DeleteTask
{
    public class DeleteTaskCommandHandler : IRequestHandler<DeleteTaskCommand>
    {
        private readonly IApplicationDbContext _context;

        public DeleteTaskCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(DeleteTaskCommand request, CancellationToken cancellationToken)
        {
            var project = await _context.Projects.FirstOrDefaultAsync(p => p.Id == request.ProjectId && p.Username == request.Username);

            if (project == null)
            {
                return Unit.Value;
            }

            var task = project.Tasks.FirstOrDefault(t => t.Id == request.Id);

            if (task == null)
            {
                return Unit.Value;
            }

            project.Tasks.Remove(task);

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
