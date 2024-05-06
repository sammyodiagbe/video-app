import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const isProtectedRoute = createRouteMatcher(["/home(.*)"]);

// this is supposed to stop unauthorized users from getting into the app
export default clerkMiddleware((auth, request) => {
  // const filter = ["/login", "/signup"];
  // const {
  //   nextUrl: { pathname },
  // } = request;
  // if (auth().userId && filter.includes(pathname)) {
  //   return auth().
  // }
  if (!auth().userId && isProtectedRoute(request)) {
    return auth().redirectToSignIn();
  }
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
