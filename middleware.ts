// middleware.ts
import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/", // Redirect users to the landing page if they aren't logged in
    error: "/",  // Redirect here on errors too
  },
});

export const config = { 
  matcher: ["/dashboard/:path*"] 
};