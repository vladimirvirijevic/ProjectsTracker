using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Dtos
{
    public class TaskItemDto
    {
        public TaskItemDto(TaskItem task)
        {
            Id = task.Id;
            ProjectId = task.ProjectId;
            Name = task.Name;
            Status = task.Status;
        }

        public int Id { get; set; }
        public int ProjectId { get; set; }
        public string Name { get; set; }
        public string Status { get; set; }
    }
}
