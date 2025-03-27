import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar"; // Import the updated Navbar
import Link from "next/link";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex">
      {/* LEFT SIDEBAR */}
      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4 bg-lamaSkyLight dark:bg-gray-800">
        <Link
          href="/"
          className="flex items-center justify-center lg:justify-start gap-2"
        >
          <span className="hidden lg:block font-bold text-black dark:text-white">
            System de Gestion de Pointage
          </span>
        </Link>
        <Menu />
      </div>

      {/* RIGHT CONTENT */}
      <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA] dark:bg-gray-900 overflow-scroll flex flex-col">
        {/* Navbar */}
        <Navbar />

        {/* MAIN CONTENT */}
        <div className="flex-1 p-4">{children}</div>
      </div>
    </div>
  );
}