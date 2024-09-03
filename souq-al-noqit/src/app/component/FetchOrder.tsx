"use client";
import { useEffect, useState } from "react";
import DontHaveOreder from "../component/DontHaveOreder";
import GameOrderCard from "../component/GameOrderCard";

type Choice = {
  _id: string;
  name: string;
  price: number;
};

type Student = {
  _id: string;
  name: string;
  points: number;
  secretNumber: number;
  phoneNumber: number;
  choices: Choice[];
};

function FetchOrder({ id }: { id: string }) {
  const [student, setStudent] = useState<Student | undefined>();

  const fetchStudentData = async () => {
    try {
      const response = await fetch(`https://souqalniqat-server.onrender.com/student/${id}`, {
        cache: "no-cache",
      });

      if (!response.ok) {
        console.error("حدث خطأ في الإتصال");
        return;
      }

      const result = await response.json();
      setStudent(result.result as Student);
    } catch (error) {
      console.error("حدث خطأ أثناء جلب البيانات:", error);
    }
  };

  useEffect(() => {
    fetchStudentData();
    const intervalId = setInterval(fetchStudentData, 10000); // الفحص كل 10 ثواني

    return () => clearInterval(intervalId);
  }, [id]);

  return (
    <div className="relative w-full flex flex-col items-center justify-start mt-10">
      <div id="choices">
        {student && student.choices.length > 0 ? (
          student.choices.map((choice: Choice) => (
            <GameOrderCard
              key={choice._id}
              gameName={choice.name}
              gamePrice={choice.price}
              id={id}
              onDelete={fetchStudentData} // إعادة جلب البيانات بعد الحذف
            />
          ))
        ) : (
          <DontHaveOreder id={id} />
        )}
      </div>
    </div>
  );
}

export default FetchOrder;
