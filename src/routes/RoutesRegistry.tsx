import GamePage from "../pages/GamePage";
import TestPage from "../pages/TestPage";

export interface IRoute {
  path: string;
  element: JSX.Element;
  showSideBar: boolean;
  name: string;
  icon: string;
  authentication: boolean;
}

export const RoutesRegistry: IRoute[] = [
  {
    path: "/",
    element: <GamePage />,
    showSideBar: false,
    name: "Home",
    icon: "home",
    authentication: false,
  },
  {
    path: "/test",
    element: <TestPage />,
    showSideBar: false,
    name: "Test",
    icon: "test",
    authentication: true,
  },
];
