import * as React from "react";
import { useEagerConnect } from "src/hooks/useMatemask.js";
import { fonts } from "src/styles";
import styled from "styled-components";
// import Button from "./Button";
import MetamaskConnect from "./MetamaskConnect";
import Modal from "./Modal";
import rightArrow from "../assets/rightArrow.png";
import walletconnect from "../assets/walletconnect.png";
import "../page/index/index.css";
// const SConnectButton = styled(Button as any)`
//   border-radius: 8px;
//   font-size: ${fonts.size.medium};
//   margin: 12px 0;
//   background: #6639e5;
//   border-radius: 16px;
//   width: 197px;
//   height: 32px;
//   color: #fff;
//   & > div {
//     background: transparent !important;
//   }
// `;
const SConnectButton = styled.div`
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
  cursor: pointer;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
`;
const WalletBoxLeft = styled.div`
  display: flex;
  align-items: center;
`;
const WalletBoxRight = styled.div``;
const Image = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 10px;
`;

const ArrowImage = styled.img`
  width: 10px;
  height: 14px;
`;
const ModalTitle = styled.p`
  font-weight: 600;
  font-size: 36px;
  line-height: 24px;
  color: #fcfcfd;
  margin-bottom: 66px;
`;
const WalletText = styled.p`
  color: rgba(100, 95, 135, 1);
  font-size: 14px;
`;

interface IWalletModal {
  isShowModal: boolean;
  connect: () => void;
  fetching: boolean;
  setIsShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const WalletModal = ({ isShowModal, connect, setIsShowModal, fetching }: IWalletModal) => {
  const triedEager = useEagerConnect();

  return (
    <Modal
      show={isShowModal}
      opacity={0.2}
      toggleModal={() => {
        setIsShowModal(false);
      }}
    >
      <ModalTitle>connect your wallet</ModalTitle>
      <MetamaskConnect setIsShow={setIsShowModal} triedEager={triedEager} />
      <SConnectButton
        onClick={() => {
          connect();
          setIsShowModal(false);
        }}
      >
        <WalletBoxLeft>
          <Image src={walletconnect} />
          {"connect"}
        </WalletBoxLeft>
        <WalletBoxRight>
          <ArrowImage src={rightArrow} />
        </WalletBoxRight>
      </SConnectButton>
      <WalletText>More wallet options coming soon.</WalletText>
    </Modal>
  );
};

export default WalletModal;
