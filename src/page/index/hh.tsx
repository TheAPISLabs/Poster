import React, { useState, useEffect } from "react";
import Column from "src/components/Column";
// import { useConnect } from "src/hooks/useConnect.js";
import styled from "styled-components";
// import TokenAbi from "../../abi/Token.js";
// import StakeAbi from "../../abi/TokenStaking.js";
// import { useWeb3React } from "@web3-react/core";
// import ContractAddress from "src/utils/contract";
// import { ethers } from "ethers";
// import { BigNumber as BN, ethers } from "ethers";
// import web3 from "src/utils/web3.js";
// import BigNumber from "bignumber.js";
import ContractAddress from "src/utils/contract";

import "./index.css";
// import congratsImgs from "../../assets/Congrats.gif";
import WillImgs from "../../assets/APIS-logo 1.png";
import { useConnect } from "src/hooks/useConnect.js";
import ClaimContractAbi from "src/abi/Claim.js";

import { useWeb3React } from "@web3-react/core";
import whiteAddress from "src/commen/whiteList.js";
import Button from "src/components/Button";
import { fonts } from "src/styles";
import { isMobile } from "src/helpers/utilities";
import WalletModal from "src/components/WalletModal";
import useAddTokenToMetamask from "src/hooks/useAddToken";

const StakingTitleApi = styled.p`
  font-weight: 500;
  font-size: 48px;
  line-height: 58px;
  text-align: center;
  width: 78px;
  height: 58px;
  color: #fcfcfd;
  margin-right: 22px;
`;
const MStakingTitleApi = styled.p`
  font-weight: 500;
  font-size: 28px;
  line-height: 35px;
  text-align: center;
  width: 47px;
  height: 35px;
  color: #fcfcfd;
  margin-right: 9px;
`;
const StakingTitleStak = styled.p`
  font-weight: 500;
  font-size: 48px;
  line-height: 58px;
  text-align: center;
  color: #827790;
  width: 197px;
  height: 58px;
  margin-right: 15px;
`;
const MStakingTitleStak = styled.p`
  font-weight: 500;
  font-size: 28px;
  line-height: 35px;
  text-align: center;
  color: #827790;
  width: 104px;
  height: 35px;
  margin-right: 13px;
`;
const StakingTitleDashboard = styled.p`
  font-weight: 500;
  font-size: 48px;
  line-height: 58px;
  text-align: center;
  color: #fcfcfd;
  width: 251px;
  height: 58px;
  margin-right: 15px;
`;
const MStakingTitleDashboard = styled.p`
  font-weight: 500;
  font-size: 28px;
  line-height: 35px;
  text-align: center;
  color: #fcfcfd;
  width: 151px;
  height: 35px;
`;

const Trade = styled.p`
  width: 332.8px;
  height: 53px;
  opacity: 1;
  color: rgba(155, 155, 155, 1);
  font-size: 14px;
  font-weight: 400;
  text-align: center;
  line-height: 26.2px;
  margin-bottom: 26px;
`;
const Row = styled.div`
  display: flex;
  //   padding: 0px 57px 0px 68px;
  box-sizing: border-box;
  width: 100%;
`;
const MyStaking = styled.div`
  padding: 12px 16px;
  box-sizing: border-box;
  width: 301px;
  height: 431px;
  border-radius: 10px;
  opacity: 1;
  border: 0.5px solid rgba(155, 155, 155, 0.3);
  background: rgba(13, 10, 36, 1);
  &:hover {
    border: 0.5px solid #6639e5;
  }
`;
const MyStakingTitle = styled.p`
  color: rgba(252, 252, 253, 1);
  font-size: 16px;
  font-weight: 400;
  text-align: left;
  margin-bottom: 24px;
`;
const MyStakingUl = styled.ul`
  width: 171px;
  height: 45px;
  border-radius: 7px;
  display: flex;
  border: 0.5px solid #322e4b;
  padding: 6px 12px;
`;
const MyStakingLi = styled.li`
  width: 70.27px;
  height: 32px;
  border-radius: 4px;
  opacity: 1;
  background: rgba(102, 57, 229, 1);
  color: rgba(255, 255, 255, 1);
  font-size: 12px;
  font-weight: 400;
  text-align: center;
  line-height: 33px;
  margin: auto;
  cursor: pointer;
`;
const MyStakeUl = styled.ul``;
const MyStakeLi = styled.li`
  margin-top: 22px;
`;
const MyStakingNumBox = styled.div`
  width: 273px;
  height: 42px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 7px;
  display: flex;
  justify-content: space-between;
  padding: 12px;
`;
const StakingNum = styled.div`
  color: rgba(255, 255, 255, 1);
  font-size: 12px;
  font-weight: 400;
  text-align: center;
`;
const StakingOptions = styled.div`
  display: flex;
  width: 81px;
  justify-content: space-between;
`;
const Msx = styled.div`
  color: rgba(150, 145, 181, 1);
  font-size: 12px;
  font-weight: 400;
  font-family: "Inter";
  text-align: center;
`;
const StakingWrap = styled.div`
  background: #161426;
`;
const MStakingWrap = styled.div`
  background: #161426;
`;
const StakingTitle = styled.div`
  display: flex;
`;
const MStakingTitle = styled.div`
  display: flex;
  margin-top: 64px;
`;
const TOTALBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 59px;
`;
const TotalStaked = styled.div``;
const TOTALSTAKEDTitle = styled.div`
  color: rgba(119, 126, 144, 1);
  font-size: 12px;
  font-weight: 400;
  /* font-family: "Inter"; */
  text-align: center;
  margin-bottom: 19px;
`;
const TotalNumBox = styled.div`
  display: flex;
  align-items: center;
`;
const TotalNum = styled.div`
  color: rgba(195, 177, 246, 1);
  font-size: 24px;
  font-weight: 400;
  font-family: "Helvetica";
  text-align: center;
  line-height: 24px;
  margin-right: 12px;
`;
const TotalApi = styled.div`
  color: rgba(119, 126, 144, 1);
  font-size: 10px;
  font-weight: 400;
  font-family: "Inter";
  text-align: center;
`;
const AVAILAABLE = styled.div``;
const StakeOrClaim = styled.div`
  width: 125px;
  height: 36px;
  margin-top: 105px;
  margin-left: -737px;
`;
const MStakeOrClaim = styled.div`
  width: 125px;
  height: 36px;
`;
const StakeOrClaimUl = styled.ul`
  display: flex;
  justify-content: space-between;
`;
const StakeOrClaimLiS = styled.li`
  color: rgba(119, 126, 144, 1);
  font-size: 18px;
  font-weight: 400;
  font-family: "Inter";
  //   pointer-events: none;
  cursor: not-allowed;
`;
const StakeOrClaimLiSe = styled.li`
  color: rgba(119, 126, 144, 1);
  font-size: 18px;
  font-weight: 400;
  font-family: "Inter";
  cursor: pointer;
`;
const PENDING = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
`;
const NextClaim = styled.div`
  margin-top: 25px;
`;
const NextClaimIn = styled.div`
  color: rgba(102, 57, 229, 1);
  font-size: 10px;
  font-weight: 400;
  text-align: right;
`;
const Blocks = styled.div`
  color: rgba(102, 57, 229, 1);
  font-size: 10px;
  font-weight: 400;
  text-align: left;
`;
const TotalStakedBox = styled.div`
  width: 279px;
  height: 163px;
  border-radius: 10px;
  border: 0.5px solid rgba(155, 155, 155, 0.3);
  padding: 15px 8px 13px 26px;
  margin-bottom: 20px;
  &:hover {
    border: 0.5px solid #6639e5;
  }
`;
const TotalStakedBoxTitle = styled.div`
  color: rgba(252, 252, 253, 1);
  font-size: 16px;
  font-weight: 400;
  text-align: left;
  line-height: 24px;
`;

const BTCUSDT = styled.div`
  color: rgba(177, 181, 195, 1);
  font-size: 12px;
  font-weight: 400;
  text-align: left !important;
  line-height: 20px;
  margin-top: 29px;
  margin-bottom: 6px;
`;
const BTCUSDTS = styled.div`
  color: rgba(177, 181, 195, 1);
  font-size: 12px;
  font-weight: 400;
  text-align: left;
  line-height: 20px;
  margin-top: 29px;
  margin-bottom: 6px;
`;
const Btc = styled.div`
  display: flex;
`;
const AxsNum = styled.div`
  color: rgba(252, 252, 253, 1);
  font-size: 24px;
  font-weight: 400;
  text-align: left;
  line-height: 24px;
  margin-right: 7px;
`;
const Axs = styled.div`
  color: rgba(177, 181, 195, 1);
  font-size: 12px;
  font-weight: 400;
  text-align: left;
  line-height: 20px;
`;
const AxsNums = styled.div`
  color: rgba(252, 252, 253, 1);
  font-size: 12px;
  font-weight: 400;
  text-align: left;
  line-height: 20px;
  margin-top: 4px;
`;
const APIPriceBox = styled.div`
  width: 279px;
  height: 102px;
  border: 0.5px solid rgba(155, 155, 155, 0.3);
  padding: 20px 26px;
  border-radius: 10px;
  margin-bottom: 21px;
  &:hover {
    border: 0.5px solid #6639e5;
  }
`;
const APIPriceTitle = styled.div`
  color: rgba(155, 155, 155, 1);
  font-size: 12px;
  font-weight: 400;
  text-align: left;
  line-height: 20px;
  margin-right: 22px;
`;
const DAILYTitle = styled.div`
  color: rgba(255, 255, 255, 1);
  font-size: 12px;
  font-weight: 400;
  text-align: left;
  line-height: 20px;
`;
const APIPriceNum = styled.div`
  color: rgba(252, 252, 253, 1);
  font-size: 24px;
  font-weight: 400;
  text-align: left;
  line-height: 32px;
`;
const ClaimBox = styled.div`
  width: 899px;
  height: 348px;
  border: 0.5px solid rgba(155, 155, 155, 0.3);
  &:hover {
    border: 0.5px solid #6639e5;
  }
  padding: 92px 33px 30px 56px;
  position: relative;
`;
const MClaimBox = styled.div`
  height: 480px;
  border-bottom: 0.5px solid rgba(155, 155, 155, 0.3);
  padding: 92px 30px 0px 30px;
  position: relative;
`;

const SorryBox = styled.div`
  width: 899px;
  height: 348px;
  border: 0.5px solid rgba(155, 155, 155, 0.3);
  padding: 92px 33px 30px 56px;
  &:hover {
    border: 0.5px solid #6639e5;
  }
`;
const MSorryBox = styled.div`
  height: 480px;
  border-bottom: 0.5px solid rgba(155, 155, 155, 0.3);
  padding: 92px 30px 0px 30px;
  position: relative;
`;
const Congrats = styled.p`
  color: rgba(252, 252, 253, 1);
  font-size: 36px;
  font-weight: 600;
  text-align: center;
  line-height: 24px;
  position: relative;
  z-index: 1;
`;
const MCongrats = styled.p`
  color: rgba(252, 252, 253, 1);
  font-size: 36px;
  font-weight: 600;
  text-align: center;
  line-height: 24px;
  position: relative;
  z-index: 1;
`;
const ClaimForm = styled.div`
  width: 810px;
  height: 83px;
  border: 1px solid #6639e5;
  border-radius: 10px;
  margin-top: 48px;
  display: flex;
  justify-content: space-between;
  padding: 17px 32px;
`;
const MClaimForm = styled.div`
  width: 297px;
  height: 83px;
  border: 1px solid #6639e5;
  border-radius: 10px;
  padding: 17px 32px;
  margin: auto;
  margin-top: 40px;
`;
const Receive = styled.div`
  z-index: 1;
  position: relative;
`;
const CongratsImg = styled.img`
  position: absolute;
  top: -11px;
  left: 106px;
  z-index: 0;
  width: 700px;
  opacity: 0;
  animation: fadenum 1.5s;
  @keyframes fadenum {
    0% {
      opacity: 0;
    }
    99% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;
const MCongratsImg = styled.img`
  position: absolute;
  top: -16px;
  left: -162px;
  z-index: 0;
  width: 700px;
  opacity: 0;
  animation: fadenum 1.5s;
  @keyframes fadenum {
    0% {
      opacity: 0;
    }
    99% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

const Will = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: #b1b5c3;
  text-align: center;
`;
const WillNum = styled.div`
  color: rgba(252, 252, 253, 1);
  font-size: 24px;
  font-weight: 400;
  text-align: center;
  line-height: 32px;
`;
const ClaimBtn = styled.div`
  width: 198px;
  height: 46px;
  border-radius: 18px;
  background: linear-gradient(180deg, rgba(159, 107, 244, 1) 0%, rgba(102, 57, 229, 1) 100%);
  color: rgba(255, 255, 255, 1);
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  line-height: 46px;
  cursor: pointer;
  z-index: 100;
  &:hover {
    opacity: 0.5;
  }
  z-index: 100;
`;
const MClaimBtn = styled.div`
  width: 198px;
  height: 46px;
  border-radius: 18px;
  background: linear-gradient(180deg, rgba(159, 107, 244, 1) 0%, rgba(102, 57, 229, 1) 100%);
  color: rgba(255, 255, 255, 1);
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  line-height: 46px;
  cursor: pointer;
  margin: auto;
  margin-top: 80px;
  z-index: 1;
  position: relative;
  &:hover {
    opacity: 0.5;
  }
`;
const SorryBtn = styled.div`
  width: 198px;
  height: 46px;
  border-radius: 18px;
  background: linear-gradient(180deg, rgba(159, 107, 244, 1) 0%, rgba(102, 57, 229, 1) 100%);
  color: rgba(255, 255, 255, 1);
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  line-height: 46px;
  cursor: pointer;
  margin: auto;
  margin-top: 38px;
  &:hover {
    transform: translateY(-1px);
    opacity: 0.5;
  }
`;
const MSorryBtn = styled.div`
  width: 198px;
  height: 46px;
  border-radius: 18px;
  background: linear-gradient(180deg, rgba(159, 107, 244, 1) 0%, rgba(102, 57, 229, 1) 100%);
  color: rgba(255, 255, 255, 1);
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  line-height: 46px;
  cursor: pointer;
  margin: auto;
  margin-top: 51px;
  &:hover {
    transform: translateY(-1px);
    opacity: 0.5;
  }
`;
const CongratTest = styled.p`
  width: 209px;
  color: rgba(119, 126, 144, 1);
  font-size: 12px;
  font-weight: 400;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;
const SorryTest = styled.div`
  width: 436px;
  color: rgba(119, 126, 144, 1);
  font-size: 12px;
  font-weight: 400;
  margin: 0 auto;
`;
const MSorryTest = styled.div`
  width: 307px;
  color: rgba(119, 126, 144, 1);
  font-size: 12px;
  font-weight: 400;
  margin: 0 auto;
`;
const FoodBox = styled.div`
  width: 100%;
  background: #1c1930;
  margin-top: 275px;
  padding: 87px;
`;
const MFoodBox = styled.div`
  width: 100%;
  background: #1c1930;
`;
const GetStartedBox = styled.div`
  margin: 0 auto;
  width: 1023px;
  border-bottom: 1px solid rgba(50, 46, 75, 1);
`;
const MGetStartedBox = styled.div`
  margin: 0 auto;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(50, 46, 75, 1);
`;
const Looks = styled.p`
  color: rgba(126, 126, 126, 1);
  font-size: 12px;
  font-weight: 400;
  text-align: center;
  line-height: 16px;
  margin-bottom: 28px;
`;

const Powers = styled.p`
  color: rgba(130, 119, 144, 1);
  font-size: 21px;
  font-weight: 400;
  text-align: center;
  line-height: 16px;
  margin-bottom: 26px;
  font-family: "Inter";
`;
const TheRates = styled.div`
  width: 758px;
  color: rgba(155, 155, 155, 1);
  font-size: 11px;
  font-weight: 400;
  margin: 0 auto;
  line-height: 14.2px;
  margin-top: 58px;
`;
const MTheRates = styled.div`
  width: 374px;
  color: rgba(155, 155, 155, 1);
  font-size: 11px;
  font-weight: 400;
  margin: 0 auto;
  line-height: 14.2px;
`;
const TheRat = styled.div`
  width: 815px;
  height: 29px;
  color: rgba(155, 155, 155, 1);
  font-size: 11px;
  font-weight: 400;
  margin: 0 auto;
  line-height: 14.2px;
  margin-bottom: 62px;
`;
const CopyrightBox = styled.div`
  margin: 0 auto;
  width: 1023px;
  padding-top: 58px;
`;
const MCopyrightBox = styled.div`
  margin: 0 auto;
  width: 299px;
  padding-top: 45px;
`;
const CopyrightTitle = styled.div`
  display: flex;
`;
const MCopyrightTitle = styled.div``;
const Copyright = styled.p`
  color: rgba(152, 158, 172, 1);
  font-size: 12px;
  font-weight: 400;
  text-align: left;
  line-height: 24px;
  margin-right: 20px;
  margin-bottom: 30px;
`;
const MCopyright = styled.p`
  color: rgba(152, 158, 172, 1);
  font-size: 12px;
  font-weight: 400;
  text-align: left;
  line-height: 24px;
  margin-right: 20px;
  margin-bottom: 30px;
`;
const Blockchains = styled.p`
  color: rgba(152, 158, 172, 1);
  font-size: 12px;
  font-weight: 400;
  text-align: left;
  line-height: 24px;
`;
const MBlockchains = styled.p`
  color: rgba(152, 158, 172, 1);
  font-size: 12px;
  font-weight: 400;
  text-align: left;
  line-height: 24px;
  margin-bottom: 20px;
`;
const LinkBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 569px;
`;
const MLinkBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 299px;
`;
const MXLinkBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 299px;
  margin-bottom: 39px;
`;
const Link = styled.a`
  color: rgba(195, 177, 246, 1);
  font-size: 14px;
  font-weight: 400;
  text-align: left;
  line-height: 24px;
  &:hover {
    // transform: translateY(-1px);
    opacity: 0.5;
  }
`;
const WillImgAndNum = styled.div`
  display: flex;
  align-items: center;
`;
const MWillImgAndNum = styled.div`
  display: flex;
  justify-content: space-around;
  margin: auto;
  width: 147px;
`;
const WillImg = styled.img`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #fff;
`;
const MWillImg = styled.img`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #fff;
  margin-top: 3px;
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
  font-size: ${fonts.size.large};
  margin: 80px 0;
  background: linear-gradient(180deg, rgba(159, 107, 244, 1) 0%, rgba(102, 57, 229, 1) 100%);
  border-radius: 18px;
  width: 198px;
  height: 46px;
  color: #fff;
  & > div {
    background: transparent !important;
  }
`;
const APIBox = styled.div`
  display: flex;
  align-items: center;
`;
const APINum = styled.div`
  color: rgba(252, 252, 253, 1);
  font-size: 12px;
  font-weight: 400;
  line-height: 24px;
  width: 58px;
  height: 24px;
  border-radius: 24px;
  background: rgba(255, 104, 56, 1);
`;
const BuyAndAddBox = styled.div`
  width: 323px;
  margin: auto;
  display: flex;
  justify-content: space-between;
`;
const MBuyAndAddBox = styled.div`
  width: 327px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  margin-bottom: 48px;
`;
const BuyBoxBtn = styled.a`
  border: 1px solid #787879;
  border-radius: 4px;
  width: 144px;
  height: 40px;
  display: flex;
  justify-content: space-around;
  padding: 0px 24px;
  cursor: pointer;
  &:hover {
    border: 0.5px solid #6639e5;
  }
`;
const AddToBtn = styled.a`
  border: 1px solid #787879;
  border-radius: 4px;
  width: 144px;
  height: 40px;
  display: flex;
  justify-content: space-around;
  padding: 0px 18px;
  cursor: pointer;
  &:hover {
    border: 0.5px solid #6639e5;
  }
`;
const BuyLook = styled.div`
  font-weight: 500;
  font-size: 12px;
  line-height: 40px;
  text-align: center;
  color: #ffffff;
`;
const AddTo = styled.div`
  font-weight: 500;
  font-size: 12px;
  line-height: 40px;
  text-align: center;
  color: #ffffff;
`;
const BuyIcon = styled.div`
  color: #ffffff;
  font-size: 16px;
  line-height: 40px;
`;

interface IHome {
  killSession: () => void;
  connected: boolean;
  connect: () => void;
  fetching: boolean;
}
export default function Home({ connected, killSession, connect, fetching }: IHome) {
  const { chainId, account } = useWeb3React();

  //   const TokenContract = useConnect(TokenAbi, ContractAddress.token[chainId ?? 1]);
  const claimToken = () => {
    const ClaimContract = useConnect(ClaimContractAbi, ContractAddress.claim[chainId ?? 1]);

    // console.log(account, ClaimContract);
    // ClaimContract.methods.claimTokens();
    ClaimContract.methods.claimTokens().send({ from: account });
  };
  const [currentLi, setCurrentLi] = useState(1);
  const [claimStatus, setClaimStatus] = useState(0);
  const [isShowModal, setIsShowModal] = useState(false);
  const { addToken } = useAddTokenToMetamask();
  const [CongratsData, setCongratsData] = useState({
    WillNum: "500",
  });
  useEffect(() => {
    if (!account) {
      return;
    }
    const isWhiteAddress = whiteAddress.includes(account);
    setClaimStatus(isWhiteAddress ? 2 : 1);
    setCongratsData({
      WillNum: "500",
    });
  }, [account]);
  const currentClass = (index: number) => {
    return currentLi === index ? (
      <MyStakeUl>
        <MyStakeLi>
          <MyStakingNumBox>
            <StakingNum>1111</StakingNum>
            <StakingOptions>
              <Msx>Max</Msx>
              <Msx>Stake</Msx>
            </StakingOptions>
          </MyStakingNumBox>
        </MyStakeLi>
        <MyStakeLi>
          <></>
        </MyStakeLi>
      </MyStakeUl>
    ) : (
      <>
        {" "}
        <MyStakeUl>
          <MyStakeLi>
            <MyStakingNumBox>
              <StakingNum>1525</StakingNum>
              <StakingOptions>
                <Msx>Max</Msx>
                <Msx>Stake</Msx>
              </StakingOptions>
            </MyStakingNumBox>
          </MyStakeLi>
        </MyStakeUl>
      </>
    );
  };
  const [StakeOrClaimLi, setStakeOrClaimLi] = useState(2);
  const StakeOrClaimClass = (index: number) => {
    return StakeOrClaimLi === index ? (
      <>
        <Row>
          <Column maxWidth={301}>
            <MyStaking>
              <MyStakingTitle>My API Staking</MyStakingTitle>
              <MyStakingUl>
                <MyStakingLi
                  onClick={() => {
                    setCurrentLi(1);
                  }}
                  style={{
                    backgroundColor: currentLi === 1 ? "rgba(102,57,229,1)" : "rgba(13,10,36,1)",
                    color: currentLi === 1 ? "#FFFFFF" : "#9691B5",
                  }}
                >
                  Stake
                </MyStakingLi>
                <MyStakingLi
                  onClick={() => {
                    setCurrentLi(2);
                  }}
                  style={{
                    backgroundColor: currentLi === 2 ? "rgba(102,57,229,1)" : "rgba(13,10,36,1)",
                    color: currentLi === 2 ? "#FFFFFF" : "#9691B5",
                  }}
                >
                  Unstake
                </MyStakingLi>
              </MyStakingUl>
              {currentClass(1)}
              <TOTALBox>
                <TotalStaked>
                  <TOTALSTAKEDTitle>TOTAL STAKED</TOTALSTAKEDTitle>
                  <TotalNumBox>
                    <TotalNum>0</TotalNum>
                    <TotalApi>API~$0.00</TotalApi>
                  </TotalNumBox>
                </TotalStaked>
                <AVAILAABLE>
                  <TOTALSTAKEDTitle>AVAILAABLE IN WALLET</TOTALSTAKEDTitle>
                  <TotalNumBox>
                    <TotalNum>112</TotalNum>
                    <TotalApi>API~$0.00</TotalApi>
                  </TotalNumBox>
                </AVAILAABLE>
              </TOTALBox>
              <PENDING>
                <AVAILAABLE>
                  <TOTALSTAKEDTitle>AVAILAABLE IN WALLET</TOTALSTAKEDTitle>
                  <TotalNumBox>
                    <TotalNum>0</TotalNum>
                    <TotalApi>API~$0.00</TotalApi>
                  </TotalNumBox>
                </AVAILAABLE>
                <NextClaim>
                  <NextClaimIn>Next claim in</NextClaimIn>
                  <Blocks>5636346 blocks</Blocks>
                </NextClaim>
              </PENDING>
            </MyStaking>
          </Column>
          <Column maxWidth={279}>
            <TotalStakedBox>
              <TotalStakedBoxTitle>Total Staked</TotalStakedBoxTitle>
              <BTCUSDT>BTC/USDT</BTCUSDT>
              <Btc>
                <AxsNum>36,641.20</AxsNum>
                <Axs>AXS</Axs>
              </Btc>

              <AxsNums>36,641.20</AxsNums>
            </TotalStakedBox>
            <TotalStakedBox>
              <TotalStakedBoxTitle>Estimated Rewards</TotalStakedBoxTitle>
              <BTCUSDTS>BTC/USDT</BTCUSDTS>
              <AxsNum>75%</AxsNum>
              <AxsNums>APR</AxsNums>
            </TotalStakedBox>
          </Column>
          <Column maxWidth={279}>
            <APIPriceBox>
              <APIBox>
                <APIPriceTitle>API Price</APIPriceTitle>
                <APINum>-0.79%</APINum>
              </APIBox>

              <APIPriceNum>$29.24</APIPriceNum>
            </APIPriceBox>
            <APIPriceBox>
              <DAILYTitle>DAILY REWARDS</DAILYTitle>
              <APIPriceNum>36,641.20 AXS</APIPriceNum>
            </APIPriceBox>
            <APIPriceBox>
              <APIPriceTitle>CIRCULATING SUPPLY</APIPriceTitle>
              <APIPriceNum>36,641.20 AXS</APIPriceNum>
            </APIPriceBox>
          </Column>
        </Row>
      </>
    ) : (
      <>
        {claimStatus === 2 ? (
          <ClaimBox>
            <Congrats>
              <i>Congrats !</i>
            </Congrats>
            <CongratsImg
              src={"https://storage.googleapis.com/bimboss/hook_game_img/Congrats.gif"}
            />
            <CongratTest>You are eligible for airdrop </CongratTest>
            <CongratTest>You will be able to claim your tokens!</CongratTest>
            <ClaimForm>
              <Receive>
                <Will>0xABB3…f8F7 will receive</Will>
                <WillImgAndNum>
                  <WillNum>{CongratsData.WillNum}</WillNum>
                  <WillImg src={WillImgs} />
                </WillImgAndNum>
              </Receive>
              <ClaimBtn onClick={claimToken}>Claim tokens</ClaimBtn>
            </ClaimForm>
          </ClaimBox>
        ) : claimStatus === 0 ? (
          <SorryBox>
            <Congrats>
              <i>Welcome!</i>
            </Congrats>
            <SorryTest>
              Connect your wallet and check your eligibility for claiming tokens!
            </SorryTest>
            <SConnectButton
              onClick={() => {
                setIsShowModal(true);
              }}
              fetching={fetching}
            >
              Connect Wallet
            </SConnectButton>
          </SorryBox>
        ) : (
          <SorryBox>
            <Congrats>
              <i>Sorry</i>
            </Congrats>
            <SorryTest>You are not eligible for this airdrop round. Don’t worry!</SorryTest>
            <SorryTest>There will be more airdrops in the future.</SorryTest>
            <SorryTest>
              The best way to improve your odds is to get involved. Start exploring today:)
            </SorryTest>
            <SorryBtn>Exploring HOOK</SorryBtn>
          </SorryBox>
        )}
        <WalletModal
          isShowModal={isShowModal}
          connect={connect}
          fetching={fetching}
          setIsShowModal={setIsShowModal}
        />
      </>
    );
  };
  const [MStakeOrClaimLi, setMStakeOrClaimLi] = useState(2);
  const MStakeOrClaimClass = (index: number) => {
    return MStakeOrClaimLi === index ? (
      <>
        <Row>
          <Column maxWidth={301}>
            <MyStaking>
              <MyStakingTitle>My API Staking</MyStakingTitle>
              <MyStakingUl>
                <MyStakingLi
                  onClick={() => {
                    setCurrentLi(1);
                  }}
                  style={{
                    backgroundColor: currentLi === 1 ? "rgba(102,57,229,1)" : "rgba(13,10,36,1)",
                    color: currentLi === 1 ? "#FFFFFF" : "#9691B5",
                  }}
                >
                  Stake
                </MyStakingLi>
                <MyStakingLi
                  onClick={() => {
                    setCurrentLi(2);
                  }}
                  style={{
                    backgroundColor: currentLi === 2 ? "rgba(102,57,229,1)" : "rgba(13,10,36,1)",
                    color: currentLi === 2 ? "#FFFFFF" : "#9691B5",
                  }}
                >
                  Unstake
                </MyStakingLi>
              </MyStakingUl>
              {currentClass(1)}
              <TOTALBox>
                <TotalStaked>
                  <TOTALSTAKEDTitle>TOTAL STAKED</TOTALSTAKEDTitle>
                  <TotalNumBox>
                    <TotalNum>0</TotalNum>
                    <TotalApi>API~$0.00</TotalApi>
                  </TotalNumBox>
                </TotalStaked>
                <AVAILAABLE>
                  <TOTALSTAKEDTitle>AVAILAABLE IN WALLET</TOTALSTAKEDTitle>
                  <TotalNumBox>
                    <TotalNum>112</TotalNum>
                    <TotalApi>API~$0.00</TotalApi>
                  </TotalNumBox>
                </AVAILAABLE>
              </TOTALBox>
              <PENDING>
                <AVAILAABLE>
                  <TOTALSTAKEDTitle>AVAILAABLE IN WALLET</TOTALSTAKEDTitle>
                  <TotalNumBox>
                    <TotalNum>0</TotalNum>
                    <TotalApi>API~$0.00</TotalApi>
                  </TotalNumBox>
                </AVAILAABLE>
                <NextClaim>
                  <NextClaimIn>Next claim in</NextClaimIn>
                  <Blocks>5636346 blocks</Blocks>
                </NextClaim>
              </PENDING>
            </MyStaking>
          </Column>
          <Column maxWidth={279}>
            <TotalStakedBox>
              <TotalStakedBoxTitle>Total Staked</TotalStakedBoxTitle>
              <BTCUSDT>BTC/USDT</BTCUSDT>
              <Btc>
                <AxsNum>36,641.20</AxsNum>
                <Axs>AXS</Axs>
              </Btc>

              <AxsNums>36,641.20</AxsNums>
            </TotalStakedBox>
            <TotalStakedBox>
              <TotalStakedBoxTitle>Estimated Rewards</TotalStakedBoxTitle>
              <BTCUSDTS>BTC/USDT</BTCUSDTS>
              <AxsNum>75%</AxsNum>
              <AxsNums>APR</AxsNums>
            </TotalStakedBox>
          </Column>
          <Column maxWidth={279}>
            <APIPriceBox>
              <APIBox>
                <APIPriceTitle>API Price</APIPriceTitle>
                <APINum>-0.79%</APINum>
              </APIBox>

              <APIPriceNum>$29.24</APIPriceNum>
            </APIPriceBox>
            <APIPriceBox>
              <DAILYTitle>DAILY REWARDS</DAILYTitle>
              <APIPriceNum>36,641.20 AXS</APIPriceNum>
            </APIPriceBox>
            <APIPriceBox>
              <APIPriceTitle>CIRCULATING SUPPLY</APIPriceTitle>
              <APIPriceNum>36,641.20 AXS</APIPriceNum>
            </APIPriceBox>
          </Column>
        </Row>
      </>
    ) : (
      <>
        {claimStatus === 2 ? (
          <MClaimBox>
            <MCongrats>
              <i>Congrats !</i>
            </MCongrats>
            <MCongratsImg
              src={"https://storage.googleapis.com/bimboss/hook_game_img/Congrats.gif"}
            />
            <CongratTest>You are eligible for airdrop </CongratTest>
            <CongratTest>You will be able to claim your tokens!</CongratTest>
            <MClaimBtn onClick={claimToken}>Claim tokens</MClaimBtn>
            <MClaimForm>
              <Receive>
                <Will>0xABB3…f8F7 will receive</Will>
                <MWillImgAndNum>
                  <WillNum>{CongratsData.WillNum}</WillNum>
                  <MWillImg src={WillImgs} />
                </MWillImgAndNum>
              </Receive>
            </MClaimForm>
          </MClaimBox>
        ) : claimStatus === 0 ? (
          <MSorryBox>
            <Congrats>
              <i>Welcome!</i>
            </Congrats>
            <MSorryTest>
              Connect your wallet and check your eligibility for claiming tokens!
            </MSorryTest>
            <MSConnectButton
              onClick={() => {
                setIsShowModal(true);
              }}
              fetching={fetching}
            >
              Connect Wallet
            </MSConnectButton>
          </MSorryBox>
        ) : (
          <MSorryBox>
            <Congrats>
              <i>Sorry</i>
            </Congrats>
            <MSorryTest>You are not eligible for this airdrop round.</MSorryTest>
            <MSorryTest> Don’t worry!There will be more airdrops in the future.</MSorryTest>
            <MSorryTest>The best way to improve your odds is to get involved.</MSorryTest>
            <MSorryTest>Start exploring today:)</MSorryTest>
            <MSorryBtn>Exploring HOOK</MSorryBtn>
          </MSorryBox>
        )}
        <WalletModal
          isShowModal={isShowModal}
          connect={connect}
          fetching={fetching}
          setIsShowModal={setIsShowModal}
        />
      </>
    );
  };
  return isMobile() ? (
    <>
      {" "}
      <MStakingWrap>
        <Column maxWidth={375}>
          <MStakingTitle>
            <MStakingTitleApi>API</MStakingTitleApi>
            <MStakingTitleStak>Rewards</MStakingTitleStak>
            <MStakingTitleDashboard>Dashboard</MStakingTitleDashboard>
          </MStakingTitle>
          <Trade>Earn API by staking and more. </Trade>
        </Column>

        <Column maxWidth={327}>
          <MStakeOrClaim>
            <StakeOrClaimUl>
              <StakeOrClaimLiS
                onClick={() => {
                  return;
                  //   setMStakeOrClaimLi(1);
                }}
                style={{
                  borderBottom: StakeOrClaimLi === 1 ? " 2px solid rgb(104, 99, 212)" : "",
                  color: StakeOrClaimLi === 1 ? "#6863D4" : "#777E90",
                }}
              >
                Stake
              </StakeOrClaimLiS>
              <StakeOrClaimLiSe
                onClick={() => {
                  setMStakeOrClaimLi(2);
                }}
                style={{
                  borderBottom: StakeOrClaimLi === 2 ? " 2px solid rgb(104, 99, 212)" : "",
                  color: StakeOrClaimLi === 2 ? "#6863D4" : "#777E90",
                }}
              >
                Claim
              </StakeOrClaimLiSe>
            </StakeOrClaimUl>
          </MStakeOrClaim>
          {MStakeOrClaimClass(1)}
        </Column>
        <Column maxWidth="100vw">
          <MFoodBox>
            <MGetStartedBox>
              <Looks>Rewards for API token holders accumulating.</Looks>
              <Powers> Get the API token </Powers>
              <MBuyAndAddBox>
                <BuyBoxBtn href="https://www.mexc.com/exchange/API_USDT">
                  <BuyLook>Buy API</BuyLook>
                  <BuyIcon className="iconfont">&#xe60f;</BuyIcon>
                </BuyBoxBtn>
                <AddToBtn>
                  <AddTo>Add to Wallet</AddTo>
                  <BuyIcon className="iconfont">&#xe60d;</BuyIcon>
                </AddToBtn>
              </MBuyAndAddBox>
              <MTheRates>
                The rates shown on this page are only provided for your reference:
              </MTheRates>
              <MTheRates>APR and APY are calculated based on current ROI.</MTheRates>
              <MTheRates>
                The actual rates will fluctuate a lot according to many different
              </MTheRates>
              <MTheRates>
                factors, including token prices, trading volume, liquidity, amount staked, and more.
              </MTheRates>
            </MGetStartedBox>
            <MCopyrightBox>
              <MCopyrightTitle>
                <MCopyright>Copyright 2022 Hook</MCopyright>
                <MBlockchains>One-stop Data Analysis For All Blockchains.</MBlockchains>
              </MCopyrightTitle>
              <MLinkBox>
                <Link href="https://app.gitbook.com/o/dHoRYUVnGdpDW6kzvwKH/s/8MYNEydsCb1yG0qhMpJZ/products/hook">
                  About
                </Link>
                <Link href="/licenses">API</Link>
                <Link href="https://simmmple.com/terms-of-service">Contact</Link>
                <Link href="https://www.blog.simmmple.com/">Help</Link>
                <Link href="https://www.blog.simmmple.com/">Jobs</Link>
              </MLinkBox>
              <MXLinkBox>
                <Link href="https://www.blog.simmmple.com/">Bug Bounty</Link>
                <Link href="">Brand</Link>
                <Link href="https://app.gitbook.com/o/dHoRYUVnGdpDW6kzvwKH/s/8MYNEydsCb1yG0qhMpJZ/docs/terms-and-conditions">
                  Terms of Service
                </Link>
              </MXLinkBox>
            </MCopyrightBox>
          </MFoodBox>
        </Column>
      </MStakingWrap>
    </>
  ) : (
    <>
      <StakingWrap>
        <Column maxWidth={1000}>
          <StakingTitle>
            <StakingTitleApi>API</StakingTitleApi>
            <StakingTitleStak>Rewards</StakingTitleStak>
            <StakingTitleDashboard>Dashboard</StakingTitleDashboard>
          </StakingTitle>
          <Trade>Earn API by staking and more. </Trade>
        </Column>

        <Column maxWidth={910}>
          <StakeOrClaim>
            <StakeOrClaimUl>
              <StakeOrClaimLiS
                onClick={() => {
                  return;
                  //   setStakeOrClaimLi(1);
                }}
                style={{
                  borderBottom: StakeOrClaimLi === 1 ? " 2px solid rgb(104, 99, 212)" : "",
                  color: StakeOrClaimLi === 1 ? "#6863D4" : "#777E90",
                }}
              >
                Stake
              </StakeOrClaimLiS>
              <StakeOrClaimLiSe
                onClick={() => {
                  setStakeOrClaimLi(2);
                }}
                style={{
                  borderBottom: StakeOrClaimLi === 2 ? " 2px solid rgb(104, 99, 212)" : "",
                  color: StakeOrClaimLi === 2 ? "#6863D4" : "#777E90",
                }}
              >
                Claim
              </StakeOrClaimLiSe>
            </StakeOrClaimUl>
          </StakeOrClaim>
          {StakeOrClaimClass(1)}
        </Column>
        <Column maxWidth="100vw">
          <FoodBox>
            <GetStartedBox>
              <Looks>Rewards for API token holders accumulating.</Looks>
              <Powers> Get the API token </Powers>
              <BuyAndAddBox>
                <BuyBoxBtn href="https://www.mexc.com/exchange/API_USDT">
                  <BuyLook>Buy API</BuyLook>
                  <BuyIcon className="iconfont">&#xe60f;</BuyIcon>
                </BuyBoxBtn>
                <AddToBtn>
                  <AddTo
                    onClick={() => {
                      addToken();
                    }}
                  >
                    Add to Wallet
                  </AddTo>
                  <BuyIcon className="iconfont">&#xe60d;</BuyIcon>
                </AddToBtn>
              </BuyAndAddBox>
              <TheRates>
                The rates shown on this page are only provided for your reference: APR and APY are
                calculated based on current ROI.
              </TheRates>
              <TheRat>
                The actual rates will fluctuate a lot according to many different factors, including
                token prices, trading volume, liquidity, amount staked, and more.
              </TheRat>
            </GetStartedBox>
            <CopyrightBox>
              <CopyrightTitle>
                <Copyright>Copyright 2022 Hook</Copyright>
                <Blockchains>One-stop Data Analysis For All Blockchains.</Blockchains>
              </CopyrightTitle>
              <LinkBox>
                <Link href="https://app.gitbook.com/o/dHoRYUVnGdpDW6kzvwKH/s/8MYNEydsCb1yG0qhMpJZ/products/hook">
                  About
                </Link>
                <Link href="/licenses">API</Link>
                <Link href="https://simmmple.com/terms-of-service">Contact</Link>
                <Link href="https://www.blog.simmmple.com/">Help</Link>
                <Link href="https://www.blog.simmmple.com/">Jobs</Link>
                <Link href="https://www.blog.simmmple.com/">Bug Bounty</Link>
                <Link href="">Brand</Link>
                <Link href="https://app.gitbook.com/o/dHoRYUVnGdpDW6kzvwKH/s/8MYNEydsCb1yG0qhMpJZ/docs/terms-and-conditions">
                  Terms of Service
                </Link>
              </LinkBox>
            </CopyrightBox>
          </FoodBox>
        </Column>
      </StakingWrap>
    </>
  );
}
