using Application.Dtos;
using MediatR;

namespace Application.Timers.Commands
{
    public class StartTimerCommand : IRequest<TimerInfoDto>
    {
        public int StartTimer { get; set; }
        public int ProjectId { get; set; }
        public string Username { get; set; }
    }
}
