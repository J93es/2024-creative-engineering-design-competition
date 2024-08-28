// db uri
export const uri = process.env.DB_URI || "mongodb://localhost:27017/contest";

// 포트
export const PORT = process.env.PORT || 8081;

// cors 허용 url
export const whitelist = JSON.parse(
  process.env.CORS_WHITE_LIST ||
    JSON.stringify([
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:3002",
      "http://localhost:8000",
      "http://127.0.0.1:3000",
      "http://127.0.0.1:3001",
      "http://127.0.0.1:3002",
      "http://127.0.0.1:8000",
    ])
);

export const isProduction = process.env.DEVELOPMENT_ENV !== "development";

export const adminAuthData = JSON.parse(
  process.env.ADMIN_AUTH_DATA ||
    '[{"id":"id-example","password":"password-example"}]'
);
