using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class UpdateAttendance
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext context;
            private readonly IUserAccessor userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                this.context = context;
                this.userAccessor = userAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await context.Activities.Include(a => a.Attendees).ThenInclude(u => u.AppUser).FirstOrDefaultAsync(x => x.Id == request.Id);

                if (activity == null) return null;

                var user = await context.Users.FirstOrDefaultAsync(x => x.UserName == userAccessor.GetUsername());
                if (user == null) return null;

                var HostUserName = activity.Attendees.FirstOrDefault(x => x.IsHost)?.AppUser?.UserName;

                var attendance = activity.Attendees.FirstOrDefault(x => x.AppUser.UserName == user.UserName);

                //user is attending and is host so toggle canceled flag
                if (attendance != null && HostUserName == user.UserName)
                    activity.IsCanceled = !activity.IsCanceled;
                //user is attending and is not the host so remove attendance
                if (attendance != null && HostUserName != user.UserName)
                    activity.Attendees.Remove(attendance);

                if (attendance == null)
                {
                    attendance = new ActivityAttendee()
                    {
                        ActivityId = activity.Id,
                        Activity = activity,
                        AppUser = user,
                        AppUserId = user.Id,
                        IsHost = false
                    };

                    activity.Attendees.Add(attendance);

                }

                var result = await context.SaveChangesAsync() > 0;
                return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem updating attendance");

            }
        }
    }
}