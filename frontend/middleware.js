import { NextResponse } from "next/server";


export async function middleware(request) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const url = new URL(request.url);
  const currentPath = url.pathname;

  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  try {
    const res = await fetch(`${backendUrl}/api/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status !== 200) {
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    }

    const user = await res.json();

    if (!user.id) {
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    }

    const role = user.role?.toLowerCase();

    // If user has UNDEFINED role, force onboarding
    if (
      user &&
      user.role === "UNDEFINED" &&
      !currentPath.startsWith("/auth/onboarding")
    ) {
      return NextResponse.redirect(new URL("/auth/onboarding", request.url));
    }

    // Redirect from /auth/redirect or /auth/onboarding if already onboarded
    if (
      (currentPath.startsWith("/auth/redirect") ||
        currentPath.startsWith("/auth/onboarding")) &&
      user.role !== "UNDEFINED" &&
      !currentPath.startsWith(`/${role}/dashboard`)
    ) {
      return NextResponse.redirect(new URL(`/${role}/dashboard`, request.url));
    }

    // First time login redirects
    if (
      currentPath.startsWith("/proffesional") &&
      user.firstTimeLogin === true
    ) {
      return NextResponse.redirect(new URL("/onboarding/talent", request.url));
    }

    if (currentPath.startsWith("/supplier") && user.firstTimeLogin === true) {
      return NextResponse.redirect(
        new URL("/onboarding/supplier", request.url)
      );
    }

    // Prevent onboarding access after first login
    if (
      currentPath.startsWith("/onboarding/") &&
      user.firstTimeLogin === false
    ) {
      return NextResponse.redirect(new URL(`/${role}/dashboard`, request.url));
    }

    // Role-based page protection
    if (
      currentPath.startsWith("/auth/onboarding") &&
      user.role !== "UNDEFINED"
    ) {
      return unauthorizedResponse("Unauthorized access to onboarding page.");
    }

    if (currentPath.startsWith("/user") && user.role !== "CLIENT") {
      return unauthorizedResponse("This page is only for Clients.");
    }

    if (currentPath.startsWith("/supplier") && user.role !== "SUPPLIER") {
      return unauthorizedResponse("This page is only for Suppliers.");
    }

    if (currentPath.startsWith("/admin") && user.role !== "ADMIN") {
      return unauthorizedResponse("This page is only for Administrators.");
    }

    if (
      currentPath.startsWith("/professional") &&
      user.role !== "PROFESSIONAL"
    ) {
      return unauthorizedResponse("This page is only for Professionals.");
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    return unauthorizedResponse("Something went wrong. Please try again.");
  }
}

// Helper function for 403 error response
function unauthorizedResponse(message) {
  return new NextResponse(
    `
    <html>
      <head>
        <title>Unauthorized Access - Healthi</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: 'Inter', sans-serif;
            background: linear-gradient(135deg, #eafefa 0%, #ffffff 100%);
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            padding: 20px;
          }
          .container {
            background: #fff;
            padding: 40px;
            border-radius: 16px;
            text-align: center;
            max-width: 400px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
          }
          h1 {
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 16px;
            color: #232323;
          }
          p {
            font-size: 16px;
            color: #666;
            margin-bottom: 24px;
          }
          .buttons {
            display: flex;
            justify-content: center;
            gap: 12px;
          }
          button {
            padding: 10px 20px;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            border: none;
          }
          .back-button {
            background: #f0f0f0;
            color: #333;
          }
          .login-button {
            background: #2d7a93;
            color: white;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Unauthorized Access</h1>
          <p>${message}</p>
          <div class="buttons">
            <button class="back-button" onclick="history.back()">Go Back</button>
            <a href="/auth/signin"><button class="login-button">Login</button></a>
          </div>
        </div>
      </body>
    </html>`,
    {
      status: 403,
      headers: { "Content-Type": "text/html" },
    }
  );
}

export const config = {
  matcher: [
    "/user/:path*",
    "/supplier/:path*",
    "/admin/:path*",
    "/proffesional/:path*",
    "/onboarding/:path*",
    "/auth/redirect",
    "/auth/onboarding",
  ],
};
