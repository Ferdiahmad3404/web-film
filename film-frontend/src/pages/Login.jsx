import { React } from "react";

const Login = () => {
    return(
        <>
            <div className="w-screen h-screen flex flex-col gap-10 justify-center bg-neutral-200 bg-center">
            <div className="flex justify-center text-4xl font-bold text-gray-900 dark:text-yellow-900">LOGIN</div>
            <form className="max-w-sm mx-auto w-full flex flex-col gap-3 items-center">
                <div className="w-full">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-yellow-900">Your email</label>
                    <input
                        type="email"
                        id="email"
                        className="shadow-sm rounded-full bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-transparent dark:border-yellow-900 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        placeholder="name@flowbite.com"
                        required
                    />
                </div>
                <div className="mb-5 w-full">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-900 dark:text-yellow-900">Your password</label>
                    <input
                        type="password"
                        id="password"
                        className="shadow-sm rounded-full bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-transparent dark:border-yellow-900 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        placeholder="********"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full rounded-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Login
                </button>
                <button
                    type="submit"
                    className="w-full rounded-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Login with Google
                </button>
            </form>
        </div>
        </>
    )
}
export default Login