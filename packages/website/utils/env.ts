export const kIsDev = process.env.NEXT_PUBLIC_APP_ENV === "development";

export const kDomains = kIsDev
  ? { app: "https://app-dev.opencord.so", www: "https://dev.opencord.so" }
  : { app: "https://app.opencord.xyz", www: "https://www.opencord.xyz" };
