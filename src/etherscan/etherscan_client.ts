import type { getTokenInfoForContractAddress } from "./get_token_info_for_contract_address";
import type { listNormalTransactionsByAddress } from "./list_normal_transactions_by_address";

export type EtherscanClient = Readonly<{
  listNormalTransactionsByAddress: typeof listNormalTransactionsByAddress;
  getTokenInfoForContractAddress: typeof getTokenInfoForContractAddress;
}>;
