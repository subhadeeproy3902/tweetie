import Footer from "@/components/shared/Footer";
import Form from "@/components/shared/Form";
import FlickeringGrid from "@/components/ui/flickering-grid";

export default function Home() {
  return (
    <div className="w-full relative">
      <FlickeringGrid
        squareSize={4}
        gridGap={6}
        color="#00ddff"
        maxOpacity={0.1}
        flickerChance={1}
        className="z-0 absolute inset-0"
      />
      <div className="min-h-screen px-4 sm:px-16 w-full flex flex-col items-center pt-16 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-400 to-blue-200 text-transparent bg-clip-text relative">
          <h1 className="text-5xl lg:text-7xl pb-2 font-bold text-center">
            Tweetie
          </h1>
        </div>
        <div className="w-[42rem] h-5 relative">
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent h-[2px] w-3/4 blur-sm  animate-pulse"></div>
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px w-3/4"></div>
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent h-[6px] w-1/4 blur-sm  animate-pulse"></div>
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px w-1/4"></div>
        </div>
        <p className="text-center text-base font-medium relative z-20 text-blue-100 max-w-prose p-4">
          Tweetie is a tool that quickly and easily creates gorgeous screenshots
          of Twitter posts. To create a screenshot, enter the tweet URL and
          click the button.
        </p>
        <Form />
      </div>

      <Footer />
    </div>
  );
}
