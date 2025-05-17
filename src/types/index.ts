
export type UserRole = "sponsor" | "claimer" | "admin" | "visitor";

export interface User {
  _id?: string;
  email: string;
  phone?: string;
  name: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface Cause {
  _id?: string;
  title: string;
  description: string;
  story: string;
  imageUrl: string;
  category: string;
  goal: number;
  raised: number;
  status: "open" | "sponsored" | "waitlist" | "completed";
  claimedBy?: string;
  sponsors: Sponsor[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Sponsor {
  _id?: string;
  userId: string;
  name: string;
  logo?: string;
  amount: number;
  createdAt: Date;
}
