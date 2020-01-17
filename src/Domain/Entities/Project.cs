using System.Collections.Generic;

namespace Domain.Entities
{
    public class Project
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Username { get; set; }

        public ICollection<TaskItem> Tasks { get; set; }
    }
}
