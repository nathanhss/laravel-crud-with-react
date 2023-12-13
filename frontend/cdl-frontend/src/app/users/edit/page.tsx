"use client"
import EditUserForm from "@/app/components/editUser.component";
import PhoneTable from "@/app/components/phoneTable.component";

export default function EditUser({ searchParams }: { searchParams: { id: number } }) {
    return (
        <>
            <div className="bg-gray-50 px-10 mx-10 rounded-md">
                <EditUserForm id={searchParams.id} />
                <PhoneTable id={searchParams.id} />
            </div>
        </>
    );
}