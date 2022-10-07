export const kIsDev = process.env.NEXT_PUBLIC_APP_ENV === "development";

export const kWebsiteHost = kIsDev
  ? "https://dev.opencord.so"
  : "https://www.opencord.xyz";

export const kWebAppHost = kIsDev
  ? "https://app-dev.opencord.so"
  : "https://app.opencord.xyz";

export const kInviteHost = kIsDev
  ? "https://s-dev.opencord.so"
  : "https://s.opencord.xyz";
