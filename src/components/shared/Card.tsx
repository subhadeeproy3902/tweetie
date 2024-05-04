import Image from "next/image";
import React from "react";

interface CardProps {
  name: string;
  username: string;
  text: string;
  creation_date: string;
  media_url: string[];
  video_url: string;
  profile_pic_url: string;
  favorite_count: number;
  retweet_count: number;
  reply_count: number;
  views: number;
}

const Card = ({
  name,
  text,
  creation_date,
  media_url,
  video_url,
  username,
  profile_pic_url,
  favorite_count,
  retweet_count,
  reply_count,
  views,
}: CardProps) => {
  // Determine the grid layout based on the number of images

  /* If video url is present and mediaUrl is only 1 then imageUrl will have only the video url of the last 
    {
      "bitrate": 2176000,
      "content_type": "video/mp4",
      "url": "https://video.twimg.com/ext_tw_video/1786636014057873409/pu/vid/avc1/1280x720/yVnysnAum-jj3-RQ.mp4?tag=12"
    }
  */
  if (video_url && media_url.length === 1) {
    const url: string = (video_url.slice(-1)[0] as any).url;
    media_url[0] = url;
  }
  const imageUrls = ["/bg.webp"];
  const gridLayout =
    imageUrls.length > 1 ? "grid grid-rows-2 grid-cols-2" : "flex";

  const newText = text.split(" ");
  console.log(newText);

  return (
    <>
      <div
        className="relative border overflow-hidden text-wrap border-indigo-950 rounded-lg mx-auto mt-12 p-4 min-w-80 max-w-[600px] bg-center bg-cover mb-12"
        style={{
          backgroundImage:
            "url(https://i.postimg.cc/3xC8XmRj/empty-studio-room-dark-blue-pink-violet-neon-with-light-shadow-abstract-background-44706-398.avif)",
          boxShadow: "inset rgb(147 203 255 / 22%) 0px 0px 20px",
        }}
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
          <div className="flex flex-col gap-0.5">
            <h4 className="text-base font-semibold">{name}</h4>
            <div className="flex items-center">
              <span className="text-xs text-gray-400">@{username}</span>
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

          <div className={`${gridLayout} gap-1 mt-4 h-[320px]`}>
            {imageUrls.map((url, index) => (
              <div
                key={index}
                className={
                  imageUrls.length === 2
                    ? "row-span-2"
                    : imageUrls.length === 3
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
                    imageUrls.length === 2
                      ? index === 0
                        ? "rounded-tl-lg rounded-bl-lg"
                        : "rounded-tr-lg rounded-br-lg"
                      : imageUrls.length === 3
                      ? index === 0
                        ? "rounded-tl-lg rounded-bl-lg"
                        : index === 1
                        ? "rounded-tr-lg"
                        : "rounded-br-lg"
                      : imageUrls.length === 4
                      ? index === 0
                        ? "rounded-tl-lg"
                        : index === 1
                        ? "rounded-tr-lg"
                        : index === 2
                        ? "rounded-bl-lg"
                        : "rounded-br-lg"
                      : "rounded-lg"
                  }
                  style={{ color: "transparent", height: "100%" }}
                  src={url}
                />
              </div>
            ))}
          </div>

          <div className="mt-6"></div>
        </div>
      </div>
    </>
  );
};

export default Card;
