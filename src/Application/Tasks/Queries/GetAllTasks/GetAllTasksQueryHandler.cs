using Application.Common.Interfaces;
using Application.Dtos;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Tasks.Queries.GetAllTasks
{
    public class GetAllTasksQueryHandler : IRequestHandler<GetAllTasksQuery, List<TaskItemDto>>
    {
        private readonly IApplicationDbContext _context;

        public GetAllTasksQueryHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<TaskItemDto>> Handle(GetAllTasksQuery request, CancellationToken cancellationToken)
        {
            var project = _context.Projects.FirstOrDefault(p => p.Id == request.ProjectId);
            var taskDtos = new List<TaskItemDto>();

            foreach (var task in project.Tasks)
            {
                taskDtos.Add(new TaskItemDto(task));
            }

            return taskDtos;
        }
    }
}
