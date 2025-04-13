
import ThemeSwitchButton from "./ThemeButton";
import LogoSection from "@/app/_components/logoSection";
import DashboardLinks from "@/app/_components/dashboardLinks";
import NavbarLoginLogout from "./NavbarLoginLogout";

export default function Navbar() {
    return <div className="h-16 w-full flex items-center justify-between px-4 shrink-0">
        <div>
            <LogoSection />
        </div>
        <div className="flex w-50 justify-between gap-2">
            <DashboardLinks />
        </div>
        <div className="w-60 flex justify-end items-center gap-3">
            <NavbarLoginLogout />
            <ThemeSwitchButton />
        </div>
    </div>
}