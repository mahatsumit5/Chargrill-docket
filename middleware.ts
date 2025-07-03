import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtected = createRouteMatcher(["/home(.*)", "/order(.*)", "/(.*)"]);
export default clerkMiddleware(async (auth, req) => {
  if (isProtected(req)) {
    await auth();
  }
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
