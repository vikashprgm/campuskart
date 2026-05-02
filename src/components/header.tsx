'use client';

import { NotificationDropdown } from "./ProductPage/NotificationDropdown";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "./ui/sidebar";
import i from './logo_text.png'
import { Link } from "@tanstack/react-router";
import { ThemeToggle } from "./ThemeToggle";
import { DropdownMenuAvatar } from "./ProductPage/AvatarDropdown";
import { toast } from "sonner";
import { Upload } from "lucide-react";
import { Button } from "./ui/button";

type userdata = {
  email: string,
  name: string | null
}

type HeaderProps = {
  userdata: userdata | null,
  sidebarToggle: boolean
}

const Header = ({ userdata, sidebarToggle }: HeaderProps) => {
  return (
    <header className="bg-card sticky top-0 z-50 border-b">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-2 sm:px-6">
        {sidebarToggle && <SidebarTrigger />}
        <div className="flex items-center gap-4">
          <Link to='/' onClick={() => { toast.info('Navigating to homepage') }}>
            <img
              src={i}
              alt="logo"
              className="h-8"
            >
            </img>
          </Link>
        </div>

        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          <Link to="/upload">
            <Button>
              Post Ad
              <Upload />
            </Button>
          </Link>
          <DropdownMenuAvatar {...userdata} />
        </div>
      </div>
    </header>
  );
};

export default Header;
