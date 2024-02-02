import { Elysia, NotFoundError } from "elysia";
import type { Server } from "./server";
import { logger } from "@bogeychan/elysia-logger";
import type { EtherscanClient } from "../etherscan/etherscan_client";
import type { AccountsClient } from "../accounts/accounts_client";
import { AccountId } from "../accounts/account";

const PORT = 6982;

export class ServerImpl implements Server {
  constructor(
    private readonly accountsClient: AccountsClient,
    private readonly etherscanClient: EtherscanClient,
  ) { }

  listen(): void {
    console.info(`Starting server on port ${PORT}.`);
    new Elysia()
      .use(
        logger({
          level: "info",
        }),
      )
      .onError(({ code, error, set }) => {
        switch (code) {
          case "NOT_FOUND": {
            set.status = 404;
            return "Not found.";
          }
          default: {
            set.status = 500;
            return error;
          }
        }
      })
      .get("/accounts/:accountId/transactions", (request) => {
        const accountId = request.params.accountId;

        return AccountId.schema
          .parseAsync(accountId)
          .then((accountId) => this.accountsClient.getAccountById(accountId))
          .then((account) => {
            if (account === undefined) throw new NotFoundError();

            return this.etherscanClient
              .listNormalTransactionsByAddress({
                address: account.address,
              })
              .then((transactions) => ({
                account,
                transactions: transactions.transactions,
              }));
          })
          .then(({ account, transactions }) => {
            const tokenInfoPromises = transactions.flatMap((tx) => {
              if (tx.contractAddress === undefined) return [];

              return [
                this.etherscanClient.getTokenInfoForContractAddress({
                  contractAddress: tx.contractAddress,
                }),
              ];
            });

            return Promise.all(tokenInfoPromises).then((infos) => {
              const tokenInfos = Object.fromEntries(
                transactions.flatMap((tx) => {
                  if (tx.contractAddress === undefined) return [];

                  const info = infos.find(
                    (x) => x.contractAddress === tx.contractAddress,
                  );
                  if (info === undefined) return [];

                  return [[tx.contractAddress, info]];
                }),
              );

              return { account, transactions, tokenInfos };
            });
          })
          .then(({ account, transactions, tokenInfos }) => {
            request.set.status = 200;
            request.set.headers["Content-Type"] = "application/json";

            return {
              data: transactions.map((tx) => ({
                accountId: account.id,
                toAddress: tx.to,
                fromAddress: tx.from,
                type: tx.to === "" ? "withdraw" : "deposit",
                amount: tx.value,
                symbol: tokenInfos[tx.contractAddress ?? '']?.symbol ?? "ETH",
              })),
            };
          });
      })
      .listen(PORT);
  }
}
