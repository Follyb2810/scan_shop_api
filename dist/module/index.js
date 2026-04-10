"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeList = void 0;
exports.default = loadRoute;
const auditlog_routes_1 = __importDefault(require("./auditlog/auditlog.routes"));
const manufacturer_routes_1 = __importDefault(require("./manufacturer/manufacturer.routes"));
const product_routes_1 = __importDefault(require("./product/product.routes"));
const productunit_routes_1 = __importDefault(require("./productunit/productunit.routes"));
const user_routes_1 = __importDefault(require("./user/user.routes"));
exports.routeList = [
    {
        path: "/appointment",
        router: auditlog_routes_1.default,
    },
    {
        path: "/product_unit",
        router: productunit_routes_1.default,
    },
    {
        path: "/product",
        router: product_routes_1.default,
    },
    {
        path: "/manufacturer",
        router: manufacturer_routes_1.default,
    },
    {
        path: "/user",
        router: user_routes_1.default,
    },
];
function loadRoute(app) {
    return exports.routeList.forEach(({ path, router }) => {
        app.use(`/api/v1${path}`, router);
    });
}
//# sourceMappingURL=index.js.map