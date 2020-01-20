using Application.Dtos;
using MediatR;
using System.Collections.Generic;

namespace Application.Tasks.Queries.GetAllTasks
{
    public class GetAllTasksQuery : IRequest<List<TaskItemDto>>
    {
        public int ProjectId { get; set; }
        public string Username { get; set; }
    }
}
