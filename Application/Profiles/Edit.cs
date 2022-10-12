using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string DisplayName { get; set; }
            public string Bio { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            public DataContext Context { get; set; }
            private readonly IUserAccessor userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                this.userAccessor = userAccessor;
                this.Context = context;

            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                if (string.IsNullOrEmpty(request.DisplayName)) return null;

                var user = await Context.Users.FirstOrDefaultAsync(x => x.UserName == userAccessor.GetUsername());
                if (user == null) return null;

                user.DisplayName = request.DisplayName;
                user.Bio = request.Bio;

                var result = await Context.SaveChangesAsync() > 0;
                if (!result) return Result<Unit>.Failure("Failed to update profile");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}