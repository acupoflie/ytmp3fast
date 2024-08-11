import "./App.css";
import Icon from "./assets/components/icons/icon";

function App() {
  return (
    <>
      <div className="flex justify-center items-center h-24 mb-4">
        <Icon />
      </div>
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
      <div className="block w-auto m-a">
        <p className="">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis
          nemo illum, maxime expedita exercitationem dolorum culpa quae maiores
          repudiandae quisquam id deserunt consectetur perspiciatis, doloremque
          eos, quas numquam in. Excepturi?
        </p>
      </div>
    </>
  );
}

export default App;
