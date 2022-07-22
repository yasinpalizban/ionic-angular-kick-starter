import {RoleType} from "../enums/role.enum";

export class GlobalConstants {
  public static links: {
    newsCategory: string, newsSubCategory: string,
    newsMedia: string, newsComment: string, viewMedia: string,
    chatPrivate: string, chatRoom: string, requestCategory: string,
    demandChannel:string,demandCity:string,demandOrganization:string,
    demandSocialMedia:string,oppositionChannel:string,
  } = {
    newsComment: '/admin/news-comment/list',
    newsMedia: '/admin/news-media/list',
    newsCategory: '/admin/news-category/list',
    newsSubCategory: '/admin/news-sub-category/list',
    viewMedia: '/admin/view-media/list',
    chatPrivate: '/admin/chat/private',
    chatRoom: '/admin/chat/room',
    requestCategory: '/admin/request-category/list',
    demandChannel:'/admin/channel/list',
    demandCity:'/admin/city/list',
    demandOrganization:'/admin/organization/list',
    demandSocialMedia:'/admin/social-media/list',
    oppositionChannel:'/admin/opposition-channel/list',
  };

  public static limitUserMenu: {
    [key: string]: string[]
  } = {
    account: [RoleType.Admin],
    blog: [RoleType.Admin, RoleType.Coworker,RoleType.Blogger],
    dashboard: [RoleType.Admin, RoleType.Coworker,RoleType.Blogger],
    peopleDemand: [RoleType.Admin, RoleType.Coworker,RoleType.Blogger],
    opposition: [RoleType.Admin, RoleType.Coworker,RoleType.Blogger],
    setting: [RoleType.Admin]
  };

}
