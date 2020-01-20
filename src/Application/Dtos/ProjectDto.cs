using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;

namespace Application.Dtos
{
    public class ProjectDto
    {
        public ProjectDto(Project project)
        {
            Id = project.Id;
            Name = project.Name;
            Description = project.Description;
            Username = project.Username;

            Tasks = new List<TaskItemDto>();

            project.Tasks.ToList().ForEach(task =>
            {
                Tasks.Add(new TaskItemDto(task));
            });
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Username { get; set; }
        public ICollection<TaskItemDto> Tasks { get; set; }
    }
}
