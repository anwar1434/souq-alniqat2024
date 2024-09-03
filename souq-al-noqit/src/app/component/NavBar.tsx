"use client";
import Image from "next/image";
import styles from "./styles/NavBar.module.css";
import Link from "next/link";
import Loading from "./Loading";
import { useState, useEffect } from "react";
import { FaHome } from "react-icons/fa";
import { FaRegFilePowerpoint } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { MdLogout } from "react-icons/md";

function NavBar({ id }: { id: string }) {
  const [points, setPoints] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const response = await fetch(`https://souqalniqat-server.onrender.com/student/${id}`, {
          next: { revalidate: 20 },
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch student data: ${response.statusText}`
          );
        }

        const student = await response.json();
        setPoints(student.result.points);
        setError(null); // Clear any previous error
      } catch (error) {
        console.error("Error fetching student data:", error);
        setError("Failed to load points");
        setPoints(null); // Reset points on error
      } finally {
        setLoading(false);
      }
    };

    fetchPoints();

    const intervalId = setInterval(fetchPoints, 1000);

    return () => clearInterval(intervalId);
  }, [id]);

  return (
    <div className={styles["main-nav"]}>
      <nav className={styles["navBar"]}>
        <div className={styles["nav-botton"]}>
          <Link href={`/SouqAlNoqit/${id}/order`}>
            <FaShoppingCart size={35} />
          </Link>

          <hr className={styles["hr"]} />
          <Link href={`/SouqAlNoqit/${id}`}>
            <FaHome size={35} />
          </Link>

          <Link href={`/`}>
            <MdLogout size={35} />
          </Link>
        </div>

        <div className={styles["point"]}>
          <FaRegFilePowerpoint size={40} />
          {loading ? (
            <Loading />
          ) : error ? (
            <span className={styles["error"]}>{error}</span>
          ) : (
            <span className={styles["point-number"]}>{points}</span>
          )}
        </div>

        <Image src="/imgs/الشعار.png" alt="خيرو ياسين" width={80} height={10} priority={true} />
      </nav>
    </div>
  );
}

export default NavBar;
