import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertToFormData(obj: Record<string, any>): FormData {
  let data = Object.keys(obj).reduce((fd, k) => {
    const value =
      typeof obj[k] === "object" && !(obj[k] instanceof File)
        ? JSON.stringify(obj[k])
        : obj[k];
    fd.append(k, value);
    return fd;
  }, new FormData());

  return data;
}
