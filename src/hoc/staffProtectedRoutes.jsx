'use client'

import useAuthStore from "@/store/authStore"
import { useRouter } from "next/navigation";
import { useEffect } from "react"


export default function StaffProtectedRoutes({children}) {
    const user = useAuthStore((state) => state.user);

    const router = useRouter();

    useEffect(() => {
        if (!user || user.role !== "Staff") {
            router.push('/');
        }
    }, [user])

    return (
        <>
            {
                children
            }
        </>
    )
}