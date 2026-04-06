export type Category =
  | "Salary"
  | "Freelance"
  | "Investment"
  | "Food"
  | "Transport"
  | "Housing"
  | "Entertainment"
  | "Healthcare"
  | "Shopping"
  | "Utilities"
  | "Education"
  | "Other";



export type Role = "Admin" | "Viewer";
export type Theme = "light" | "dark";

export type ButtonProps = {
    children: React.ReactNode;
    onClick: () => void;
    className?: string;
};
