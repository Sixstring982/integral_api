import { Elysia } from "elysia";
import type { Server } from "./server";
import { logger } from "@bogeychan/elysia-logger";
import { injectable } from "tsyringe";
import type { EtherscanClient } from "../etherscan/etherscan_client";
import type { AccountsClient } from "../accounts/accounts_client";
import { AccountId } from "../accounts/account";

const PORT = 6982;

@injectable()
export class ServerImpl implements Server {
  constructor(
    private readonly accountsClient: AccountsClient,
    private readonly etherscanClient: EtherscanClient,
  ) { }

  listen(): void {
    new Elysia()
      .use(
        logger({
          level: "info",
        }),
      )
      .get("/accounts/:accountId/transactions", (request) => {
        return AccountId.schema.parseAsync(request.params.accountId)
          .then(accountId => this.accountsClient.getAccountById(accountId))
          .then(account => 
      })
      .listen(PORT);
  }
}
