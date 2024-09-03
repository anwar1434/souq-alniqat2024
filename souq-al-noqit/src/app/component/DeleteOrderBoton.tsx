"use client";
import { RiDeleteBin5Line } from "react-icons/ri";
import styles from "./styles/GameCard.module.css";
import Loading from "./Loading";
import { useState } from "react";

function DeleteOrderBoton({
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
  const [loading, setLoading] = useState(false);

  const handleDeleteOrder = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://souqalniqat-server.onrender.com/procedures/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gameName, gamePrice }),
      });

      if (!response.ok) {
        alert("حدث خطأ في الاتصال");
      } else {
        onDelete(); 
      }
    } catch (error) {
      alert("حدث خطأ في الاتصال");
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <button className={styles["card-btn"]} onClick={handleDeleteOrder}>
      <RiDeleteBin5Line />
    </button>
  );
}

export default DeleteOrderBoton;
