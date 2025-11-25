import { Application, Router } from "express";
import auditLogRoute from "./auditlog/auditlog.routes";
import manufacturerRoute from "./manufacturer/manufacturer.routes";
import productRoute from "./product/product.routes";
import productUnitRoute from "./productunit/productunit.routes";
import userRoute from "./user/user.routes";

export const routeList: { path: string; router: Router }[] = [
  {
    path: "/appointment",
    router: auditLogRoute,
  },
  {
    path: "/product_unit",
    router: productUnitRoute,
  },
  {
    path: "/product",
    router: productRoute,
  },
  {
    path: "/manufacturer",
    router: manufacturerRoute,
  },
  {
    path: "/user",
    router: userRoute,
  },
];

export default function loadRoute(app: Application) {
  return routeList.forEach(({ path, router }) => {
    app.use(`/api/v1${path}`, router);
  });
}
