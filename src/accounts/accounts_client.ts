import type { InjectionToken } from "tsyringe";
import type { Account, AccountId } from "./account";
import type { getAccountTransactions } from "./get_account_transactions";

export const ACCOUNTS_CLIENT: InjectionToken<AccountsClient> =
  Symbol("AccountsClient");

export type AccountsClient = Readonly<{
  getAccountById(accountId: AccountId): Promise<Account | undefined>;

  getAccountTransactions: typeof getAccountTransactions;
}>;
