import cors from "cors";

import { whitelist } from "@config/app-config";

// 옵션
export const corsOptions: cors.CorsOptions = {
  origin: whitelist,
  credentials: true,
  optionsSuccessStatus: 200,
};
