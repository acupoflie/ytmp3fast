import "./App.css";

function Text() {
  return (
    <>
      <div className="flex justify-center items-center mb-5 w-full">
        <p className="text-center max-w-2xl mx-4">
          YouTube.com is the largest video sharing platform on the Internet.
          Every day millions of new videos are added. You can find all kinds of
          videos but YouTube does not offer a FREE downloading service for these
          videos. YTMP3 allows you to download your favorite YouTube videos as
          MP3 (audio) or MP4 (video) files in the most efficient way. You are
          able to use YTMP3 on any device – it is optimized to work on desktop,
          tablet and mobile devices. There is also no additional software or app
          needed.
        </p>
      </div>
      <div className="flex justify-center items-center mb-5 w-full">
        <p className="text-center max-w-2xl mx-4">
          1. Open YouTube.com and search for the video you would like to
          download. 2. When you find the video, click on it and wait until it
          starts playing. Then, just copy the video URL from your browser
          address bar. 3. Open YTMP3 and paste the video URL in our converter.
          After that, you will be able to choose the download format. You can
          choose between MP3 or MP4. If you do not choose any format, the video
          will be converted by default into an MP3 file. 4. Then, simply click
          on the "Convert" button. The conversion will be initiated and may take
          a few minutes. We will try to convert the video in the best available
          quality. But be aware that it is only possible to download videos that
          are up to 90 minutes long, to guarantee that the conversion will be
          done within a few minutes. 5. As soon as the conversion of the video
          is completed, you will see a "Download" button. Just click on it, and
          the download shall start. By using YTMP3, you are accepting our Terms
          of Use. We appreciate that you've chosen YTMP3.
        </p>
      </div>
    </>
  );
}

export default Text;
