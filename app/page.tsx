import Image from "next/image";
import Search from "./_components/Search";
import Navbar from "./_components/Navbar";
import Logo from "./_components/Logo";

export default function Page() {
  return (
    <>
      <Navbar></Navbar>
      <Search />
    </>
  );
}
