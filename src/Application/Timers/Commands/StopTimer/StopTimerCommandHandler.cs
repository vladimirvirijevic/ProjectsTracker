using Application.Common.Interfaces;
using Application.Dtos;
using Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Timers.Commands.StopTimer
{
    public class StopTimerCommandHandler : IRequestHandler<StopTimerCommand, ActivityDto>
    {
        private readonly IApplicationDbContext _context;

        public StopTimerCommandHandler(IApplicationDbContext context)
        {
            _context = context; 
        } 

        public async Task<ActivityDto> Handle(StopTimerCommand request, CancellationToken cancellationToken)
        {
            var activity = new Activity
            {
                ProjectName = request.ProjectName,
                ProjectId = request.ProjectId,
                StartTime = request.StartTime,
                EndTime = request.EndTime,
                TimeWorked = request.TimeWorked,
                Username = request.Username,
                Date = request.Date
            };

            await _context.Activities.AddAsync(activity, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);

            var acitvityDto = new ActivityDto(activity);

            return acitvityDto;
        }
    }
}
