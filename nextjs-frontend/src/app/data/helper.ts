import { setCookie as setNextCookie } from "cookies-next";

export const setCookie = (name: string, value: string, options: any) => {
  // Validation
  if (typeof name !== "string" || value == null) {
    throw new Error("Invalid cookie name or value");
  }
  
  const defaultOptions = {
    // Set default expiration time to 30 minutes (in seconds)
    maxAge: 1800,
    // Set secure to true by default
    secure: true,
  };

  const mergedOptions = { ...defaultOptions, ...options };

  // Logging
  console.log(`Setting cookie: ${name}=${value}`);

  // Set the cookie using cookies-next
  setNextCookie(name, value, mergedOptions);

  // Remove the cookie after 30 minutes
  setTimeout(() => {
    removeCookie(name);
    console.log(`Removed cookie: ${name}`);
  }, 1800000); // 30 minutes in milliseconds
};

// Function to remove a cookie
export const removeCookie = (name: string) => {
  // Remove the cookie using cookies-next
  setNextCookie(name, '', { maxAge: 0 });
  console.log(`Removed cookie: ${name}`);
};
