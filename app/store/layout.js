import { DataProvider } from "./DataContext";




export default function RootLayout({ children }) {
    return (
        <DataProvider>
            <main>{children}</main>
        </DataProvider>
    );
  }

