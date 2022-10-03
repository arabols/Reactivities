using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>

        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            public Handler(DataContext context, IPhotoAccessor photoAccessor, IUserAccessor userAccessor)
            {
                Context = context;
                PhotoAccessor = photoAccessor;
                UserAccessor = userAccessor;
            }

            private readonly DataContext Context;
            private readonly IPhotoAccessor PhotoAccessor;
            private readonly IUserAccessor UserAccessor;

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await Context.Users.Include(x => x.Photos).FirstOrDefaultAsync(x => x.UserName == UserAccessor.GetUsername());

                if (user == null) return null;

                var photo = user.Photos.FirstOrDefault(x => x.Id == request.Id);

                if (photo == null) return null;

                if (photo.IsMain) return Result<Unit>.Failure("You can not delete your main photo.");

                var result = await PhotoAccessor.DeltePhoto(photo.Id);

                if (result == null) return Result<Unit>.Failure("Problem deleting photo from cludinary");

                user.Photos.Remove(photo);

                var success = await Context.SaveChangesAsync() > 0;

                if (success) return Result<Unit>.Success(Unit.Value);

                return Result<Unit>.Failure("Problem deleting photo from api");


            }
        }
    }
}