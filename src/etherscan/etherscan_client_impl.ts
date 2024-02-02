import type { EtherscanClient } from "./etherscan_client";
import { getTokenInfoForContractAddress } from "./get_token_info_for_contract_address";
import { listNormalTransactionsByAddress } from "./list_normal_transactions_by_address";

export class EtherscanClientImpl implements EtherscanClient {
  listNormalTransactionsByAddress = listNormalTransactionsByAddress;
  getTokenInfoForContractAddress = getTokenInfoForContractAddress;
}
