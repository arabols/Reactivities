using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Activities;
using Application.Comments;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            string currentUsername = null;
            CreateMap<Activity, Activity>();
            CreateMap<Activity, ActivityDto>()
                .ForMember(d => d.HostUserName, o => o.MapFrom(s => s.Attendees
                    .FirstOrDefault(x => x.IsHost).AppUser.UserName));
            CreateMap<ActivityAttendee, AttendeeDto>().ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
            .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
            .ForMember(d => d.Bio, o => o.MapFrom(s => s.AppUser.Bio))
            .ForMember(x => x.Image, o => o.MapFrom(s => s.AppUser.Photos.FirstOrDefault(x => x.IsMain).Url))
            .ForMember(x => x.FollowersCount, opt => opt.MapFrom(x => x.AppUser.Followers.Count))
            .ForMember(x => x.FollowingCount, opt => opt.MapFrom(x => x.AppUser.Followings.Count))
            .ForMember(x => x.Following, opt => opt.MapFrom(s => s.AppUser.Followers.Any(x => x.Observer.UserName == currentUsername)));

            CreateMap<AppUser, Profiles.Profile>().ForMember(dest => dest.Image, options => options.MapFrom(src => src.Photos.FirstOrDefault(x => x.IsMain).Url))
             .ForMember(d => d.FollowersCount, o => o.MapFrom(s => s.Followers.Count))
             .ForMember(d => d.FollowingCount, o => o.MapFrom(s => s.Followings.Count))
             .ForMember(d => d.Following, o => o.MapFrom(s => s.Followings.Any(x => x.Observer.UserName == currentUsername)));

            CreateMap<Comment, CommentDto>().ForMember(d => d.DisplayName, o => o.MapFrom(s => s.Author.DisplayName))
            .ForMember(d => d.Username, o => o.MapFrom(s => s.Author.UserName))
            .ForMember(x => x.Image, o => o.MapFrom(s => s.Author.Photos.FirstOrDefault(x => x.IsMain).Url));

        }
    }
}