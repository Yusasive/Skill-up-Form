export type User = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
  age: number;
  skills: string[];
  paymentStatus: string;
  faculty: string;
  department: string;
  weeklyCommitment: string;
  interestReason: string;
  originalPrice: number;
  discountedPrice: number;
};

export type Skill = {
  name: string;
  count: number;
};
