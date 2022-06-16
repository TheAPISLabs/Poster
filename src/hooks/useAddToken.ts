// import { Currency, Token } from "@uniswap/sdk-core";
// import useActiveWeb3React from "hooks/useActiveWeb3React";
// import useCurrencyLogoURIs from "lib/hooks/useCurrencyLogoURIs";
import { useCallback, useState } from "react";
import { useWeb3React } from "@web3-react/core";

export default function useAddTokenToMetamask() {
  const { library } = useWeb3React();

  const [success, setSuccess] = useState<boolean | undefined>();

  const addToken = useCallback(() => {
    if (library && library?.provider?.isMetaMask && library.provider.request) {
      library.provider
        .request({
          method: "wallet_watchAsset",
          params: {
            // @ts-ignore // need this for incorrect ethers provider type
            type: "ERC20",
            options: {
              address: "0xfd4168e642EbD04C3684A6cDb3A5E86DE85d3908",
              symbol: "API",
              decimals: "18",
              image: "https://etherscan.io/token/images/theapis_32.png",
            },
          },
        })
        .then((success: any) => {
          setSuccess(success);
        })
        .catch(() => setSuccess(false));
    } else {
      setSuccess(false);
    }
  }, [library]);

  return { addToken, success };
}
