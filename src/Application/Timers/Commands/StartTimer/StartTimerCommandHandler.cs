using Application.Common.Interfaces;
using Application.Dtos;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Linq;

namespace Application.Timers.Commands.StartTimer
{
    public class StartTimerCommandHandler : IRequestHandler<StartTimerCommand, TimerInfoDto>
    {
        private readonly IApplicationDbContext _context;

        public StartTimerCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<TimerInfoDto> Handle(StartTimerCommand request, CancellationToken cancellationToken)
        {
            Project project = await _context.Projects.FirstOrDefaultAsync(p => p.Id == request.ProjectId);

            if (project == null)
            {
                return null;
            }

            if (project.Username != request.Username)
            {
                return null;
            }

            var newTimer = new TimerInfo
            {
                ProjectId = request.ProjectId,
                StartTime = request.StartTimer,
                TimerIsRunning = true,
                Username = request.Username
            };

            await _context.Timers.AddAsync(newTimer);

            await _context.SaveChangesAsync(cancellationToken);

            var timerDto = new TimerInfoDto(newTimer);

            return timerDto;
        }
    }
}
