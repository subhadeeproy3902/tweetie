"use client";

import { ArrowRight, Download } from "lucide-react";
import { useState } from "react";
import Card from "./Card";

const Form = () => {
  const accessKey = process.env.NEXT_PUBLIC_ACCESS_KEY as string;
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const urlID = (e.currentTarget[0] as HTMLInputElement).value
      .split("/")
      .pop();

    const fetchURL = `https://twitter154.p.rapidapi.com/tweet/details?tweet_id=${urlID}`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Host": "twitter154.p.rapidapi.com",
        "X-RapidAPI-Key": accessKey,
      },
    };

    const response = await fetch(fetchURL, options);
    const data = await response.json();
    // get the last video url
    console.log(data);
    setResult(data);
    setLoading(false);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex z-20 gap-4 sm:gap-1 w-full max-w-2xl pt-5 px-2 items-center justify-center flex-wrap md:flex-nowrap"
      >
        <input
          className="bg-gradient-to-b outline-none font-medium text-base text-black from-blue-100 to-blue-500 py-2 px-3 rounded-lg w-full placeholder:text-gray-700"
          required
          type="url"
          placeholder="Enter a URL"
        />
        <button
          className="text-white inline-flex gap-2 items-center text-lg bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br outline-none border-none font-medium rounded-lg px-5 py-1.5 text-center max-w-lg justify-center"
          type="submit"
        >
          {loading ? "Loading..." : "Search"}
          {!loading && <ArrowRight size={16} className="mt-0.5" />}
        </button>
      </form>

      {result?.tweet_id ? (
        <Card
          name={result?.user?.name}
          username={result?.user?.username}
          text={result?.text}
          creation_date={result?.creation_date}
          media_url={result?.media_url}
          video_url={result?.video_url}
          profile_pic_url={result?.user?.profile_pic_url}
          favorite_count={result?.favorite_count}
          retweet_count={result?.retweet_count}
          reply_count={result?.reply_count}
          views={result?.views}
        />
      ): result && <p className="mt-12 text-gray-400 font-medium text-xl tracking-wide z-50">Invalid Link</p>}
    </>
  );
};

export default Form;
