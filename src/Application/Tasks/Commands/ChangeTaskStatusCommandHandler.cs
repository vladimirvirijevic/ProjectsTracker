using Application.Dtos;
using MediatR;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Threading;
using Application.Common.Interfaces;

namespace Application.Tasks.Commands
{
    public class ChangeTaskStatusCommandHandler : IRequestHandler<ChangeTaskStatusCommand, TaskItemDto>
    {
        private readonly IApplicationDbContext _context;

        public ChangeTaskStatusCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<TaskItemDto> Handle(ChangeTaskStatusCommand request, CancellationToken cancellationToken)
        {
            var project = _context.Projects.FirstOrDefault(p => p.Id == request.ProjectId && p.Username == request.Username);

            if (project == null)
            {
                return null;
            }

            var task = project.Tasks.FirstOrDefault(t => t.Id == request.Id);

            if (task == null)
            {
                return null;
            }

            var taskIndex = project.Tasks.IndexOf(task);
            task.Status = request.Status;

            project.Tasks[taskIndex] = task;

            await _context.SaveChangesAsync(cancellationToken);

            var taskDto = new TaskItemDto(task);

            return taskDto;
        }
    }
}
