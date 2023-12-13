"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page({ searchParams }: { searchParams: { id: number } }) {
    const [phoneData, setPhoneData] = useState({
        number: "",
        user_id: searchParams.id,
    });

    useEffect(() => {
        console.log({ phoneData });
    }, [phoneData])

    const handleInput = (e: { target: { id: string, value: string } }) => {
        console.log('aqui')
        const fieldName = e.target.id;
        const fieldValue = e.target.value;

        setPhoneData((prevState) => ({
            ...prevState,
            [fieldName]: fieldValue
        }));
    }

    const submitForm = async (form: any) => {
        form.preventDefault();

        const data = {
            phones: [String(phoneData.number)],
            user_id: phoneData.user_id,
        };

        const fetchResponse = await fetch('http://localhost:8000/api/phones', {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
        });

        const response = await fetchResponse.json();

        if (response?.error) {
            alert(`Error store number`);
        } else {
            alert(`Number stored successfully`);
        }

        setPhoneData({
            number: "",
            user_id: searchParams.id,
        });
    }
    return <>
        <div className="bg-gray-50 px-10 mx-10 rounded-md">
            <h1
                className='text-3xl antialiased font-bold flex justify-center'
            >
                Adicionar telefone
            </h1>

            <form id="createForm" className="max-w-sm mx-auto flex space-x-3 justify-center" method="POST" onSubmit={submitForm}>
                <div className="mb-5">
                    <input
                        id="number"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Telefone"
                        onChange={handleInput}
                        required
                    />
                    <button
                        type="submit"
                        className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                        Cadastrar
                    </button>
                </div>
            </form>
        </div>
    </>
}