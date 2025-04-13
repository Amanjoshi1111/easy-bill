import { signOut } from "@/auth";

export const logoutAction = async () => {
    await signOut({
        redirectTo: "/"
    });
}