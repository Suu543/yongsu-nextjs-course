export { default } from "next-auth/middleware";

export const config = {
  // *: zero o more
  // +: one or more
  matcher: ["/users/:id*"],
};