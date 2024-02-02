import { injectable } from "tsyringe";
import type { EtherscanClient } from "./etherscan_client";
import { listNormalTransactionsByAddress } from "./list_normal_transactions_by_address";

@injectable()
export class EtherscanClientImpl implements EtherscanClient {
  listNormalTransactionsByAddress = listNormalTransactionsByAddress;
}
