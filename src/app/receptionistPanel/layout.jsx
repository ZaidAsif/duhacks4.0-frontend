import ReceptionistProtectedRoutes from "@/hoc/receptionistProtectedRoutes";


export default function ReceptionistLayout({children}) {

    return (
        <ReceptionistProtectedRoutes>{children}</ReceptionistProtectedRoutes>
    )
}