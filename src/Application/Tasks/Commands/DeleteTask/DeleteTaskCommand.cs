using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Tasks.Commands.DeleteTask
{
    public class DeleteTaskCommand : IRequest
    {
        public int Id { get; set; }
        public int ProjectId { get; set; }
        public string Username { get; set; }
    }
}
