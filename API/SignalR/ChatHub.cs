using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Comments;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR
{
    public class ChatHub : Hub
    {
        private readonly IMediator mediator;
        private readonly ILogger<ChatHub> logger;

        public ChatHub(IMediator mediator, ILogger<ChatHub> logger)
        {
            this.mediator = mediator;
            this.logger = logger;
        }

        public async Task SendComment(Create.Command command)
        {
            var comment = await mediator.Send(command);

            await Clients.Group(command.ActivityId.ToString())
                         .SendAsync("ReceiveComment", comment.Value);
        }

        public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();
            var activityId = httpContext.Request.Query["activityId"];
            await Groups.AddToGroupAsync(Context.ConnectionId, activityId);
            var result = await mediator.Send(new List.Query { ActivityId = Guid.Parse(activityId) });
            logger.LogInformation("returning: " + result.ToString());
            await Clients.Caller.SendAsync("LoadComments", result.Value);
        }
    }
}