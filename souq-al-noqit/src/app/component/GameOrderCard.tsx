import styles from "./styles/GameCard.module.css";
import { FaRegFilePowerpoint } from "react-icons/fa";
import DeleteOrderBoton from "./DeleteOrderBoton";

function GameOrderCard({
  gameName,
  gamePrice,
  id,
  onDelete,
}: {
  gameName: string;
  gamePrice: number;
  id: string;
  onDelete: () => void; // إضافة خاصية onDelete
}) {
  return (
    <div className={styles["card"]}>
      <div className={styles["card-title"]}>{gameName}</div>

      <hr className={styles["card-divider"]}></hr>
      <div className={styles["card-footer"]}>
        <div className={styles["card-price"]}>
          <span className={styles["price"]}>
            <FaRegFilePowerpoint size={30} />
          </span>
          {gamePrice}
        </div>
        <DeleteOrderBoton
          gameName={gameName}
          gamePrice={gamePrice}
          id={id}
          onDelete={onDelete} // تمرير onDelete
        />
      </div>
    </div>
  );
}

export default GameOrderCard;
