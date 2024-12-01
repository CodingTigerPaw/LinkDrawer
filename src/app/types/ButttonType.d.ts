export type ButtonType = {
  children: string | null | JSX.Element | JSX.Element[];
  cancel?: boolean;
  type?: "button" | "submit" | "reset";
  primary?: boolean;
  secondary?: boolean;
  onClick?: () => void;
  className?: string;
};
