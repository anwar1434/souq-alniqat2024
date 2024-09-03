"use client";
import { useState } from "react";
import Button from "../component/Button";
import GameCard from "../component/GameCard";

type Game = {
  _id: string;
  name: string;
  price: number;
  photo: string;
  type:string
};

const buttonList = [
  { id: 1, name: "ألعاب" },
  { id: 2, name: "قرطاسية" },
  { id: 3, name: "كتب" },
  { id: 4, name: "إلكترونيات" },
];
// eslint-disable-next-line @next/next/no-async-client-component
async function F({ id }: { id: string }) {
  const [GameType, setGameType] = useState("ألعاب");
  //  Fetch games :
  const response = await fetch("https://souqalniqat-server.onrender.com/game", {
    cache: "no-store",
  });
  const result = await response.json();
  const games: Game[] = result.data;

  const filteredGames = games.filter((game) => game.type === GameType);

  return (
    <div className="w-full flex flex-col items-center justify-start mt-10 overflow-hidden">
      <div className="w-full flex items-center justify-center flex-row mb-8 ">
        {buttonList.map((btn) => (
          <button key={btn.id} onClick={() => {setGameType(btn.name)}}>
            <Button key={btn.id} text={btn.name} />
          </button>
        ))}
      </div>

      
      {filteredGames.map((game) => (
        <GameCard
          key={game._id}
          gameName={game.name}
          gamePrice={game.price}
          imageUrl={game.photo}
          id={id}
        />
      ))}
    </div>
  );
}

export default F;
