import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import ky from "ky";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const kyInstance = ky.create({
  parseJson: (text:string) =>
    JSON.parse(text, (key, value) => {
      if (key.endsWith("At")) return new Date(value);
      return value;
    }),
});

export default kyInstance;