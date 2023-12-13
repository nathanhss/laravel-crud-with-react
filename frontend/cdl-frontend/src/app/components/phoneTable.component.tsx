import Link from "next/link";
import { useEffect, useState } from "react";

interface PhonesProps {
    created_at: string;
    id: number;
    number: string;
    updated_at: string;
    user_id: number;
}

export default function PhoneTable({ id }: { id: number }) {
    const [phones, setPhones] = useState<PhonesProps[]>([]);

    useEffect(() => {
        const fetchUserPhones = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/phones');
                const phonesResponse: { phones: PhonesProps[] } = await response.json();


                setPhones(phonesResponse.phones.filter(phoneResponse => {
                    return Number(phoneResponse.user_id) === Number(id)
                }));


            } catch (error) {
                console.log('Erro ao obter telefones: ', error);
            }
        }
        fetchUserPhones();
    }, [])

    const handlerDeletePhone = async (id: number) => {
        const response = await fetch(`http://localhost:8000/api/phones/${id}`, { method: "DELETE" });
        const responseObject = await response.json();

        if (responseObject?.error) {
            alert('Telefone não encontrado');
        } else {
            alert('Telefone excluído com sucesso');
            window.location.reload();
        }
    };

    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div className='flex justify-start'>
                    <button
                        type="button"
                        className="mt-2 mb-2 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                        <Link
                            href={{
                                pathname: "/phone",
                                query: {
                                    id: id
                                }
                            }}

                        >
                            Novo telefone
                        </Link>
                    </button>
                </div>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Telefone
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Excluir
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            phones.map(phone => (
                                <tr key={phone.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {phone.id}
                                    </th><td className="px-6 py-4">
                                        {phone.number}
                                    </td><td className="px-6 py-4">
                                        <button onClick={() => handlerDeletePhone(phone.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">X</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
}