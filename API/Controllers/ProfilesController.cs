using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Application.Profiles;
using API.DTO;

namespace API.Controllers
{
    public class ProfilesController : BaseAPIController
    {
        [HttpGet("{username}")]
        public async Task<IActionResult> GetProfile(string username)
        {
            return HandleResult(await Mediator.Send(new Details.Query { UserName = username }));
        }

        [HttpPut]
        public async Task<IActionResult> UpdateProfile([FromBody] EditProfileDto profile)
        {
            return HandleResult(await Mediator.Send(new Edit.Command { Bio = profile.bio, DisplayName = profile.displayName }));
        }

    }
}