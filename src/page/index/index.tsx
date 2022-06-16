import React from "react";
import Column from "src/components/Column";

import styled from "styled-components";
import "./index.css";
import { isMobile } from "src/helpers/utilities";
import Whereabouts from "../../components/Whereabouts";
interface IHome {
  killSession: () => void;
  connected: boolean;
  connect: () => void;
  fetching: boolean;
}
const PosterWrap = styled.div`
  background: #161426;
  min-height: calc(100vh - 100px);
  padding-top: 200px;
`;
const MPosterWrap = styled.div`
  background: #161426;
  min-height: calc(100vh - 95px);
  padding-top: 150px;
`;
const PosterTitle = styled.div`
  font-weight: 700;
  font-size: 60px;
  line-height: 60px;
  text-align: center;
  color: #fcfcfd;
  font-family: "iconfont";
  margin-bottom: 20px;
`;
const MPosterTitle = styled.div`
  font-weight: 600;
  font-size: 30px;
  line-height: 30px;
  text-align: center;
  color: #fcfcfd;
  font-family: "iconfont";
  margin-bottom: 10px;
`;
const ShareBtn = styled.div`
  width: 198px;
  height: 46px;
  border-radius: 18px;
  background: linear-gradient(180deg, rgba(159, 107, 244, 1) 0%, rgba(102, 57, 229, 1) 100%);
  color: rgba(255, 255, 255, 1);
  font-size: 28px;
  font-weight: 600;
  text-align: center;
  line-height: 46px;
  margin-top: 160px;
  cursor: pointer;
  font-family: "iconfont";
  &:hover {
    opacity: 0.5;
  }
`;
const MShareBtn = styled.div`
  width: 198px;
  height: 46px;
  border-radius: 18px;
  background: linear-gradient(180deg, rgba(159, 107, 244, 1) 0%, rgba(102, 57, 229, 1) 100%);
  color: rgba(255, 255, 255, 1);
  font-size: 28px;
  font-weight: 600;
  text-align: center;
  line-height: 46px;
  margin-top: 160px;
  cursor: pointer;
  font-family: "iconfont";
  &:hover {
    opacity: 0.5;
  }
`;
const FoodShare = styled.div`
  display: flex;
  width: 200px;
  justify-content: space-between;
  margin-top: 190px;
  margin-left: -600px;
`;
const MFoodShare = styled.div`
  display: flex;
  width: 100px;
  justify-content: space-between;
  margin-top: 200px;
  margin-left: -150px;
`;
const Link = styled.div`
  font-size: 28px;
  color: #fff;
`;
const MLink = styled.div`
  font-size: 14px;
  color: #fff;
`;
export default function Home({ connected, killSession, connect, fetching }: IHome) {
  return isMobile() ? (
    <>
      <MPosterWrap>
        <Column maxWidth={279}>
          <MPosterTitle>to da moon</MPosterTitle>
          <MPosterTitle>to the moon and back!😓</MPosterTitle>
          <MShareBtn>Share</MShareBtn>
          <MFoodShare>
            <MLink className="iconfont">&#xe61d;</MLink>
            <MLink className="iconfont">&#xe66e;</MLink>
            <MLink className="iconfont">&#xec25;</MLink>
          </MFoodShare>
        </Column>
      </MPosterWrap>
    </>
  ) : (
    <>
      <PosterWrap>
        <Column maxWidth={1000}>
          <Whereabouts />
          <PosterTitle>to da moon</PosterTitle>
          <PosterTitle>to the moon and back!😓</PosterTitle>
          <ShareBtn>Share</ShareBtn>
          <FoodShare>
            <Link className="iconfont">&#xe61d;</Link>
            <Link className="iconfont">&#xe66e;</Link>
            <Link className="iconfont">&#xec25;</Link>
          </FoodShare>
        </Column>
      </PosterWrap>
    </>
  );
}
