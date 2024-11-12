// middleware.js
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define routes that should be protected
const isProtectedRoute = createRouteMatcher(['/dashboard']); // Only protect the dashboard route

export default clerkMiddleware((auth, req) => {
  // if (isProtectedRoute(req)) {
  //   auth().protect(); // Protect the route if it matches the defined criteria
  // }
});

export const config = {
  matcher: ['/dashboard', '/((?!_next/static|_next/image|favicon.ico).*)'], // Match the dashboard and other routes, excluding static assets
};