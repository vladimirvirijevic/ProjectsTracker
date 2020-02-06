using Domain.Entities;

namespace Application.Dtos
{
    public class TimerDto
    {
        public TimerDto(TimerInfo timer)
        {
            Id = timer.Id;
            ProjectId = timer.ProjectId;
            StartTime = timer.StartTime;
            TimerIsRunning = timer.TimerIsRunning;
        }
        public int Id { get; set; }
        public int ProjectId { get; set; }
        public int StartTime { get; set; }
        public bool TimerIsRunning { get; set; }
    }
}
