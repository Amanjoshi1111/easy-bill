import { Toaster } from "react-hot-toast";
import Navbar from "./_components/Navbar";

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (<>
        <div className="h-16 w-full border-b-1"></div>
        <div className="h-screen relative m-auto w-[1000px] z-10 bottom-16 ">
            <Navbar/>
            <div className="h-min-screen p-4 ">
                {children}
            </div>
        </div>
        <Toaster />
    </>
    );
}
