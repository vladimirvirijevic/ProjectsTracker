using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Dtos
{
    public class ActivityDto
    {
        public ActivityDto(Activity activity)
        {
            StartTime = activity.StartTime;
            EndTime = activity.EndTime;
            TimeWorked = activity.TimeWorked;
            Date = activity.Date;
            ProjectName = activity.ProjectName;
            Id = activity.Id;
        }

        public int Id { get; set; }
        public string StartTime { get; set; }
        public string ProjectName { get; set; }
        public string EndTime { get; set; }
        public string TimeWorked { get; set; }
        public string Date { get; set; }
    }
}
