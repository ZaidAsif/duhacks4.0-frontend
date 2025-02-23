import StaffProtectedRoutes from "@/hoc/staffProtectedRoutes";


export default function StaffLayout({children}) {

    return (
        <StaffProtectedRoutes>
            {children}
            </StaffProtectedRoutes>
    )
}