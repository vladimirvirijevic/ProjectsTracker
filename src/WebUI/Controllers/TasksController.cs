using Application.Tasks.Commands.ChangeTaskStatus;
using Application.Tasks.Commands.DeleteTask;
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
        public async Task<IActionResult> GetAll([FromRoute] int projectId)
        {
            var currentUsername = _userService.GetCurrentUser(this.User).Username;

            var result = _mediator.Send(new GetAllTasksQuery { ProjectId = projectId, Username = currentUsername });

            return Ok(result);
        }

        
        [HttpPut]
        public async Task<IActionResult> ChangeStatus([FromBody] ChangeTaskStatusCommand command)
        {
            var currentUsername = _userService.GetCurrentUser(this.User).Username;

            command.Username = currentUsername;

            var result = await _mediator.Send(command);

            return Ok(result);
        }

        [HttpDelete("{projectId}/{id}")]
        public async Task<IActionResult> Delete(int projectId, int id)
        {
            var currentUsername = _userService.GetCurrentUser(this.User).Username;

            var command = new DeleteTaskCommand
            {
                Id = id,
                ProjectId = projectId,
                Username = currentUsername
            };

            await _mediator.Send(command);

            return Ok();
        }
    }
}
