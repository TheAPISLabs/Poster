import React, { useState } from "react";
import styled from "styled-components";
import Blockie from "./Blockie";
import { ellipseAddress, getChainData } from "../helpers/utilities";
import { fonts, transitions } from "../styles";
import Button from "./Button";
import { isMobile } from "../../src/helpers/utilities";
// import ContractAddress from "src/utils/contract";
// import ClaimAbi from "../abi/Claim.js";
// import { useConnect } from "src/hooks/useConnect.js";
import { useWeb3React } from "@web3-react/core";
// import MetamaskConnect from "./MetamaskConnect";
// import { useEagerConnect } from "src/hooks/useMatemask.js";
// import Modal from "./Modal";
import aplImgs from "../assets/ApiLogo.png";
import WalletModal from "./WalletModal";
const SHeader = styled.div`
  margin-top: -1px;
  //   margin-bottom: 1px;
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  //   max-width: 100%;
  padding: 0 26%;
  background: #161426;
`;

const MSHeader = styled.div`
  margin-top: -1px;
  width: 100%;
  height: 96px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;

  background: #161426;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;
const SActiveAccount = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  font-weight: 500;
`;
const AplImg = styled.img`
  width: 139px;
  height: 38px;
`;
const MAplImg = styled.img`
  width: 100%;
`;
const DocsBox = styled.div`
  display: flex;
  width: 156px;
  justify-content: space-between;
`;
const Staking = styled.p`
  color: rgba(155, 155, 155, 1);
  font-size: 12px;
  font-weight: 500;
  text-align: center;
  line-height: 16px;
`;
const Point = styled.p`
  color: rgba(155, 155, 155, 1);
  font-size: 12px;
  font-weight: 500;
  text-align: center;
  line-height: 17px;
`;
const Docs = styled.p`
  color: rgba(255, 255, 255, 1);
  font-size: 12px;
  font-weight: 500;
  text-align: center;
  line-height: 16px;
`;
const Govern = styled.p`
  color: rgba(155, 155, 155, 1);
  font-size: 12px;
  font-weight: 500;
  text-align: left;
  line-height: 16px;
`;

const SActiveChain = styled(SActiveAccount as any)`
  flex-direction: column;
  text-align: left;
  align-items: flex-start;
  & p {
    font-size: 0.8em;
    margin: 0;
    padding: 0;
  }
  & p:nth-child(2) {
    font-weight: bold;
  }
`;

const SBlockie = styled(Blockie as any)`
  margin-right: 10px;
`;

interface IHeaderStyle {
  connected: boolean;
}

const SAddress = styled.p<IHeaderStyle>`
  transition: ${transitions.base};
  font-weight: bold;
  margin: ${({ connected }) => (connected ? "-2px auto 0.7em" : "0")};
  color: #fff;
`;

// const SUnsupportedChain = styled.div`
//   transition: ${transitions.base};
//   font-weight: bold;
//   color: red;
// `;

const SDisconnect = styled.div<IHeaderStyle>`
  transition: ${transitions.button};
  font-size: 12px;
  font-family: monospace;
  position: absolute;
  right: 0;
  top: 20px;
  opacity: 0.7;
  cursor: pointer;

  &:hover {
    // transform: translateY(-1px);
    opacity: 0.5;
  }
  color: #fff;
`;
const SConnectButton = styled(Button as any)`
  border-radius: 8px;
  font-size: ${fonts.size.medium};
  margin: 12px 0;
  background: #6639e5;
  border-radius: 16px;
  width: 197px;
  height: 32px;
  color: #fff;
  & > div {
    background: transparent !important;
  }
`;
const MSConnectButton = styled(Button as any)`
  border-radius: 8px;
  font-size: ${fonts.size.medium};
  margin: 12px 0;
  background: #6639e5;
  border-radius: 16px;
  width: 140px;
  height: 40px;
  color: #fff;
  & > div {
    background: transparent !important;
  }
`;

interface IHeaderProps {
  killSession: () => void;
  connected: boolean;
  connect: () => void;
  fetching: boolean;
}

const Header = ({ connected, killSession, connect, fetching }: IHeaderProps) => {
  let activeChain = null;
  const { account, chainId, deactivate } = useWeb3React();
  const [isShowModal, setIsShowModal] = useState(false);
  //   const triedEager = useEagerConnect();
  try {
    activeChain = chainId ? getChainData(chainId).name : null;
    console.log(activeChain);
  } catch (error) {
    console.error(error);
  }

  //   const ClaimContract = useConnect(ClaimAbi, ContractAddress.claim[chainId ?? 1]);
  //   const claimToken = () => {
  //     ClaimContract.methods.claimTokens().send({ from: account });
  //   };

  return isMobile() ? (
    <>
      <MSHeader>
        {account ? (
          <SActiveAccount>
            <SBlockie address={account} />
            {activeChain ? (
              <SAddress connected={connected}>{ellipseAddress(account)}</SAddress>
            ) : (
              <SAddress connected={connected}>Chain not supported.</SAddress>
            )}
            <SDisconnect
              connected={connected}
              onClick={() => {
                killSession();
                deactivate();
              }}
            >
              {activeChain} {"Disconnect"}
            </SDisconnect>
          </SActiveAccount>
        ) : (
          <>
            <MSConnectButton
              onClick={() => {
                setIsShowModal(true);
              }}
            >
              {" "}
              {"Connect"}
            </MSConnectButton>
          </>
        )}
        <SActiveChain>
          <a href="https://www.theapis.xyz/">
            <MAplImg src="https://etherscan.io/token/images/theapis_32.png" />
          </a>
        </SActiveChain>

        <WalletModal
          setIsShowModal={setIsShowModal}
          isShowModal={isShowModal}
          connect={connect}
          fetching={fetching}
        />
      </MSHeader>
    </>
  ) : (
    <>
      <SHeader>
        <SActiveChain>
          <a href="https://www.theapis.xyz/">
            {/* <p>Connected to</p>
              <p>{activeChain}</p> */}
            {/* <SConnectButton onClick={claimToken} left fetching={fetching}>
            {"Claim"}
          </SConnectButton> */}
            <AplImg src={aplImgs} />
          </a>
        </SActiveChain>
        <DocsBox>
          <Staking>Staking</Staking>
          <Point>·</Point>
          <Docs>Docs</Docs>
          <Point>·</Point>
          <Govern>Govern</Govern>
        </DocsBox>
        {account ? (
          <SActiveAccount>
            <SBlockie address={account} />
            {activeChain ? (
              <SAddress connected={connected}>{ellipseAddress(account)}</SAddress>
            ) : (
              <SAddress connected={connected}>Chain not supported.</SAddress>
            )}
            <SDisconnect
              connected={connected}
              onClick={() => {
                killSession();
                deactivate();
              }}
            >
              {activeChain} {"Disconnect"}
            </SDisconnect>
          </SActiveAccount>
        ) : (
          <>
            <SConnectButton
              onClick={() => {
                setIsShowModal(true);
              }}
            >
              {" "}
              {"Connect"}
            </SConnectButton>
          </>
        )}
        {/* <Modal
        show={isShowModal}
        opacity={0.2}
        toggleModal={() => {
          setIsShowModal(false);
        }}
      >
        <MetamaskConnect triedEager={triedEager} />
        <SConnectButton right onClick={connect} fetching={fetching}>
          {"Connect"}
        </SConnectButton>
      </Modal> */}
        <WalletModal
          setIsShowModal={setIsShowModal}
          isShowModal={isShowModal}
          connect={connect}
          fetching={fetching}
        />
      </SHeader>
    </>
  );
};

export default Header;
