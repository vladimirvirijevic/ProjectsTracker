using Application.Dtos;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Projects.Queries.GetProject
{
    public class GetProjectQuery : IRequest<ProjectDto>
    {
        public int Id { get; set; }
        public string Username { get; set; }
    }
}
