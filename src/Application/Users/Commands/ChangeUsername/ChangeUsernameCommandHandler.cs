using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Users.Commands.ChangeUsername
{
    public class ChangeUsernameCommandHandler : IRequestHandler<ChangeUsernameCommand>
    {
        private readonly IApplicationDbContext _context;

        public ChangeUsernameCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(ChangeUsernameCommand request, CancellationToken cancellationToken)
        {

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == request.Username);

            if (user == null)
            {
                return Unit.Value;
            }

            user.Username = request.NewUsername;

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
