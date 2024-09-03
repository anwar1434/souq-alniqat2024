"use client";
import { useState, useEffect } from "react";
import styles from "./styles/GameCard.module.css";
import Loading from "./Loading";
import Message from "./Message";

function OrderButton({ gameName, gamePrice, id }: { gameName: string; gamePrice: number; id: string; }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    if (!isOnline) {
      setMessage("لا يوجد اتصال بالإنترنت");
    }
  }, [isOnline]);

  const handleResponse = (data: any, status: number) => {
    if (status === 200) {
      setMessage(data.message);
    } else if (status === 400) {
      setMessage(data.notHavePoints || "رصيدك غير كافٍ لشراء هذه اللعبة.");
    } else {
      setMessage("حدث خطأ الرجاء المحاولة مجدداً");
    }

    setTimeout(() => {
      setMessage(null);
    }, 10000); // إخفاء الرسالة بعد 3 ثوانٍ
  };

  const handleSendOrder = async () => {
    if (loading) return; // منع النقر المتكرر أثناء التحميل
    setLoading(true);

    try {
      const response = await fetch(`https://souqalniqat-server.onrender.com/procedures/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gameName, gamePrice }),
      });

      const data = await response.json();
      handleResponse(data, response.status);
    } catch (error) {
      console.error("Error:", error);
      setMessage("حدث خطأ في الاتصال بالخادم. الرجاء المحاولة لاحقاً.");
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <Loading />
  ) : (
      <>
        { message && <Message text={ message} />}
      <button onClick={handleSendOrder} className={styles["card-btn"]}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="m397.78 316h-205.13a15 15 0 0 1 -14.65-11.67l-34.54-150.48a15 15 0 0 1 14.62-18.36h274.27a15 15 0 0 1 14.65 18.36l-34.6 150.48a15 15 0 0 1 -14.62 11.67zm-193.19-30h181.25l27.67-120.48h-236.6z"></path>
          <path d="m222 450a57.48 57.48 0 1 1 57.48-57.48 57.54 57.54 0 0 1 -57.48 57.48zm0-84.95a27.48 27.48 0 1 0 27.48 27.47 27.5 27.5 0 0 0 -27.48-27.47z"></path>
          <path d="m368.42 450a57.48 57.48 0 1 1 57.48-57.48 57.54 57.54 0 0 1 -57.48 57.48zm0-84.95a27.48 27.48 0 1 0 27.48 27.47 27.5 27.5 0 0 0 -27.48-27.47z"></path>
          <path d="m158.08 165.49a15 15 0 0 1 -14.23-10.26l-25.71-77.23h-47.44a15 15 0 1 1 0-30h58.3a15 15 0 0 1 14.23 10.26l29.13 87.49a15 15 0 0 1 -14.23 19.74z"></path>
        </svg>
      </button>
    </>
  );
}

export default OrderButton;
