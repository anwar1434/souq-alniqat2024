import Image from "next/image";
import styles from "./styles/Police.module.css";
function Police() {
  return (
    <div className="">
      <h1 className={styles["text"]}> توقف توقف ! إالى أين أنت ذاهب</h1>
      <Image
        src="/imgs/Police.png"
        alt="Landscape picture"
        className={styles["police"]}
        width={250}
        height={200}
      />
    </div>
  );
}

export default Police;
