import { Networks } from "./networks";
import { IScenarioResponse } from "./scenario";

export interface IChannelResponse {
  id: number;
  name: Networks;
  keyApi: string;
  isConnected: boolean;
  icon: string;
  scenarios: IScenarioResponse[];
}

export interface IChannelEmptyResponse {
  id: number;
  name: Networks;
  icon: string;
  isConnected: boolean;
}

export interface IChannelCreate {
  keyApi: string;
}
