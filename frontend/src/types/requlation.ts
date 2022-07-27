export interface IRegulations {
  maxlen: number;
  button: {
    maxcount?: number;
    maxlen?: number;
    link: {
      have: boolean;
      count?: number;
    };
  };
  inlineButton: {
    maxcount?: number;
    maxlen?: number;
    link: {
      have: boolean;
      count?: number;
    };
  };
}
