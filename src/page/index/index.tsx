import React, { useEffect, useState } from "react";
import Column from "src/components/Column";

import styled from "styled-components";
import "./index.css";
import { isMobile } from "src/helpers/utilities";
import Whereabouts from "../../components/Whereabouts";
// @ts-ignore
import CanvasPoster from "react-canvas-poster";
import Modal from "../../components/Modal";
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
  width: 100px;
  margin-top: 190px;
  margin-left: -600px;
`;
const MFoodShare = styled.div`
  display: flex;
  width: 100px;
  margin-top: 100px;
  margin-left: -150px;
`;
const Link = styled.div`
  font-size: 28px;
  color: #fff;
  ≠≠margin-left: 30px;
  position: relative;
  z-index: 100;
`;
const MLink = styled.div`
  font-size: 14px;
  color: #fff;
  margin-left: 30px;
  position: relative;
  z-index: 100;
`;
const Images = styled.img``;
const Down = styled.div`
  font-size: 14px;
  color: #fff;
  width: 120px;
  height: 40px;

  border-radius: 18px;
  background: linear-gradient(180deg, rgba(159, 107, 244, 1) 0%, rgba(102, 57, 229, 1) 100%);
  color: rgba(255, 255, 255, 1);
  font-size: 28px;
  font-weight: 600;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
  margin: 0 auto;
  margin-top: 10px;
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
            content: (res.data.data.yield * 100).toFixed(3).slice(0, -1) + "%",
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
            content: res.data.data.worth,
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
            content: res.data.data.holderCnt,
            fontSize: 50,
            color: "#f7f7f7",
            top: 340,
            left: 130,
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
  const [isShowImg, setIsShowImg] = useState(false);
  const [imgDetail, setImgDetail] = useState("");
  return isMobile() ? (
    <>
      <MPosterWrap>
        <Column maxWidth={279}>
          <MPosterTitle>
            To the moon and back 😓
            <br />
            Connect now 👀 to get your 💩 #loser poster 🤣 and share to your 👬 #loser frens 👭
          </MPosterTitle>

          <MShareBtn
            style={{
              cursor: !holderCnt && !worth && !yields ? "no-drop" : "pointer",
            }}
            onClick={() => {
              if (!holderCnt && !worth && !yields) {
                return;
              }
              setIsShowImg(true);
            }}
          >
            Share
          </MShareBtn>
          {!drawData ? (
            <></>
          ) : (
            <CanvasPoster
              drawData={drawData}
              success={(res: any) => {
                setImgDetail(res);
              }}
            />
          )}
          <MFoodShare>
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
          </MFoodShare>
        </Column>
      </MPosterWrap>
    </>
  ) : (
    <>
      <PosterWrap>
        <Column maxWidth={1000}>
          <Whereabouts />
          <PosterTitle>
            To the moon and back 😓
            <br />
            Connect now 👀 to get your 💩 #loser poster 🤣 and share to your 👬 #loser frens 👭
          </PosterTitle>
          <ShareBtn
            style={{
              cursor: !holderCnt && !worth && !yields ? "no-drop" : "pointer",
            }}
            onClick={() => {
              if (!holderCnt && !worth && !yields) {
                return;
              }
              setIsShowImg(true);
            }}
          >
            Share
          </ShareBtn>
          {!drawData ? (
            <></>
          ) : (
            <CanvasPoster
              drawData={drawData}
              success={(res: any) => {
                setImgDetail(res);
              }}
            />
          )}

          {/* {isShowImg ? <Images src={imgDetail} alt="" /> : <></>} */}
          <Modal
            show={isShowImg}
            opacity={0.2}
            toggleModal={() => {
              setIsShowImg(false);
            }}
          >
            <Images src={imgDetail} alt="" />
            <Down
              onClick={() => {
                downloadFileByBase64(imgDetail, "share");
              }}
            >
              Down
            </Down>
          </Modal>

          <FoodShare>
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
            {/* <Link className="iconfont">&#xe66e;</Link> */}
            {/* <Link className="iconfont">&#xec25;</Link> */}
          </FoodShare>
        </Column>
      </PosterWrap>
    </>
  );
}
