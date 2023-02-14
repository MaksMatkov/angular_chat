using AngularChat.API.Models;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace AngularChat.API.Hubs
{
    public class ChatHub : Hub
    {
        public async Task JoinGroup(string groupName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
        }

        public async Task LeaveGroup(string groupName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
        }

        public async Task SendMessageToGroup(string groupName, string message, string userName)
        {
            await Clients.Group(groupName).SendAsync("ReceiveMessage", new { message = message, userName = userName });
        }
    }
}
