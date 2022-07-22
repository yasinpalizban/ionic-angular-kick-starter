import {IPagination} from '../../shared/interfaces/pagination.interface';

export interface IUser {

  pager?: IPagination;
  data?: [{
    id: number;
    email: string;
    username: string;
    status_message: string;
    status: number;
    active: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt:  Date;
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
    groupId: number;
  }];

}
