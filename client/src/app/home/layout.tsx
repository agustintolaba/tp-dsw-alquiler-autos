import MenuAppBar from "@/components/layout/MenuAppBar";
import { ReactNode } from "react";

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <MenuAppBar />
      {children}
    </>
  );
}
