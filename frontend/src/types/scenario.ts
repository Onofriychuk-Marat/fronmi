import { IBehaviorResponse } from "./behavior";

export interface IScenarioCreate {
  name: string;
}

export interface IItemScenarioResponse {
  id: number;
  name: string;
  isActive: boolean;
}

export interface IScenarioResponse {
  id: number;
  name: string;
  isActive: boolean;
  startBehavior: IBehaviorResponse;
  behaviors: IBehaviorResponse[];
}
