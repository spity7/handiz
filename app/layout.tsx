import GlobalEffectsProvider from "@/components/common/GlobalEffectsProvider";
import { ProjectsProvider } from "@/components/providers/ProjectsProvider";
import "../public/scss/main.scss";
import SearchModal from "@/components/modals/SearchModal";
import MobileMenu from "@/components/modals/MobileMenu";
import ScrollTop from "@/components/common/ScrollTop";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem("darkMode");var d=s!==null?JSON.parse(s):true;if(d)document.body.classList.add("dark-mode");}catch(e){}})();`,
          }}
        />
        <ProjectsProvider>
          <div id="wrapper">{children}</div>
          <SearchModal />
          <MobileMenu />
          <ScrollTop />
          <GlobalEffectsProvider />
        </ProjectsProvider>
      </body>
    </html>
  );
}
