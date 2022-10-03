using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class Add
    {
        public class Command : IRequest<Result<Photo>>
        {
            public IFormFile File { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Photo>>
        {
            private readonly DataContext Context;
            private readonly IPhotoAccessor PhotoAccessor;
            private readonly IUserAccessor UserAccessor;

            public Handler(DataContext context, IPhotoAccessor photoAccessor, IUserAccessor userAccessor)
            {
                Context = context;
                PhotoAccessor = photoAccessor;
                UserAccessor = userAccessor;
            }

            public async Task<Result<Photo>> Handle(Command command, CancellationToken cancellationToken)
            {
                var user = await Context.Users.Include(x => x.Photos).FirstOrDefaultAsync(x => x.UserName == UserAccessor.GetUsername());

                if (user == null) return null;

                var photoUploadResult = await PhotoAccessor.AddPhoto(command.File);

                var photo = new Photo
                {
                    Url = photoUploadResult.Url,
                    Id = photoUploadResult.PublicId
                };

                if (!user.Photos.Any(x => x.IsMain)) photo.IsMain = true;

                user.Photos.Add(photo);

                var result = await Context.SaveChangesAsync() > 0;

                if (result)
                {
                    return Result<Photo>.Success(photo);
                }

                return Result<Photo>.Failure("Problem adding photo");
            }

        }
    }
}