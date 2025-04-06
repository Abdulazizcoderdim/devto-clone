import { z } from "zod";

export const emailSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address, please check and try again." }),
});

export const oldEmailSchema = z
  .object({
    oldEmail: z
      .string()
      .email({ message: "Invalid email address, please check and try again." }),
  })
  .merge(emailSchema);

export const otpSchema = z
  .object({
    otp: z
      .string()
      .min(6, { message: "Your one-time password must be 6 characters." }),
  })
  .merge(emailSchema);

export const messageSchema = z.object({
  text: z.string().min(1, { message: "Message cannot be empty." }),
  image: z.string().optional(),
});

export const profileSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().optional(),
  bio: z.string().optional(),
});

export const confirmTextSchema = z
  .object({ confirmText: z.string() })
  .refine((data) => data.confirmText === "DELETE", {
    message: "You must type DELETE to confirm.",
    path: ["confirmText"],
  });

export const signInSchema = z.object({
  email: z.string().email({
    message: "Invalid email address, please check and try again.",
  }),
  password: z.string().min(4, {
    message: "Password must be at least 4 characters long.",
  }),
  remember: z.boolean().optional(),
});

export const signUpSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters long.",
  }),
  email: z
    .string()
    .email({ message: "Invalid email address, please check and try again." }),
  password: z.string().min(4, {
    message: "Password must be at least 4 characters long.",
  }),
  remember: z.boolean().optional(),
});
