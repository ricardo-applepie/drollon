
import Image from "next/image";
import "./recent-boards.scss";


export default function RecentBoards() {
  const boards = [1, 2, 3, 4];

  return (
    <div className="px-10 py-10 bg-white w-full h-full overflow-y-scroll">
      <div className="flex justify-between w-3/4">
        <h2>Goodnight Mark</h2>
        <div className="flex gap-3 mt-3">
          <button className="px-2 py-2 bg-black text-white rounded w-full">Quick search</button>
        </div>       
      </div> 
      <div className="border border-slate-200 border-solid mt-5 py-4 px-12 w-3/4">
        <div>Recently viewed</div>
        <div className="boards">
          {boards.map((board, key) => (
            <div className="py-3 px-3 boards--board border border-slate-200 border-solid py-5 px-5" key={`board_${key}`}>
              <div className="boards-bg w-full bg-slate-300"></div>
              <h3 className="mt-4">{board}</h3>
            </div>
            ))}
        </div>
      </div>
      <div className="w-3/4">
      </div>
    </div>
  );
}
