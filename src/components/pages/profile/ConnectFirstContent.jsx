import userIcon from "../../../assets/ui_user.svg";

export default function ConnectFirstContent(){
    return(
        <div className="flex flex-col items-start justify-between p-6">
            <div className="p-1 rounded-full overflow-hidden w-8 h-8 sm:w-10 sm:h-10 border">
                <img
                  src={userIcon}
                    alt="User"
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="w-full flex flex-row justify-between items-start">
                <div className="flex flex-col gap-y-5">
                    <div className="flex flex-col gap-y-1">
                        <h3 className="font-semibold text-xl">John Doe</h3>
                        <p>Learn React and work on a project that is built with React functional and responsive</p>
                    </div>
                    <div className="flex flex-row gap-x-5">
                        <div>
                            <button className="bg-[#3C91E6] rounded-4xl px-6 py-3 text-white">Connect</button>
                        </div>
                        <div>
                            <button className="border border-[#545454] px-6 py-3 text-[#545454] rounded-4xl">Message</button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-end gap-y-1">
                    <p className="font-light">@johnny</p>
                    <p className="font-light">GMT+1</p>
                </div>
            </div>
        </div>
    )
}