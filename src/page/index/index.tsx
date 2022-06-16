import React from "react";
import Column from "src/components/Column";

import styled from "styled-components";
import "./index.css";
import { isMobile } from "src/helpers/utilities";
interface IHome {
  killSession: () => void;
  connected: boolean;
  connect: () => void;
  fetching: boolean;
}
const PosterWrap = styled.div`
  background: #161426;
`;
const PosterTitle = styled.div`
  font-weight: 500;
  font-size: 48px;
  line-height: 58px;
  text-align: center;
  width: 78px;
  height: 58px;
  color: #fcfcfd;
  margin-right: 22px;
`;
const ShareBtn = styled.div`
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
export default function Home({ connected, killSession, connect, fetching }: IHome) {
  return isMobile() ? (
    <></>
  ) : (
    <>
      <PosterWrap>
        <Column maxWidth={1000}>
          <PosterTitle>to da moon</PosterTitle>
          <PosterTitle>to the moon and back!😓</PosterTitle>
          <ShareBtn>Share</ShareBtn>
        </Column>
      </PosterWrap>
    </>
  );
}
