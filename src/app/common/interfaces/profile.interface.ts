export interface IProfile {


  data?: {
    id: string;
    userName: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    image: string;
    address: string;
    country: string;
    city: string;
    gender: string;
    bio: string;
    title: string;
    createdAt: Date;
    updatedAt:  Date;
    deletedAt:  Date;
  };
}
