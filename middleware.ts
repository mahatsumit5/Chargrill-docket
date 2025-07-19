import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"]);
export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    const { isAuthenticated, factorVerificationAge, redirectToSignIn } =
      await auth();
    console.log("is authenticated", isAuthenticated);
    if (!isAuthenticated) redirectToSignIn();
  } else {
    console.log("inside public route ");
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
