import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhook/clerk",
]);
const isApiKeyAccessible = createRouteMatcher(["/api(.*)"]);
export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    const { isAuthenticated, factorVerificationAge, redirectToSignIn } =
      await auth();
    console.log("is authenticated", isAuthenticated);
    if (!isAuthenticated && !isPublicRoute(req)) redirectToSignIn();
  } else {
    console.log("inside public route ");
  }
  if (isApiKeyAccessible(req)) await auth.protect({ token: "api_key" });
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
