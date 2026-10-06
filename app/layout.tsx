import GoogleAnalytics from "@/components/common/GoogleAnalytics";
import GlobalEffectsProvider from "@/components/common/GlobalEffectsProvider";
import { ProjectsProvider } from "@/components/providers/ProjectsProvider";
import HomeProjectFiltersShell from "@/components/providers/HomeProjectFiltersShell";
import { ShopCartProvider } from "@/components/providers/ShopCartProvider";
import SearchModalClient from "@/components/modals/SearchModalClient";
import "../public/scss/main.scss";
import MobileMenu from "@/components/modals/MobileMenu";
import ScrollTop from "@/components/common/ScrollTop";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <GoogleAnalytics />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem("darkMode");var d=s!==null?JSON.parse(s):true;if(d)document.body.classList.add("dark-mode");}catch(e){}})();`,
          }}
        />
        <ProjectsProvider>
          <ShopCartProvider>
            <HomeProjectFiltersShell>
              <div id="wrapper">{children}</div>
              <SearchModalClient />
            </HomeProjectFiltersShell>
            <MobileMenu />
            <ScrollTop />
            <GlobalEffectsProvider />
          </ShopCartProvider>
        </ProjectsProvider>
      </body>
    </html>
  );
}
