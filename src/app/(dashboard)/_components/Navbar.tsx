
import ThemeSwitchButton from "./ThemeButton";
import LogoSection from "@/app/_components/logoSection";
import DashboardLinks from "@/app/_components/dashboardLinks";
import NavbarLoginLogout from "./NavbarLoginLogout";
import { auth } from "@/auth";

export default async function Navbar() {

    const session = await auth();

    return <div className="h-16 w-full flex items-center justify-between px-4 shrink-0">
        <div>
            <LogoSection />
        </div>
        <div hidden={(session?.user.id) ? false : true} className="flex w-50 justify-between gap-2">
            <DashboardLinks />
        </div>
        <div className="w-60 flex justify-end items-center gap-3">
            <NavbarLoginLogout session={session} />
            <ThemeSwitchButton />
        </div>
    </div>
}