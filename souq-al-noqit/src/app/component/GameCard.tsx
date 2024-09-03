import styles from "./styles/GameCard.module.css";
import Image from "next/image"; 
import { FaRegFilePowerpoint } from "react-icons/fa";
import OrederBotton from "./OrederBotton";
import Button from "./Button";

function GameCard({
  gameName,
  gamePrice,
  imageUrl,
  id,
}: {
  gameName: string;
  gamePrice: number;
  imageUrl: string;
  id: string;
}) {
  return (
    <div className={styles["card"]}>
      <div className={styles["card-img"]}>

        <img src={imageUrl} alt={gameName}  />
      </div>
      <div className={styles["card-title"]}>{gameName}</div>

      <hr className={styles["card-divider"]}></hr>
      <div className={styles["card-footer"]}>
        <div className={styles["card-price"]}>
          <span className={styles["price"]}>
            <FaRegFilePowerpoint size={30} />
          </span>
          {gamePrice}
        </div>
        <OrederBotton gameName={ gameName } gamePrice={ gamePrice } id={ id } />
        
      </div>
    </div>
  );
}

export default GameCard;
