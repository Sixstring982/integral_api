import type { Account, AccountId } from "./account";
import type { getAccountTransactions } from "./get_account_transactions";

export type AccountsClient = Readonly<{
  getAccountById(accountId: AccountId): Promise<Account | undefined>;

  getAccountTransactions: typeof getAccountTransactions;
}>;
