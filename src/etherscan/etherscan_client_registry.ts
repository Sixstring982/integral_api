import { Lifecycle, registry } from "tsyringe";
import { ETHERSCAN_CLIENT } from "./etherscan_client";
import { EtherscanClientImpl } from "./etherscan_client_impl";

@registry([
  {
    token: ETHERSCAN_CLIENT,
    useClass: EtherscanClientImpl,
    options: {
      lifecycle: Lifecycle.Singleton,
    },
  },
])
class EtherscanClientRegistry {}
