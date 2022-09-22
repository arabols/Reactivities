using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Interfaces;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace Infrastructure.Security
{
    public class UserAccessor : IUserAccessor
    {
        private readonly IHttpContextAccessor httpAccessor;
        public UserAccessor(IHttpContextAccessor httpAccessor)
        {
            this.httpAccessor = httpAccessor;
        }

        public string GetUsername()
        {
            return httpAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Name);
        }
    }
}