import { FC, useContext, useEffect, useRef, useState } from "react";
import { GlobalContext } from "../api/globalState";
import VideoRecorder from "react-video-recorder";
import { api, apiPluginForImageUpload } from "../api";
import { toast } from "react-toastify";
import Router from "next/router";
import Loader from "../../common/loader"
declare global {
  interface Window {
    initialStream: any;
    recordStream: any;
  }
}

interface Props {
  closePlayer: () => void;
  setLink: (fileLink: string) => void;
}

const RecordPrayer: FC<Props> = ({ closePlayer, setLink }) => {
  const [globalState, dispatch] = useContext(GlobalContext);
  const [isRecorded, setIsRecorded] = useState(false);
  const [loader, setLoader] = useState(false);

  const url = localStorage.getItem("PrayerChainId")
  const file = useRef<any>(null);

  const uploadVideo = async () => {
    if (file.current) {
         setLoader(true);
      const formData = new FormData();

      formData.append("upload", file.current);
     
      api({
        url: "/presignedUrl/upload",
        method: "post",
        baseUrl: process.env.NEXT_PUBLIC_S3_URL,
        body: formData,
      }).then(async (response: any) => {
        const signedUrl = response.data.url;
        await apiPluginForImageUpload({
          url: "",
          method: "put",
          baseUrl: signedUrl,
          body: file.current,
        });
   setLoader(false);
        if (signedUrl) {
          setLink(response.data.url.split("?")[0]);
          publicCreate(response.data.url.split("?")[0])
        } else {
          setLink("");
        }
      });
    }
  };

  const publicCreate = async (videoLink : any) => {
    const body = {
        prayer_chain_id: url,
        type: 1,
        media: {
            type: "video",
            src: videoLink
        }
    }
    try {
      setLoader(true);
      const { data }: any = await api({
        url: `prayer/create`,     
        method: "post",
        body
      });
       setLoader(false);
        if (data) {
        Router.push(`/profile/${url}`);
        toast.success("Prayer Record created successfully");
        
        } else {
          toast.error(data.message);
      }
    } catch (err) {
      setLoader(false);
      console.log(err);
    }
  } 

  useEffect(() => {
    dispatch({ type: "SET_FOOTER_STATE", payload: true });
    return handleClickBack;
  }, []);

  const handleClickBack = () => {
    setIsRecorded(false);
    closePlayer();
    dispatch({ type: "SET_FOOTER_STATE", payload: undefined });
  };

  return (
    <div className="fixed flex items-end left-0 top-0 w-screen h-screen bg-white z-50">
      {loader ? <Loader /> : ""}
      <button className="fixed top-9 left-9 z-50" onClick={closePlayer}>
        <img
          src="/assets/icons/arrow-back.svg"
          alt=""
          onClick={handleClickBack}
          className="invert z-50"
        />
      </button>
      <div className="w-full h-full flex-shrink-0">
        <VideoRecorder
          isFlipped={false}
          onRecordingComplete={(videoBlob: any) => {
            setIsRecorded(true);
            // let videoFile = new File([videoBlob], `${+new Date()}.mp4`, {
            //   //let videoFile = new File([videoBlob], `${+new Date()}`, {
            //   type: videoBlob.type,
            // });

            var videoFile = new File([videoBlob], "my_video.mp4", {
              type: "video/*",
              lastModified: new Date().getTime(),
            });

            file.current = videoFile;
          }}
        />
      </div>
      {isRecorded && (
        <div className="bg-red">
          <button
            className="bg-green-500 text-center h-fit fixed bottom-0 left-0 block py-2.5 uppercase w-full"
            onClick={uploadVideo}
          >
            upload
          </button>
        </div>
      )}
    </div>
  );
};

export default RecordPrayer;
