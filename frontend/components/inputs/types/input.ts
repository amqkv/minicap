export interface InputProps {
  placeholder?: string;
  name: string;
  label: string;
  options?: String[];
}

export interface InputFactoryProps extends InputProps {
  type: string;
}
