import { z } from "zod";

export interface LoginType {
  adminId: string;
  password: string;
}

export const FormLoginSchema: z.ZodType<LoginType> = z.object({
  adminId: z.string().min(1, { message: "아이디를 입력하세요" }),
  password: z.string().min(1, { message: "비밀번호를 입력하세요" }),
});
