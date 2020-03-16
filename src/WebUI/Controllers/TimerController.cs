using Application.Timers.Commands;
using Application.Timers.Commands.StopTimer;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebUI.Services;

namespace WebUI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class TimerController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IUserService _userService;

        public TimerController(IMediator mediator, IUserService userService)
        {
            _mediator = mediator;
            _userService = userService;
        }

        [HttpPost]
        public async Task<IActionResult> Start([FromBody] StartTimerCommand command)
        {
            var currentUsername = _userService.GetCurrentUser(this.User).Username;

            command.Username = currentUsername;

            var result = await _mediator.Send(command);

            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Stop([FromBody] StopTimerCommand command)
        {
            var currentUsername = _userService.GetCurrentUser(this.User).Username;
            command.Username = currentUsername;

            var result = await _mediator.Send(command);

            return Ok(result);
        }
    }
}
