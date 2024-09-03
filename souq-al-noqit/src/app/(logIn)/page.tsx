import LogInForm from "../component/LogInForm";
import Police from "../component/Police";

function LogIn() {
  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center  background-pattern ">
      {/* <Police/> */}
      <div className="mb-12 w-3/4 flex justify-center">
        <LogInForm />
      </div>
    </div>
  );
}

export default LogIn;
