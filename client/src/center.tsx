import "./App.css";

function Center() {
  return (
    <>
      <form className="bg-zinc-800 w-auto text-white  border-t-2 border-t-[#0085ff] rounded-[3px] mx-auto mb-[30px] p-[15px]">
        <div>Please insert a valid YouTube video URL</div>
        <div>
          <input
            className="w-1/2 h-8 mt-3 mr-2 border p-1 border-blue-500	outline-none"
            type="text"
            name="url"
            id=""
            placeholder="https://www.youtube.com/watch?v=url"
            autoFocus
            required
          />
          <button className="text-white bg-[#191919] w-auto border border-[#0179e6] outline-none box-border  ">
            Convert
          </button>
        </div>
      </form>
    </>
  );
}

export default Center;
