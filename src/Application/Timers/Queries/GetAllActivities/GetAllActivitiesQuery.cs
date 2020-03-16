using Application.Dtos;
using MediatR;
using System.Collections.Generic;

namespace Application.Timers.Queries.GetAllActivities
{
    public class GetAllActivitiesQuery : IRequest<List<ActivityDto>>
    {
        public string Username { get; set; }
    }
}
