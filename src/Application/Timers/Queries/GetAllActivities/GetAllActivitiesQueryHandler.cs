using Application.Common.Interfaces;
using Application.Dtos;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using System.Linq;

namespace Application.Timers.Queries.GetAllActivities
{
    public class GetAllActivitiesQueryHandler : IRequestHandler<GetAllActivitiesQuery, List<ActivityDto>>
    {
        private readonly IApplicationDbContext _context;

        public GetAllActivitiesQueryHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<ActivityDto>> Handle(GetAllActivitiesQuery request, CancellationToken cancellationToken)
        {
            var activities = await _context.Activities.Where(a => a.Username == request.Username).ToListAsync();

            var activitesDto = new List<ActivityDto>();

            activities.ForEach(activity => activitesDto.Add(new ActivityDto(activity)));

            return activitesDto;
        }
    }
}
