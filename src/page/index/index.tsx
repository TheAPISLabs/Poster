import React, { useEffect, useState } from "react";
import Column from "src/components/Column";

import styled from "styled-components";
import "./index.css";
import { isMobile } from "src/helpers/utilities";
import Whereabouts from "../../components/Whereabouts";
// @ts-ignore
import CanvasPoster from "react-canvas-poster";
// import Modal from "../../components/Modal";
import axios from "axios";
import { useWeb3React } from "@web3-react/core";
const DefaultUrl = "https://api.hook.cool:8890";
// const DefaultUrl = "http://192.168.31.23:8898/";

export async function getPosterData(params: any) {
  return await axios.get(`${DefaultUrl}/poster/getPoster`, {
    params,
  });
}
interface IHome {
  killSession: () => void;
  connected: boolean;
  connect: () => void;
  fetching: boolean;
}
const PosterWrap = styled.div`
  background: #161426;
  min-height: calc(100vh - 99px);
  padding-top: 100px;
`;
const MPosterWrap = styled.div`
  background: #161426;
  min-height: calc(100vh - 54px);
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
  cursor: pointer;
  font-family: "iconfont";
  &:hover {
    opacity: 0.5;
  }
  margin-left: 30px;
  positione: relative;
  z-index: 999;
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
  cursor: pointer;
  font-family: "iconfont";
  &:hover {
    opacity: 0.5;
  }
  margin-left: 30px;
  positione: relative;
  z-index: 999;
`;
// const FoodShare = styled.div`
//   display: flex;
//   width: 100px;
//   margin-top: 190px;
//   margin-left: -600px;
// `;
// const MFoodShare = styled.div`
//   display: flex;
//   width: 100px;
//   margin-top: 100px;
//   margin-left: -150px;
// `;
// const Link = styled.div`
//   font-size: 28px;
//   color: #fff;
//   ≠≠margin-left: 30px;
// `;
// const MLink = styled.div`
//   font-size: 14px;
//   color: #fff;
//   margin-left: 30px;
// `;
const Images = styled.img`
  margin-top: 50px;
`;
const Down = styled.div`
  width: 198px;
  height: 46px;
  border-radius: 18px;
  background: linear-gradient(180deg, rgba(159, 107, 244, 1) 0%, rgba(102, 57, 229, 1) 100%);
  color: rgba(255, 255, 255, 1);
  font-size: 28px;
  font-weight: 600;
  text-align: center;
  line-height: 46px;
  cursor: pointer;
  font-family: "iconfont";
  &:hover {
    opacity: 0.5;
  }
  positione: relative;
  z-index: 999;
`;

const Loading = styled.div`
  -webkit-animation: animal 4s infinite linear;
  -webkit-transform-origin: center center;
  -ms-transform-origin: center center;
  transform-origin: center center;
  color: #fff;
  font-size: 80px;
`;

const BtnGroup = styled.div`
  display: flex;
  margin: 40px 0;
`;
const dataURLtoBlob = (dataurl: string) => {
  // @ts-ignore
  const arr = dataurl.split(",");
  // @ts-ignore
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
};
const downloadFile = (url: string, name = "What's the fuvk") => {
  // @ts-ignore

  const a = document.createElement("a");
  a.setAttribute("href", url);
  a.setAttribute("download", name);
  a.setAttribute("target", "_blank");
  // @ts-ignore

  const clickEvent = document.createEvent("MouseEvents");
  clickEvent.initEvent("click", true, true);
  a.dispatchEvent(clickEvent);
};
export function formatNumber(num: number) {
  console.log((num / 1e3).toFixed(1) + "k");

  return num >= 1e3
    ? num >= 1e6
      ? (num / 1e6).toFixed(1) + "M"
      : (num / 1e3).toFixed(1) + "k"
    : num;
}

const downloadFileByBase64 = (base64: any, name: string | undefined) => {
  // @ts-ignore

  const myBlob = dataURLtoBlob(base64);
  // @ts-ignore

  const myUrl = URL.createObjectURL(myBlob);
  downloadFile(myUrl, name);
};
// downloadFileByBase64(baseUrl, res.data.msg)

export default function Home({ connected, killSession, connect, fetching }: IHome) {
  const { account } = useWeb3React();
  const [holderCnt, setHolderCnt] = useState("");
  const [worth, setWorth] = useState("");
  const [yields, setYields] = useState("");

  useEffect(() => {
    if (!account) {
      return;
    }
    getPosterData({ address: account }).then(res => {
      console.log(res);
      setHolderCnt(res.data.data.holderCnt);
      setWorth(res.data.data.worth);
      setYields(res.data.data.yield);
      console.log(res.data.data.worth);

      setDrawData({
        width: 360,
        height: 667,
        backgroundColor: "#fff",
        views: [
          // local img
          {
            type: "image",
            url: require("../../assets/po/po.png"),
            top: 0,
            left: 0,
            width: 360,
            height: 667,
          },

          // text
          {
            type: "text",
            content: (res.data.data.yield * 100).toFixed(5).slice(0, -3) + "%",
            //
            fontSize: 50,
            color: "#f7f7f7",
            top: 190,
            left: 30,
            width: 200,
            lineNum: 1,
            lineHeight: 20,
            baseLine: "top",
            fontWeight: 900,
          },
          {
            type: "text",
            content: "$" + formatNumber(Number(res.data.data.worth)),
            fontSize: 50,
            color: "#f7f7f7",
            top: 280,
            left: 30,
            width: 200,
            lineNum: 1,
            lineHeight: 20,
            baseLine: "top",
            fontWeight: 900,
          },
          {
            type: "text",
            content: formatNumber(res.data.data.holderCnt),
            fontSize: 45,
            color: "#f7f7f7",
            top: 350,
            left: 120,
            width: 200,
            lineNum: 1,
            lineHeight: 20,
            baseLine: "top",
            fontWeight: 900,
          },
        ],
      });
    });
    console.log(holderCnt, worth, yields);
  }, [account]);

  const [drawData, setDrawData] = useState(null as any);
  //   const [isShowImg, setIsShowImg] = useState(false);
  const [imgDetail, setImgDetail] = useState("");
  return isMobile() ? (
    <>
      <MPosterWrap>
        <Column maxWidth={279}>
          <MPosterTitle>
            To the moon and back 😅
            <br />
            Connect now 👀 to get your 💩 #loser poster 🤣 and share with your 👬 #loser frens 👭
          </MPosterTitle>

          {!drawData ? (
            <></>
          ) : (
            <>
              <CanvasPoster
                drawData={drawData}
                success={(res: any) => {
                  setImgDetail(res);
                }}
              />
              <Images src={imgDetail} alt="" />
              <BtnGroup>
                <Down
                  onClick={() => {
                    downloadFileByBase64(imgDetail, "share");
                  }}
                >
                  Download
                </Down>
                <MShareBtn
                  style={{
                    cursor:
                      holderCnt === "" && worth === "" && yields === "" ? "no-drop" : "pointer",
                  }}
                  onClick={() => {
                    if (holderCnt === "" && worth === "" && yields === "") {
                      return;
                    }
                    window.open(
                      `https://twitter.com/intent/tweet?url=Down bad, huh? Go check https://www.hook.cool/poster have some fun `,
                      `_blank`,
                      `width=600, height=450, toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, top=100,left=350`,
                    );
                  }}
                >
                  Share
                </MShareBtn>
              </BtnGroup>
            </>
          )}
          {/* <MFoodShare>
            <MLink
              onClick={() => {
                window.open(
                  `https://twitter.com/intent/tweet?url=https://theapis.xyz/&text=THE Apis`,
                  `_blank`,
                  `width=600, height=450, toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, top=100,left=350`,
                );
              }}
              className="iconfont"
            >
              &#xe61d;
            </MLink>
            {/* <MLink className="iconfont">&#xe66e;</MLink> */}
          {/* <MLink className="iconfont">&#xec25;</MLink> */}
        </Column>
      </MPosterWrap>
    </>
  ) : (
    <>
      <PosterWrap>
        <Column maxWidth={1000}>
          <Whereabouts />
          <PosterTitle>
            To da moon and back 😅
            <br />
            Connect now 👀 to get your 💩 #loser poster 🤣 and share with your 👬 #loser frenz 👭
          </PosterTitle>
          {account && holderCnt === "" && worth === "" && yields === "" ? (
            <Loading>😅</Loading>
          ) : (
            <></>
          )}

          {!drawData ? (
            <></>
          ) : (
            <>
              <CanvasPoster
                drawData={drawData}
                success={(res: any) => {
                  setImgDetail(res);
                }}
              />
              <Images src={imgDetail} alt="" />
              <BtnGroup>
                <Down
                  onClick={() => {
                    downloadFileByBase64(imgDetail, "share");
                  }}
                >
                  Download
                </Down>
                <ShareBtn
                  style={{
                    cursor:
                      holderCnt === "" && worth === "" && yields === "" ? "no-drop" : "pointer",
                  }}
                  onClick={() => {
                    if (holderCnt === "" && worth === "" && yields === "") {
                      return;
                    }
                    window.open(
                      `https://twitter.com/intent/tweet?url= Down bad, huh? Go check https://www.hook.cool/poster have some fun`,
                      `_blank`,
                      `width=600, height=450, toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, top=100,left=350`,
                    );
                  }}
                >
                  Share
                </ShareBtn>
              </BtnGroup>
            </>
          )}

          {/* <FoodShare>
            <Link
              className="iconfont"
              onClick={() => {
                window.open(
                  `https://twitter.com/intent/tweet?url=https://www.baidu.com/&text=hahahahaha&img=https://pbs.twimg.com/media/FVXLhK3WUAEFYed?format=jpg&name=360x360`,
                  `_blank`,
                  `width=600, height=450, toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, top=100,left=350`,
                );
              }}
            >
              &#xe61d;
            </Link>
          </FoodShare> */}
        </Column>
      </PosterWrap>
    </>
  );
}
