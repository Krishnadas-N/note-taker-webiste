export interface INote {
  _id:string,
  title: string;
  content: string;
  media: string[];
  user: string;
  createdAt: Date;
  updatedAt: Date;
}
