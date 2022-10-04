interface Value {
  label: string;
  name: string;
  required: boolean;
}

export interface Props {
  onSubmit: (data: any) => void;
  values: Value[];
}
