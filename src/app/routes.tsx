import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/RootLayout";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Services } from "./pages/Services";
import { Portfolio } from "./pages/Portfolio";
import { Technologies } from "./pages/Technologies";
import { Process } from "./pages/Process";
import { Testimonials } from "./pages/Testimonials";
import { Contact } from "./pages/Contact";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "services", Component: Services },
      { path: "portfolio", Component: Portfolio },
      { path: "technologies", Component: Technologies },
      { path: "process", Component: Process },
      { path: "testimonials", Component: Testimonials },
      { path: "contact", Component: Contact },
    ],
  },
]);
