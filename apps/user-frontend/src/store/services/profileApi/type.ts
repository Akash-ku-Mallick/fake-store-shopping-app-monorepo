
export interface myProfileInterface {
  id: number;
  email: string;
  password: string;
  name: string;
  role: "customer" | "admin" | "seller"; // can adjust if more roles exist
  avatar: string;
  creationAt: string;  // ISO date string
  updatedAt: string;   // ISO date string
}
