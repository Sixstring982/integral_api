import { Lifecycle, registry } from "tsyringe";
import { ACCOUNTS_CLIENT } from "./accounts_client";
import { HardcodedAccountsClient } from "./accounts_client_impl";

@registry([
  {
    token: ACCOUNTS_CLIENT,
    useClass: HardcodedAccountsClient,
    options: {
      lifecycle: Lifecycle.Singleton,
    },
  },
])
class AccountsRegistry {}
