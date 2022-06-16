import { useWeb3React } from "@web3-react/core";
import React from "react";
import { useInactiveListener } from "src/hooks/useMatemask.js";
import { fonts } from "src/styles";
import styled from "styled-components";
import { injected } from "../utils/metaskConnect";
import metamask from "../assets/metamask.png";
import rightArrow from "../assets/rightArrow.png";

const MetaMaskBox = styled.div`
  border-radius: 8px;
  font-size: ${fonts.size.medium};
  height: 90px;
  width: 100%;
  background: #1c1930;
  color: rgba(255, 255, 255, 1);
  font-size: 16px;
  padding: 0 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  border-bottom: 1px solid #97979759;
`;
const MetaMaskBoxLeft = styled.div`
  display: flex;
  align-items: center;
`;
const MetaMaskBoxRight = styled.div``;
const Image = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 10px;
`;

const ArrowImage = styled.img`
  width: 10px;
  height: 14px;
`;

function MetamaskConnect(props: {
  triedEager: any;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const context = useWeb3React();
  const { connector, chainId, activate, deactivate, error } = context;

  const [activatingConnector, setActivatingConnector] = React.useState();
  React.useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  const activating = injected === activatingConnector;
  const disabled = !props.triedEager || !!activatingConnector || !!error;

  useInactiveListener(!props.triedEager || !!activatingConnector);

  const isDisconnect = !error && chainId;
  const buttonText = isDisconnect ? "Disconnect" : activating ? "Connectting" : "MetaMask";

  return (
    <MetaMaskBox
      style={{
        cursor: disabled ? "unset" : "pointer",
        position: "relative",
      }}
      className="ConnectButton"
      onClick={() => {
        if (!isDisconnect) {
          setActivatingConnector(injected as any);
          activate(injected);
          props.setIsShow(false);
        } else {
          deactivate();
        }
      }}
    >
      <MetaMaskBoxLeft>
        <Image src={metamask} />
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            height: "100%",
            display: "flex",
            alignItems: "center",
            color: "black",
            margin: "0 0 0 1rem",
          }}
        >
          {activating}
        </div>
        {buttonText}
      </MetaMaskBoxLeft>
      <MetaMaskBoxRight>
        <ArrowImage src={rightArrow} />
      </MetaMaskBoxRight>
    </MetaMaskBox>
  );
}
export default MetamaskConnect;
