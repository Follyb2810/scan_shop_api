"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
//? run with
//? npm run create-feature foldername
const featureName = process.argv[2];
if (!featureName) {
    console.error("❌ Please provide a feature name");
    process.exit(1);
}
const pascal = featureName.charAt(0).toUpperCase() + featureName.slice(1);
const kebab = featureName.toLowerCase();
console.log(__dirname, "this in create");
const baseDir = path_1.default.join(__dirname, "module", kebab);
if (!fs_1.default.existsSync(baseDir))
    fs_1.default.mkdirSync(baseDir, { recursive: true });
const files = {
    [`${kebab}.controller.ts`]: `
import { Request, Response } from 'express';
import * as ${kebab}Service from './${kebab}.service';

export const first = async (req: Request, res: Response) => {
  const result = await ${kebab}Service.${kebab}Service();
  res.status(200).json(result);
};
`,
    [`${kebab}.dto.ts`]: `
export interface ${pascal}Dto {
  // Define DTO heren d
}
`,
    [`${kebab}.model.ts`]: `
  export interface ${pascal}Model {
// ${kebab}Model

}
`,
    [`${kebab}.service.ts`]: `
export const ${kebab}Service = async () => {
  return { message: '${pascal} service works!' };
};
`,
    [`${kebab}.routes.ts`]: `
import { Router } from 'express';
import * as controller from './${kebab}.controller';

const router = Router();

router.get('/', controller.first);

export default router;
`,
    [`${kebab}.mapper.ts`]: `
export const ${kebab}toDto = (entity: any) => {
  return {
    // Map fields
  };
};
`,
    [`${kebab}.repository.ts`]: ``,
    [`${kebab}.type.ts`]: ``,
    [`${kebab}.middleware.ts`]: ``,
    [`${kebab}.validation.ts`]: ``,
};
Object.entries(files).forEach(([fileName, content]) => {
    const filePath = path_1.default.join(baseDir, fileName);
    fs_1.default.writeFileSync(filePath, content.trimStart());
});
console.log(`✅ Feature '${featureName}' created in ${baseDir}`);
//# sourceMappingURL=create-feature.js.map