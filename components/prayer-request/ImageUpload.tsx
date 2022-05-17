import { FC, useRef, useState } from "react";
import Loader from "../common/loader"
import { api, apiPluginForImageUpload } from "../common/api";

interface Props {
  name: string;
  onChange: (file: any) => void;
}

const ImageUpload: FC<Props> = ({ onChange, name }) => {
   const [loader, setLoader] = useState(false);

  const inputFile = useRef<HTMLInputElement | null>(null);

  const uploadImage = async (e: any) => {
    const [file] = e.target.files;
    const formData = new FormData();
    formData.append("upload", file);
      setLoader(true);
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
        body: file,
      });
        setLoader(false);
      if (signedUrl) {
        onChange(response.data.url.split("?")[0]);
      } else {
        onChange("");
      }
    });
  };

  return (
    <div className="relative">
       {loader ? <Loader /> : ""}
      <input
        title=""
        value=""
        className="text-0 absolute top-0 left-0 right-0 bottom-0 block outline-none w-full opacity-0 cursor-pointer"
        type="file"
        onChange={uploadImage}
        ref={inputFile}
        name={name}
        id={name}
        multiple={false}
        accept="image/*"
      />
      <button
        onClick={() => {
          let input = document.getElementById(name)! as HTMLInputElement;
          input.value = "";
          inputFile.current?.click();
        }}
        className="p-4 w-full border border-primary text-primary rounded text-left"
      >
        Upload picture of person<span className="text-red-500"> *</span>
      </button>
    </div>
  );
};

export default ImageUpload;
