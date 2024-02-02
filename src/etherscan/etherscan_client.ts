import type { InjectionToken } from "tsyringe";
import type { listNormalTransactionsByAddress } from "./list_normal_transactions_by_address";

export const ETHERSCAN_CLIENT: InjectionToken<EtherscanClient> =
  Symbol("EtherscanClient");

export type EtherscanClient = Readonly<{
  listNormalTransactionsByAddress: typeof listNormalTransactionsByAddress;
}>;
