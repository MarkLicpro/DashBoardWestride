export interface PineChartsProps {
  title: string;
  value: number;
  series: Array<number>;
  colors: Array<string>;
}

export interface FormProps {
  type: string;
  register: any;
  //Finish: (values: FieldValues,) => Promise<void | CreateResponse | UpdateResponse>;
  formLoading: boolean;
  handleSubmit: SubmitEventHandler<HTMLFormElement> | undefined;
  handleImageChange: (file: any) => void;
  onFinishHandler: (
    values: FieldValues,
  ) => Promise<void> | void;
  propertyImage: { name: string; url: string };
}