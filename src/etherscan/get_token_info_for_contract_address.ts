import { z } from "zod";
import { Address } from "../address/address";

export type GetTokenInfoForContractAddressRequest = Readonly<{
  contractAddress: Address;
}>;

export type GetTokenInfoForContractAddressResponse = Readonly<{
  contractAddress: Address;
  symbol: string;
  decimals: number;
}>;

export function getTokenInfoForContractAddress(
  request: GetTokenInfoForContractAddressRequest,
): Promise<GetTokenInfoForContractAddressResponse> {
  const baseUri = "https://api.etherscan.io/api";
  const params = new URLSearchParams({
    module: "token",
    action: "tokeninfo",
    contractaddress: request.contractAddress,
    apikey: Bun.env.ETHERSCAN_API_KEY ?? "<no API key>",
  } satisfies Record<string, string>);

  const uri = `${baseUri}?${params.toString()}`;

  return fetch(uri)
    .then((response) => response.json())
    .then((response) =>
      z
        .object({
          status: z.literal("1"),
          message: z.literal("OK"),
          result: z.tuple([
            z.object({
              contractAddress: Address.schema,
              symbol: z.string(),
              divisor: z.coerce.number(),
            })
          ]),
        })
        .transform<GetTokenInfoForContractAddressResponse>((x) => ({
          contractAddress: x.result[0].contractAddress,
          symbol: x.result[0].symbol,
          decimals: x.result[0].divisor,
        }))
        .parseAsync(response),
    );
}
