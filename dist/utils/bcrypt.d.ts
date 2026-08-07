/**
 * Password hashing policy (Step 19):
 * - Algorithm: bcrypt
 * - Cost factor: BCRYPT_ROUNDS (default 10, min 10)
 */
export declare const hashPwd: (pwd: string) => Promise<string>;
export declare const ComparePassword: (password: string, hash: string) => Promise<boolean>;
//# sourceMappingURL=bcrypt.d.ts.map