import React from 'react';

const Registrasi = () => {
    return (
        <div className="w-screen h-screen flex flex-col gap-10 justify-center bg-neutral-200 bg-center">
            <div className="flex justify-center text-4xl font-bold text-gray-900 dark:text-yellow-900">REGISTRATION</div>
            <form className="max-w-sm mx-auto w-full flex flex-col gap-3 items-center">
                <div className="mb w-full">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-yellow-900">Your email</label>
                    <input
                        type="email"
                        id="email"
                        className="shadow-sm bg-gray-50 border text-gray-900 text-sm rounded-full border-yellow-500 focus:border-yellow-700 focus:ring-yellow-700 block w-full p-2.5 dark:bg-transparent dark:border-yellow-900 dark:placeholder-gray-400 dark:text-yellow-900 dark:focus:ring-blue-500 dark:focus:border-yellow-500 dark:shadow-sm-light"
                        placeholder="name@gmail.com"
                        required
                    />
                </div>
                <div className="mb w-full">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-900 dark:text-yellow-900">Your password</label>
                    <input
                        type="password"
                        id="password"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-transparent dark:border-yellow-900 dark:placeholder-gray-400 dark:text-yellow-900 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        placeholder="********"
                        required
                    />
                </div>
                <div className="mb-5 w-full">
                    <label htmlFor="repeat-password" className="block text-sm font-medium text-gray-900 dark:text-yellow-900">Repeat password</label>
                    <input
                        type="password"
                        id="repeat-password"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-transparent dark:border-yellow-900 dark:placeholder-gray-400 dark:text-yellow-900 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        placeholder="********"
                        required
                    />
                </div>
                <div className="flex items-start mb-1 w-full">
                    <div className="flex items-center h-5 p-3">
                        <input
                            id="terms"
                            type="checkbox"
                            value=""
                            className="w-4 h-4 border border-gray-300 bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                            required
                        />
                    </div>
                    <label htmlFor="terms" className="ms-2 text-sm font-medium text-gray-900 dark:text-yellow-900">
                        I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a>
                    </label>
                </div>
                <button
                    type="submit"
                    className="w-full rounded-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    SignUp
                </button>
                <button
                    type="submit"
                    className="w-full rounded-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    SignUp with Google
                </button>
            </form>
        </div>
    );
};

export default Registrasi;