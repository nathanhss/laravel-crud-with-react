"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateUserForm() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        document: "",
    });

    const handleInput = (element: any) => {
        const fieldName = element.target.id;
        const fieldValue = element.target.value;

        setFormData((prevState) => ({
            ...prevState,
            [fieldName]: fieldValue
        }));
    }

    const submitForm = async (form: any) => {
        form.preventDefault();

        const data = new FormData();

        Object.entries(formData).forEach(([key, value]) => {
            data.append(key, value);
        });

        const fetchResponse = await fetch('http://localhost:8000/api/users', {
            method: "POST",
            body: data,
            headers: {
                'accept': 'application/json',
            },
        });

        const response = await fetchResponse.json();

        if (response?.error) {
            alert(`Error creating user`);
        } else {
            alert(`User created successfully`);
            router.back();
        }

        setFormData({
            name: "",
            document: ""
        });
    }

    return (
        <div className="bg-gray-50 px-10 mx-10 rounded-md">
            <h1
                className='text-3xl antialiased font-bold flex justify-center'
            >
                Criar Usuário
            </h1>

            <form id="createForm" className="max-w-sm mx-auto flex space-x-3 justify-center" method="POST" onSubmit={submitForm}>
                <div className="mb-5">
                    <input
                        id="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Nome completo"
                        onChange={handleInput}
                        required
                    />

                    <input
                        id="document"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="CPF"
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
    );
}