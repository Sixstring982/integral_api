import { z, ZodError } from "zod";
import { brand, type Branded } from "../brand";

const ADDRESS: unique symbol = Symbol("Address");
export type Address = Branded<typeof ADDRESS, string>;

export const Address = {
  schema: z
    .string()
    .transform<string>((x: string) => {
      if (x.startsWith("0x")) {
        return x.substring(2);
      }
      return x;
    })
    .transform<string>((x: string, context) => {
      const len = x.length;
      if (len !== 40) {
        context.addIssue({
          code: "custom",
          message: `Invalid length for ETH address "${x}": expected 40, received ${len}`,
          path: [],
        });
      }

      return x;
    })
    .transform<string>((x: string, context) => {
      const matches = x.match(/[0-9A-Fa-f]{40}/);
      if (matches === null) {
        context.addIssue({
          code: "custom",
          message: `Invalid ETH address: Non-hex chars found.`,
          path: [],
        });
      }

      return x;
    })
    .transform<Address>((x: string) => brand(ADDRESS, `0x${x}`)),
};
