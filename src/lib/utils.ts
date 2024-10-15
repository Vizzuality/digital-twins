import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const scrollToSection = (section: string) => {
  const element = document.getElementById(section);
  if (element && typeof window !== "undefined") {
    const rect = element.getBoundingClientRect();
    window.scrollTo({
      top: rect.top + window.scrollY,
      behavior: "smooth",
    });
  }
};
