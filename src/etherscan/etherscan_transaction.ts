import { z } from "zod";
import { TransactionHash } from "../transactions/transaction_hash";
import { Address } from "../address/address";

export type EtherscanTransaction = Readonly<{
  blockNumber: number;
  timeStamp: Date;
  transactionHash: TransactionHash;
  from: Address;
  contractAddress: Address;
}>;

export const EtherscanTransaction = {
  schema: z
    .object({
      blockNumber: z.number().positive().int(),
      timeStamp: z
        .number()
        .positive()
        .int()
        .transform((x) => new Date(x * 1_000)),
      transactionHash: TransactionHash.schema,
      from: Address.schema,
      contractAddress: Address.schema,
    })
    .transform<EtherscanTransaction>((x) => x),
};
