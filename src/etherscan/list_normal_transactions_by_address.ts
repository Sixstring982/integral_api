import { z } from "zod";
import type { Address } from "../address/address";
import { EtherscanTransaction } from "./etherscan_transaction";

export type ListNormalTransactionsByAddressRequest = Readonly<{
  address: Address;
}>;

export type ListNormalTransactionsByAddressResponse = Readonly<{
  transactions: readonly EtherscanTransaction[];
}>;

export function listNormalTransactionsByAddress(
  request: ListNormalTransactionsByAddressRequest,
): Promise<ListNormalTransactionsByAddressResponse> {
  const baseUri = "https://api.etherscan.io/api";
  const params = new URLSearchParams({
    module: "account",
    action: "txlist",
    address: request.address,
    startblock: "0",
    endblock: "99999999",
    page: "1",
    offset: "10",
    sort: "asc",
    apikey: Bun.env.ETHERSCAN_API_KEY ?? "<no API key>",
  } satisfies Record<string, string>);

  const uri = `${baseUri}${params.toString()}`;

  return fetch(uri)
    .then((response) => response.json())
    .then((response) =>
      z
        .object({
          status: z.literal("1"),
          message: z.literal("OK"),
          result: z.array(EtherscanTransaction.schema),
        })
        .transform<ListNormalTransactionsByAddressResponse>((x) => ({
          transactions: x.result,
        }))
        .parseAsync(response),
    );
}
