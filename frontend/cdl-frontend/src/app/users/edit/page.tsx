"use client"
import EditUserForm from "@/app/components/editUser.component";

export default function EditUser({ searchParams }: { searchParams: { id: number } }) {
    return (
        <>
            <div>
                <EditUserForm id={searchParams.id} />
            </div>
        </>
    );
}