import Image from "next/image";
import React, { useRef, useState } from "react";
import {
  Heart,
  MessageCircle,
  Repeat2,
  ArrowDownToLine,
  Eye,
} from "lucide-react";
//Use html-to-image to convert the div to an image
import * as htmlToImage from "html-to-image";

interface CardProps {
  name: string;
  username: string;
  text: string;
  creation_date: string;
  media_url: string[];
  profile_pic_url: string;
  favorite_count: number;
  retweet_count: number;
  reply_count: number;
  views: number;
  newCard: boolean;
  setNewCard: React.Dispatch<React.SetStateAction<boolean>>;
}

const Card = ({
  name,
  text,
  creation_date,
  media_url,
  username,
  profile_pic_url,
  favorite_count,
  retweet_count,
  reply_count,
  views,
  newCard,
  setNewCard,
}: CardProps) => {
  // Determine the grid layout based on the number of images

  /* If video url is present and mediaUrl is only 1 then imageUrl will have only the video url of the last 
    {
      "bitrate": 2176000,
      "content_type": "video/mp4",
      "url": "https://video.twimg.com/ext_tw_video/1786636014057873409/pu/vid/avc1/1280x720/yVnysnAum-jj3-RQ.mp4?tag=12"
    }
  */

  const gridLayout =
    media_url?.length > 1 ? "grid grid-rows-2 grid-cols-2 h-[320px]" : "flex";

  const newText = text.split(" ");

  const cardRef = useRef<HTMLDivElement>(null);

  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);

  const download = async () => {
    if (cardRef.current) {
      // Check if imageDataUrl already exists
      if (imageDataUrl && !newCard) {
        // If it exists, use it for the download
        const a = document.createElement("a");
        a.href = imageDataUrl;
        a.download = "tweetie.png";
        a.click();
      } else {
        // If it doesn't exist, generate a new one and store it
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = cardRef.current.offsetWidth;
        canvas.height = cardRef.current.offsetHeight;
        const dataUrl = await htmlToImage.toPng(cardRef.current);
        setImageDataUrl(dataUrl); // Store the data URL in the state
        setNewCard(false);

        const a = document.createElement("a");
        a.href = dataUrl;
        a.download = "tweetie.png";
        a.click();
      }
    } else {
      console.error("cardRef.current is null. Cannot download image.");
    }
  };

  return (
    <>
      <div className="my-12 relative">
        <button
          className="flex flex-col items-center justify-center bg-transparent rounded-lg backdrop-blur-xl hover:scale-110 border-purple-300 border border-opacity-50 transition-all ease-in-out duration-300 cursor-pointer absolute top-1.5 right-1.5 z-50"
          onClick={download}
        >
          <ArrowDownToLine
            size={32}
            className="p-1.5 text-purple-400 rounded-lg"
          />
        </button>
        <div
          className="relative border overflow-hidden text-wrap border-indigo-950 rounded-lg mx-auto p-4 min-w-96 max-w-[500px] bg-center bg-cover"
          style={{
            backgroundImage:
              "url(https://i.postimg.cc/3xC8XmRj/empty-studio-room-dark-blue-pink-violet-neon-with-light-shadow-abstract-background-44706-398.avif)",
            boxShadow: "inset rgb(147 203 255 / 22%) 0px 0px 20px",
          }}
          ref={cardRef}
        >
          <div className="flex space-x-4 items-center">
            <Image
              alt="@xeven"
              loading="lazy"
              width={500}
              height={500}
              decoding="async"
              data-nimg="1"
              className="w-10 h-10 rounded-full"
              style={{ color: "transparent" }}
              src={profile_pic_url}
            />
            <div className="flex flex-col">
              <h4 className="text-base font-semibold">{name}</h4>
              <div className="flex items-center">
                <span className="text-sm text-gray-400">@{username}</span>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm">
              {newText.map((item, key) => {
                return (
                  /*If \n is present in the text, then it should be displayed as a new line */
                  key === newText.length - 1 &&
                    item.startsWith("https://t.co") ? (
                    ""
                  ) : (
                    <span key={key}>
                      {/*If item contains a \n then replace it with <br />*/}
                      {item.split("\n").map((line, index) => (
                        <React.Fragment key={index}>
                          {line}
                          {index !== item.split("\n").length - 1 && <br />}{" "}
                          {/* Add <br /> except for the last line */}
                        </React.Fragment>
                      ))}
                    </span>
                  )
                );
              })}
            </p>
            {/*
            Twitter like image grid with max 4 images
            If one image is present, it should be displayed as a single image
            If two images are present, they should be displayed as two separate images in a row
            If three images are present, they should be displayed as two images in a row and one image in a column
            If four images are present, they should be displayed as two images in a row and two images in a row
          */}

            {media_url && (
              <div className={`${gridLayout} gap-1 mt-4`}>
                {media_url.map((url, index) => (
                  <div
                    key={index}
                    className={
                      media_url.length === 2
                        ? "row-span-2"
                        : media_url.length === 3
                        ? index === 0
                          ? "row-span-2"
                          : ""
                        : ""
                    }
                  >
                    <Image
                      alt={`Image ${index + 1}`}
                      loading="lazy"
                      width={1000}
                      height={1000}
                      className={
                        media_url.length === 2
                          ? index === 0
                            ? "rounded-tl-lg rounded-bl-lg"
                            : "rounded-tr-lg rounded-br-lg"
                          : media_url.length === 3
                          ? index === 0
                            ? "rounded-tl-lg rounded-bl-lg"
                            : index === 1
                            ? "rounded-tr-lg"
                            : "rounded-br-lg"
                          : media_url.length === 4
                          ? index === 0
                            ? "rounded-tl-lg"
                            : index === 1
                            ? "rounded-tr-lg"
                            : index === 2
                            ? "rounded-bl-lg"
                            : "rounded-br-lg"
                          : "rounded-lg"
                      }
                      style={{
                        color: "transparent",
                        height: "100%",
                        objectFit: "cover",
                      }}
                      src={url}
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 flex justify-between w-full">
              <div className="flex gap-6">
                <div className="flex gap-1.5 items-center">
                  <Heart size={20} className="text-rose-600" />
                  <span className="text-base">{favorite_count}</span>
                </div>

                <div className="flex gap-1.5 items-center">
                  <Repeat2 size={20} color="lime" />
                  <span className="text-base">{retweet_count}</span>
                </div>

                <div className="flex gap-1.5 items-center">
                  <MessageCircle size={20} className="text-sky-500" />
                  <span className="text-base">{reply_count}</span>
                </div>

                <div className="flex gap-1.5 items-center">
                  <Eye size={20} className="text-gray-400" />
                  <span className="text-base">{views}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
