"use client";
import BottonForm from "./BottonForm";
import styles from "@/app/component/styles/LoginForm.module.css"
import Loading from "../loading";
import Message from "./Message";
import { useRouter } from "next/navigation";
import { useState } from "react";

function LogInForm() {
  const [code, setcode] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<boolean>(false);
  const [text, setText] = useState<string>("");

  const router = useRouter();

  const handleError = (message: string) => {
    setText(message);
    setMessage(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // منع إعادة التحميل الافتراضية للنموذج

    if (!code) {
      handleError("يجب إدخال الرقم السري!");
      return;
    }

    setLoading(true);
    setMessage(false); // إعادة تعيين الرسالة السابقة

    try {
      const response = await fetch("https://souqalniqat-server.onrender.com/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      if (response.status === 500) {
        handleError("حدث خطأ في الاتصال.");
        setLoading(false);
        return;
      }

      if (!response.ok) {
        handleError("الرمز غير موجود. الرجاء التأكد من الرمز ثم إعادة المحاولة.");
        setLoading(false);
        return;
      }

      const data = await response.json();
      const id = data.id;

      // بمجرد الضغط على `router.push`، يتم الانتقال للصفحة الجديدة
      router.push(`/SouqAlNoqit/${id}`);

    } catch (error) {
      handleError("حدث خطأ في الاتصال بالخادم.");
      setLoading(false);
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <form className="flex flex-col items-center justify-start" onSubmit={handleSubmit}>
      {message && <Message text={text} />}

      <div className={styles["input__container"]}>
        <div className={styles["shadow__input"]}></div>
        <button className={styles["input__button__shadow"]}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#000000"
            width="20px"
            height="20px"
          >
            <path d="M0 0h24v24H0z" fill="none"></path>
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
          </svg>
        </button>
        <input
          onChange={(e) => setcode(Number(e.target.value))}
          value={code}
          type="number"
          name="password"
          className={styles["input__search"]}
          placeholder="الرقم السري"
        />
      </div>

      <BottonForm />
    </form>
  );
}

export default LogInForm;
