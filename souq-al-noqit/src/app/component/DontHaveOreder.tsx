import Image from "next/image";
import styles from "./styles/Person.module.css";
import { CiShop } from "react-icons/ci";
import Link from "next/link";

function DontHaveOreder({ id }: { id: string }) {
  return (
    <div className="main">
      <Image
        src="/imgs/Persone 1.png"
        alt="Landscape picture"
        className={styles["person"]}
        width={400}
        height={200}
      />
      <h1 className={styles["text"]}>
        مرحباً لم تقم باختيار ألعاب بعد اذهب وأختار ألعابك
        <Link href={`/SouqAlNoqit/${id}`} className="text-black mt-2 ">
          <CiShop size={55} />
        </Link>
      </h1>
    </div>
  );
}

export default DontHaveOreder;
