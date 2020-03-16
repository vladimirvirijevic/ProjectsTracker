using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Entities
{
    public class Activity
    {
        public int Id { get; set; }
        public string TimeWorked { get; set; }
        public int ProjectId { get; set; }
        public string Username { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public string Date { get; set; }
    }
}
