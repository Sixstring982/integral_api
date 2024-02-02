import { HardcodedAccountsClient } from "./accounts/accounts_client_impl";
import { EtherscanClientImpl } from "./etherscan/etherscan_client_impl";
import { ServerImpl } from "./server/server_impl";

export function libMain(): void {
  const accountsClient = new HardcodedAccountsClient();
  const etherscanClient = new EtherscanClientImpl();
  const server = new ServerImpl(accountsClient, etherscanClient);

  server.listen();
}
