import LoginCompt from "./LoginCompt";
import myLogo from "./assets/logo.svg";

export default function Login(){
    return(
        <div className="w-full h-screen flex flex-row justify-center items-start bg-[#F5F7FA]">
            <img className="p-4 w-1/2 h-1/2 justify-self-center self-center" src={myLogo} alt={"Icon"} />
            <LoginCompt />
        </div>
    )
}