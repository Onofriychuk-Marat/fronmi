export interface IButtonBehaviorCreate {
  nextNumber: number;
  text: string;
}

export interface IBehaviorCreate {
  number: number;
  isInlineButton: boolean;
  message: string;
  buttons: IButtonBehaviorCreate[];
}

export interface IButtonBehaviorResponse {
  id: number;
  nextNumber: number;
  text: string;
  link?: string;
}

export interface IBehaviorResponse {
  id: number;
  number: number;
  isInlineButton: boolean;
  message: string;
  isStart: boolean;
  buttons: IButtonBehaviorResponse[];
}
