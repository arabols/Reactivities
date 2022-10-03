using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class Details
    {
        public class Query : IRequest<Result<Profile>>
        {
            public string UserName { get; set; }
        }

        public class Command : IRequestHandler<Query, Result<Profile>>
        {
            private readonly DataContext dataContext;
            private readonly IMapper mapper;

            public Command(DataContext dataContext, IMapper mapper)
            {
                this.dataContext = dataContext;
                this.mapper = mapper;
            }

            public async Task<Result<Profile>> Handle(Query request, CancellationToken cancellationToken)
            {

                var user = await dataContext.Users.ProjectTo<Profile>(mapper.ConfigurationProvider)
                                                  .SingleOrDefaultAsync(x => x.Username == request.UserName);

                if (user == null) return null;

                return Result<Profile>.Success(user);
            }
        }
    }
}