import type { Transaction } from "../transactions/transaction";

export type GetAccountTransactionsRequest = Readonly<{}>;

export type GetAccountTransactionsResponse = Readonly<{
  data: ReadonlyArray<Transaction>;
}>;

export function getAccountTransactions(
  request: GetAccountTransactionsRequest,
): Promise<GetAccountTransactionsResponse> {
  return Promise.reject(new Error("Implement me!"));
}
