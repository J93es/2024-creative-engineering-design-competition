import cors from "cors";

import { whitelist } from "@config/index";

// 옵션
const corsOptions: cors.CorsOptions = {
  origin: whitelist,
  credentials: true,
  optionsSuccessStatus: 200,
};

export default corsOptions;
