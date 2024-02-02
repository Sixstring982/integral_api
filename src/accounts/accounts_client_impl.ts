import type { Account } from "./account";
import { AccountId } from "./account";
import type { AccountsClient } from "./accounts_client";
import { Address } from "../address/address";
import { getAccountTransactions } from "./get_account_transactions";

/**
 * Implementation of {@link AccountsClient} which reads from a hardcoded list
 *  of accounts.
 */
export class HardcodedAccountsClient implements AccountsClient {
  getAccountById(accountId: AccountId): Promise<Account | undefined> {
    return Promise.resolve(ACCOUNTS.all.find((x) => x.id === accountId));
  }

  getAccountTransactions = getAccountTransactions;
}

const ACCOUNTS = {
  all: [
    {
      id: AccountId.schema.parse("VNTR5NgwPA2icJNgt2-n1"),
      address: Address.schema.parse(
        "0xc5102fe9359fd9a28f877a67e36b0f050d81a3cc",
      ),
    },
  ] satisfies readonly Account[],
} as const;
