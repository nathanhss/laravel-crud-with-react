import { useEffect, useState } from "react";
import { UserProps } from "./userList.component";

export default function EditUserForm({ id }: { id: number }) {
    const [formData, setFormData] = useState<UserProps>({
        name: "",
        document: "",
        id: -1,
        created_at: "",
        updated_at: ""
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/users/${id}`);
                const usersData: { user: UserProps } = await response.json();

                setFormData(usersData.user);

            } catch (error) {
                console.log('Erro ao obter usuários: ', error);
            }
        }

        fetchUserData();
    }, []);

    const handleInput = (element: { target: { id: string, value: string } }) => {
        const fieldName = element.target.id;
        const fieldValue = element.target.value;

        setFormData((prevState) => ({
            ...prevState,
            [fieldName]: fieldValue
        }));
    }

    const submitEditForm = async (e: any) => {
        e.preventDefault();

        const data = JSON.stringify({
            name: formData.name,
            document: formData.document
        })

        const fetchResponse = await fetch(`http://localhost:8000/api/users/${formData.id}`, {
            method: "PUT",
            body: data,
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
        });

        const response = await fetchResponse.json();

        if (response?.error) {
            alert(`Error creating user`);
        } else {
            alert(`User created successfully`);
        }
    }

    return (
        <div className="bg-gray-50 px-10 mx-10 rounded-md">
            <h1
                className='text-3xl antialiased font-bold flex justify-center'
            >
                Editar Usuário
            </h1>

            <form id="createForm" className="max-w-sm mx-auto flex space-x-3 justify-center" method="POST" onSubmit={submitEditForm}>
                <div className="mb-5">
                    <input
                        id="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Nome completo"
                        onChange={handleInput}
                        value={formData.name}
                        required
                    />

                    <input
                        id="document"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="CPF"
                        onChange={handleInput}
                        value={formData.document}
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