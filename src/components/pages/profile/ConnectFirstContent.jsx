import userIcon from "../../../assets/ui_user.svg";

export default function ConnectFirstContent(){
    return(
        <div className="flex flex-col sm:flex-row items-start justify-between p-4 sm:p-6 lg:p-8 bg-white rounded-xl shadow-md">
            {/* Profile Image */}
            <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
                <div className="rounded-full overflow-hidden w-16 h-16 sm:w-20 sm:h-20 border-2 border-gray-200">
                    <img
                      src={userIcon}
                        alt="User"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            {/* Main Content */}
            <div className="w-full flex flex-col sm:flex-row justify-between items-start gap-4">
                <div className="flex flex-col gap-y-4 flex-1">
                    <div className="flex flex-col gap-y-2">
                        <h3 className="font-semibold text-xl sm:text-2xl text-gray-900">John Doe</h3>
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                          Learn React and work on a project that is built with React functional and responsive
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <button className="bg-blue-600 hover:bg-blue-700 rounded-full px-6 py-3 text-white font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                          Connect
                        </button>
                        <button className="border border-gray-400 hover:border-gray-600 hover:bg-gray-50 px-6 py-3 text-gray-700 rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2">
                          Message
                        </button>
                    </div>
                </div>
                
                {/* User Info */}
                <div className="flex flex-col justify-end gap-y-2 text-right">
                    <p className="font-medium text-gray-500 text-sm">@johnny</p>
                    <p className="font-light text-gray-400 text-sm">GMT+1</p>
                </div>
            </div>
        </div>
    )
}