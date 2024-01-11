import { adminProcedure, createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import { SignJWT } from "jose";
import { nanoid } from "nanoid";
import { getJwtSecretKey } from "@/lib/auth";
import cookie from "cookie";
import { TRPCError } from "@trpc/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const adminRouter = createTRPCRouter({
  login: publicProcedure
    .input(z.object({ email: z.string().email(), password: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // const { headers } = ctx;
      const { email, password } = input;
      // const res = new NextResponse();

      if (
        email === process.env.ADMIN_EMAIL &&
        password === process.env.ADMIN_PASSWORD
      ) {
        //admin auth

        const token = await new SignJWT({})
          .setProtectedHeader({ alg: "HS256" })
          .setJti(nanoid())
          .setIssuedAt()
          .setExpirationTime("1h")
          .sign(new TextEncoder().encode(getJwtSecretKey()));

        cookies().set("user-token", token, {
          httpOnly: true,
          path: "/",
          secure: process.env.NODE_ENV !== "production",
          sameSite: "lax",
        });

        console.log(cookies().get("user-token")?.value);

        return { success: true };
      }

      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid credentials",
      });
    }),

  sensitive: adminProcedure.mutation(() => {
    return "sensitive";
  }),
});
