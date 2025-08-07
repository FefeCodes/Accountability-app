import googleIcon from "./assets/google-icon.svg";

export default function LoginCompt({ email, password, onEmailChange, onPasswordChange, onSubmit, onGoogleLogin }){
    return(
        <div className=" w-1/2 h-full bg-white p-16 flex flex-col justify-center items-start">
            <h1 className="text-3xl font-bold pb-8 text-black">Welcome back</h1>

            <div className="w-full h-auto flex flex-col justify-start items-start gap-y-2.5">
            <label className="text-2xl font-medium  text-black">Email</label>
            <input
            className="w-full h-auto border border-[#474646] rounded-md p-4 text-xl font-regular text-[#545454]" 
            type="email"
            placeholder="Enter your Email"
            value={email}
            onChange={onEmailChange}
            />
            </div>

            <div className="w-full h-auto flex flex-col justify-start items-start gap-y-2.5">
            <label className="text-2xl font-medium text-black">Password</label>
            <input 
            className="w-full h-auto border border-[#474646] rounded-md p-4 text-xl font-regular text-[#545454]"
            type="password" 
            placeholder="Enter your Password"
            value={password}
            onChange={onPasswordChange}
            />
            </div>

            <div className="justify-self-end self-end mb-6 text-[#FF3A3A]">
                <a className="text-lg font-medium" href="#">Forgot password</a>
            </div>

            <button className="w-full h-auto bg-[#3C91E6] rounded-md p-4 text-xl font-medium text-white mb-4 shadow-2xl" onClick={onSubmit}>Log In</button>

            <button className="w-full h-auto flex flex-row justify-center items-center gap-x-2 border rounded-md p-4 text-xl font-medium mb-4 shadow-2xl" onClick={onGoogleLogin}> 
            <img className="w-6 h-6" src={googleIcon} alt={"Icon"} />Log In with Google</button>

            <p className="justify-self-center self-center text-[#545454] font-medium">Don't have an account? <a className="text-[#3C91E6] font-medium" href="#">Sign Up</a></p>
        </div>

    )
}