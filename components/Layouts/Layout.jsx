import Navigation from "components/Navigation/Navigation";
import Footer from "components/Footer/Footer";

import { Analytics } from "@vercel/analytics/react";

export default function Layout({ children }) {
  return (
    <>
      <Navigation />
      <div>{children}</div>
      <Analytics />
      <Footer />
    </>
  );
}
