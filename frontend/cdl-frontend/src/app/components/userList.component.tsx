"use client"

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export interface UserProps {
    created_at: string;
    document: string;
    id: number;
    name: string;
    updated_at: string;
}

export default function UserList() {
    const router = useRouter();
    const [users, setUsers] = useState<UserProps[]>([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/users');
                const usersData: { users: UserProps[] } = await response.json();

                setUsers(usersData.users);

            } catch (error) {
                console.log('Erro ao obter usuários: ', error);
            }
        }

        fetchUserData();
    }, []);

    const handleDelete = async (userId: number) => {
        const response = await fetch(`http://localhost:8000/api/users/${userId}`, { method: "DELETE" });
        const responseObject = await response.json();

        if (responseObject?.error) {
            alert('Usuário não encontrado ou possui telefones cadastros');
        } else {
            alert('Usuário excluído com sucesso');
            window.location.reload();
        }
    };

    return (
        <div>
            <h1 className='text-3xl antialiased font-bold flex justify-center'>Lista de Usuários</h1>
            <div className='flex justify-start'>
                <button
                    type="button"
                    className="mt-5 mb-5 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                    <Link
                        href={{
                            pathname: "/users/create",
                        }}
                    >
                        Novo usuário
                    </Link>
                </button>

            </div>
            <ul role="list" className="divide-y divide-gray-100">
                {users.map((user: UserProps) => (
                    <li className="pb-3 sm:pb-4" key={user.id}>
                        <div className="flex items-center space-x-4 rtl:space-x-reverse">
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate dark:text-black">
                                    {user.name.toUpperCase()}
                                </p>
                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                    {user.document}
                                </p>
                            </div>
                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    <Link href={{
                                        pathname: '/users/edit',
                                        query: {
                                            id: user.id
                                        }
                                    }}>
                                        Editar
                                    </Link>
                                </button>
                                <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => handleDelete(user.id)}
                                >
                                    Deletar
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
