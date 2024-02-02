import { z } from "zod";
import { TransactionHash } from "../transactions/transaction_hash";
import { Address } from "../address/address";

export type EtherscanTransaction = Readonly<{
  blockNumber: number;
  timeStamp: Date;
  hash: TransactionHash;
  from: Address;
  to?: Address;
  value: number;
  contractAddress?: Address;
}>;

export const EtherscanTransaction = {
  schema: z
    .object({
      blockNumber: z.coerce.number().positive().int(),
      timeStamp: z.coerce
        .number()
        .positive()
        .int()
        .transform((x) => new Date(x * 1_000)),
      hash: TransactionHash.schema,
      from: Address.schema,
      to: z.union([z.literal(""), Address.schema]),
      value: z.coerce.number(),
      contractAddress: z.union([z.literal(""), Address.schema]),
    })
    .transform<EtherscanTransaction>((x) => ({
      ...x,
      to: x.to === "" ? undefined : x.to,
      contractAddress: x.contractAddress === "" ? undefined : x.contractAddress,
    })),
};
