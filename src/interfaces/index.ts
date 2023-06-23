export interface IUser {
  _id?: string;
  email: string;
  name: string;
  password?: string;
}

export interface IBook {
  _id?: string;
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    publisher?: string;
    imageLinks?: {
      smallThumbnail?: string;
      thumbnail?: string;
    };
    description?: string;
  };
  saleInfo?: {
    country?: string;
    buyLink?: string;
  };
  userId?: string;
}
