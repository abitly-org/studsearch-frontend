export interface IInput {
  name: string;
  type: string;
  error: boolean;
  inputClass: string;
  placeholder: string;
  typing: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
}

export interface IForm {
  values: {
    value: string;
  };
}
