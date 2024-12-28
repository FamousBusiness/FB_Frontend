import { DataProvider } from "./DataContext";
import StoreTopNavbar from "./Navbar/TopNavbar";




export default function RootLayout({ children }) {

    return (
        <DataProvider>
            <StoreTopNavbar />
            <main>{children}</main>
        </DataProvider>
    );
};


