import { createBrowserRouter } from "react-router";
import { Landing } from "./pages/Landing";
import { TapWater } from "./pages/TapWater";
import { BeachWater } from "./pages/BeachWater";
import { Map } from "./pages/Map";
import { MyMeasurements } from "./pages/MyMeasurements";
import { Layout } from "./components/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Landing },
      { path: "tap-water", Component: TapWater },
      { path: "beach-water", Component: BeachWater },
      { path: "map", Component: Map },
      { path: "my-measurements", Component: MyMeasurements },
    ],
  },
]);
