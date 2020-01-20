using Application.Tasks.Commands;
using Application.Tasks.Queries.GetAllTasks;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using WebUI.Services;

namespace WebUI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class TasksController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IUserService _userService;

        public TasksController(IMediator mediator, IUserService userService)
        {
            _mediator = mediator;
            _userService = userService; 
        }

        [HttpGet("{projectId}")]
        public async Task<IActionResult> Get([FromRoute] int projectId)
        {
            var claimsIdentity = this.User.Identity as ClaimsIdentity;
            var userId = claimsIdentity.FindFirst(ClaimTypes.Name)?.Value;
            var currentUser = _userService.GetById(int.Parse(userId));

            var result = _mediator.Send(new GetAllTasksQuery { ProjectId = projectId, Username = currentUser.Username });

            return Ok(result);
        }

        
        [HttpPut]
        public async Task<IActionResult> ChangeStatus([FromBody] ChangeTaskStatusCommand command)
        {
            var claimsIdentity = this.User.Identity as ClaimsIdentity;
            var userId = claimsIdentity.FindFirst(ClaimTypes.Name)?.Value;
            var currentUser = _userService.GetById(int.Parse(userId));

            command.Username = currentUser.Username;

            var result = await _mediator.Send(command);

            return Ok(result);
        }
    }
}
