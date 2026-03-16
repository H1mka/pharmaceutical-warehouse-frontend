import { createBrowserRouter } from "react-router";
import { ROUTES } from "@/router/routes";
import MainView from "@/views/MainView";
import CustomerView from "../views/CustomerView";
import PharmacistView from "../views/PharmacistView";
import RepairView from "../views/RepairView";
import SettingsView from "../views/SettingsView";
import MainLayout from "@/layouts/MainLayout";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: ROUTES.HOME, element: <MainView /> },
      { path: ROUTES.CUSTOMER, element: <CustomerView /> },
      { path: ROUTES.PHARMACIST, element: <PharmacistView /> },
      { path: ROUTES.REPAIR, element: <RepairView /> },
      { path: ROUTES.SETTINGS, element: <SettingsView /> },
    ],
  },
]);

export { ROUTES };
export default router;
