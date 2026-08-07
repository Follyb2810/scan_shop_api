import bcrypt from "bcrypt";
import { env } from "../config/env";

/**
 * Password hashing policy (Step 19):
 * - Algorithm: bcrypt
 * - Cost factor: BCRYPT_ROUNDS (default 10, min 10)
 */
export const hashPwd = async (pwd: string) => {
  const salt = await bcrypt.genSalt(env.BCRYPT_ROUNDS);
  return bcrypt.hash(pwd, salt);
};

export const ComparePassword = async (password: string, hash: string) => {
  try {
    return await bcrypt.compare(password, hash);
  } catch {
    throw new Error("Error comparing passwords");
  }
};
