using MediatR;
using System.Threading;
using System.Threading.Tasks;
using System.Linq;
using Application.Common.Interfaces;
using Application.Common.Exceptions;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Application.Timers.Commands.DeleteActivity
{
    public class DeleteActivityCommandHandler : IRequestHandler<DeleteActivityCommand>
    {
        private readonly IApplicationDbContext _context;

        public DeleteActivityCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(DeleteActivityCommand request, CancellationToken cancellationToken)
        {
            var activity = await _context.Activities.FirstOrDefaultAsync(a => a.Id == request.Id && a.Username == request.Username);

            if (activity == null)
            {
                throw new NotFoundException(nameof(Activity), request.Id);
            }

            _context.Activities.Remove(activity);
            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
