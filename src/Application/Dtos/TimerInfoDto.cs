using Domain.Entities;

namespace Application.Dtos
{
    public class TimerInfoDto
    {
        public TimerInfoDto(TimerInfo timer)
        {
            Id = timer.Id;
            ProjectId = timer.ProjectId;
            StartTime = timer.StartTime;
            TimerIsRunning = timer.TimerIsRunning;
            Username = timer.Username;
        }
        public int Id { get; set; }
        public int ProjectId { get; set; }
        public int StartTime { get; set; }
        public bool TimerIsRunning { get; set; }
        public string Username { get; set; }
    }
}
