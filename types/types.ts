export interface User {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
  age: number;
  skills: string[] | undefined;
  faculty: string;
  department: string;
  interestReason: string;
  paymentStatus: string;
  comment?: string;
  weeklyCommitment?: number;
  originalPrice?: number;
  discountedPrice?: number;
}

export type Skill = {
  name: string;
  count: number;
};
