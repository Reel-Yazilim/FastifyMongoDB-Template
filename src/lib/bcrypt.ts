import Bcrypt from "bcrypt";

export const hashPassword = (password: string): string => {
  return Bcrypt.hashSync(password, 16);
};

export const comparePassword = (password: string, hash: string): boolean => {
  return Bcrypt.compareSync(password, hash);
};
