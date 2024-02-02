import { z } from "zod";
import { brand, type Branded } from "../brand";

const TRANSACTION_HASH: unique symbol = Symbol("TransactionHash");
export type TransactionHash = Branded<typeof TRANSACTION_HASH, string>;

export const TransactionHash = {
  schema: z
    .string()
    .regex(/(0x)?[0-9|A-F|a-f]{64}/)
    .transform<string>((x: string) => {
      if (x.startsWith("0x")) {
        x.substring(2);
      }
      return x;
    })
    .transform<TransactionHash>((x: string) => brand(TRANSACTION_HASH, x)),
};
