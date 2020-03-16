using Application.Dtos;
using MediatR;

namespace Application.Timers.Commands.StopTimer
{
    public class StopTimerCommand : IRequest<ActivityDto>
    {
        public int ProjectId { get; set; }
        public string Username { get; set; }
        public string ProjectName { get; set; }
        public string StartTime { get; set; }
        public string TimeWorked { get; set; }
        public string EndTime { get; set; }
        public string Date { get; set; }
    }
}
