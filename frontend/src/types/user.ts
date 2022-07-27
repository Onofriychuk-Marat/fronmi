import { IChannelResponse } from "./channel";

export interface IUserEntrance {
  login: string;
  password: string;
}

export interface IUser {
  id: number;
  login: string;
  channels: IChannelResponse[];
}
