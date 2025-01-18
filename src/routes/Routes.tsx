import { Route } from "react-router-dom";
import { RoutesRegistry } from "./RoutesRegistry";
import ProtectedRoute from "./ProtectedRoute";

export const Routes = RoutesRegistry.map((r) => (
  <Route
    key={r.path}
    path={r.path}
    element={<ProtectedRoute>{r.element}</ProtectedRoute>}
    errorElement={<div>error</div>}
  ></Route>
));
