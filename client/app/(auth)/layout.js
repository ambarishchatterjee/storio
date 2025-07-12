import Navigation from "@/components/Navigation";
import "../../app/globals.css";



export default function authLayout ({ children }) {
  return (
    <div className="min-h-[70vh] bg-white flex items-center justify-center ">
      <div className="max-w-md w-full ">
       
            {children}
          
      </div>
      </div>
  );
}
