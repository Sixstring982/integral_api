import { z } from "zod";
import { brand, type Branded } from "../brand";

const ADDRESS: unique symbol = Symbol("Address");
export type Address = Branded<typeof ADDRESS, string>;

export const Address = {
  schema: z
    .string()
    .regex(/(0x)?[0-9|A-F|a-f]{40}/)
    .transform<string>((x: string) => {
      if (x.startsWith("0x")) {
        x.substring(2);
      }
      return x;
    })
    .transform<Address>((x: string) => brand(ADDRESS, x)),
};
