import UserInfo from "@/components/UserInfo";
import { AuthProvider } from "../AuthContext";

export default function Profile() {

    return (
    <AuthProvider>

            <UserInfo  />

    </AuthProvider>

    )

}