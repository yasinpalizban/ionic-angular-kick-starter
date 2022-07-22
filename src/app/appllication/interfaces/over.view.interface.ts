
export interface IOverView {

  visitorPost?: [{
    id: number;
    ip: string;
    country: string;
    city: string;
    lang: string;
    lat: string;
    os: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
  }];
  userPost?: [{
    id: number;
    email: string;
    username: string;
    statusMessage: string;
    status: number;
    active: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    firstName: string;
    lastName: string;
    image: string;
    gender: number;
    birthday: string;
    country: string;
    city: string;
    address: string;
    phone: string;
    group: string;
  }];
  requestPost?: [{
    id: number;
    userId: number;
    categoryId: number;
    title: string;
    body: string;
    status: number;
    category: string;
    language: string;
    username: string;
    lastName: string;
    firstName: string;
    replyCount: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
  }];
  newsPost?: [{
    id: number;
    userId: number;
    categoryId: number;
    subCategoryId: number;
    title: string;
    body: string;
    status: number;
    picture: string;
    category: string;
    subCategory: string;
    username: string;
    lastName: string;
    firstName: string;
    commentCount: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
  }];
  contactPost?: [{
    id: number;
    title: string;
    name: string;
    email: string;
    message: string;
    reply: string;
    phone: number;
    status: number;
    media?: [{
      id: number;
      contactId: number;
      path: string;
    }];
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;

  }];

  countPost?: {
    users: number;
    contacts: number;
    requests: number;
    visitors: number;
    news: number;
  };

}
