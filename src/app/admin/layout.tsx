import Sidebar from "@/components/AdminComponents/sidebar";

export default function Layout({ children, } : { children: React.ReactNode; }) {

    return (
        <>
            <div className="flex">
                <Sidebar />
            </div>
            {children}
        </>
    )
}