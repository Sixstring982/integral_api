import { z } from "zod";
import { AccountId } from "../accounts/account";
import { Address } from "../address/address";
import { brand, type Branded } from "../brand";
import type { TransactionHash } from "./transaction_hash";

const TRANSACTION_ID: unique symbol = Symbol("TransactionId");
export type TransactionId = Branded<typeof TRANSACTION_ID, string>;

export const TransactionId = {
  schema: z.string().transform<TransactionId>((x) => brand(TRANSACTION_ID, x)),
};

export type Transaction = Readonly<{
  id: TransactionId;
  accountId: AccountId;
  toAddress: Address;
  fromAddress: Address;
  type: "deposit" | "withdrawal";
  amount: "0.45";
  symbol: string;
  decimal: number;
  timestamp: Date;
  txnHash: TransactionHash;
}>;

export const Transaction = {
  schema: z.object({
    id: TransactionId.schema,
    accountId: AccountId.schema,
    toAddress: Address.schema,
    fromAddress: Address.schema,
    type: z.enum(["deposit", "withdrawal"]),
    amount: z.number(),
    symbol: z.string(),
    decimal: z.number().int(),
  }),
};
