import AdminProtectedRoutes from "@/hoc/adminProtectedRoutes";


export default function AdminLayout({children}) {

    return (
        <AdminProtectedRoutes>{children}</AdminProtectedRoutes>
    )
}