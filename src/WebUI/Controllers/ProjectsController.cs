using Application.Projects.Commands.AddTaskToProject;
using Application.Projects.Commands.CreateProject;
using Application.Projects.Commands.DeleteProject;
using Application.Projects.Commands.UpdateProject;
using Application.Projects.Queries.GetAllProjects;
using Application.Projects.Queries.GetProject;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Threading.Tasks;
using WebUI.Services;

namespace WebUI.Controllers
{
    [Authorize]
    //[EnableCors("MyPolicy")]
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class ProjectsController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IUserService _userService;

        public ProjectsController(IMediator mediator, IUserService userService)
        {
            _mediator = mediator;
            _userService = userService;
        }

        [HttpGet]
        [Route("{username}")]
        public async Task<IActionResult> GetAll([FromRoute] string username)
        {
            var currentUsername = _userService.GetCurrentUser(this.User).Username;
            if (username != currentUsername)
            {
                return Unauthorized();
            }

            var result = await _mediator.Send(new GetAllProjectsQuery { Username = username });

            return Ok(result);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> Get([FromRoute] int id)
        {
            var currentUsername = _userService.GetCurrentUser(this.User).Username;

            var result = await _mediator.Send(new GetProjectQuery { Username = currentUsername, Id = id });

            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CreateProjectCommand command)
        {
            var result = await _mediator.Send(command);

            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            await _mediator.Send(new DeleteProjectCommand { Id = id });

            return NoContent();
        }

        [HttpPut("id")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateProjectCommand command)
        {
            command.Id = id;
            await _mediator.Send(command);

            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> AddTask([FromBody] AddTaskToProjectCommand command)
        {
            var currentUsername = _userService.GetCurrentUser(this.User).Username;

            command.Username = currentUsername;

            var result = await _mediator.Send(command);

            return Ok();
        }
    }
}
