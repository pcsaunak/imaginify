import {
  authMiddleware,
  clerkMiddleware,
  createRouteMatcher,
} from "@clerk/nextjs/server";

export default authMiddleware({
  publicRoutes: ["/api/webhooks/clerk"],
});
// const isProtectedRoute = createRouteMatcher(["/"]);

// export default clerkMiddleware((auth, req) => {
//   if (isProtectedRoute(req)) auth().protect();
// });

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
