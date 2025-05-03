"use client";
import * as React from "react";
import { UserButton, useUser, useClerk } from "@clerk/nextjs";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import "@/app/globals.css";
import { Plus } from "lucide-react";

const Logo = () => (
  <div className="flex items-center gap-2">
    <svg
      width="24"
      height="24"
      viewBox="0 0 375 375"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className="text-orange-500"
    >
      <defs>
        <clipPath id="70dc2f3683">
          <path
            d="M 17 17 L 358 17 L 358 358 L 17 358 Z M 17 17 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="dd3551f5f4">
          <path
            d="M 214.40625 28.789062 C 231.503906 47.082031 255.671875 57.09375 280.699219 56.25 C 290.894531 55.902344 300.773438 59.800781 307.984375 67.015625 C 315.199219 74.226562 319.097656 84.105469 318.75 94.300781 C 317.90625 119.324219 327.917969 143.496094 346.210938 160.59375 C 353.660156 167.558594 357.890625 177.300781 357.890625 187.5 C 357.890625 197.699219 353.660156 207.441406 346.210938 214.40625 C 327.917969 231.503906 317.90625 255.671875 318.75 280.699219 C 319.097656 290.894531 315.199219 300.773438 307.984375 307.984375 C 300.773438 315.199219 290.894531 319.097656 280.699219 318.75 C 255.671875 317.90625 231.503906 327.917969 214.40625 346.210938 C 207.441406 353.660156 197.699219 357.890625 187.5 357.890625 C 177.300781 357.890625 167.558594 353.660156 160.59375 346.210938 C 143.496094 327.917969 119.324219 317.90625 94.300781 318.75 C 84.105469 319.097656 74.226562 315.199219 67.015625 307.984375 C 59.800781 300.773438 55.902344 290.894531 56.25 280.699219 C 57.09375 255.671875 47.082031 231.503906 28.789062 214.40625 C 21.339844 207.441406 17.109375 197.699219 17.109375 187.5 C 17.109375 177.300781 21.339844 167.558594 28.789062 160.59375 C 47.082031 143.496094 57.09375 119.324219 56.25 94.300781 C 55.902344 84.105469 59.800781 74.226562 67.015625 67.015625 C 74.226562 59.800781 84.105469 55.902344 94.300781 56.25 C 119.324219 57.09375 143.496094 47.082031 160.59375 28.789062 C 167.558594 21.339844 177.300781 17.109375 187.5 17.109375 C 197.699219 17.109375 207.441406 21.339844 214.40625 28.789062 Z M 214.40625 28.789062 "
            clipRule="nonzero"
          />
        </clipPath>
      </defs>
      <g clipPath="url(#70dc2f3683)">
        <g clipPath="url(#dd3551f5f4)">
          <rect
            x="-37.5"
            width="450"
            fill="currentColor"
            y="-37.499999"
            height="449.999989"
            fillOpacity="1"
          />
        </g>
      </g>
    </svg>
    <span className="font-bold text-lg text-gray-900 dark:text-gray-100">
      Negotiation.AI
    </span>
  </div>
);

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser();
  const { openUserProfile } = useClerk();

  return (
    <>
      <SidebarProvider>
        <Sidebar {...props}>
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem className="flex w-full justify-center mt-4">
                <SidebarMenuButton className="flex items-center justify-center">
                  <Link href="/">
                    <Logo />
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem className=" flex w-full justify-center mt-4">
                <SidebarMenuButton className="mt-4 w-5/6 flex items-center justify-center gap-2 rounded-md border border-orange-200 bg-orange-50 px-4 py-3 transition hover:bg-orange-100 hover:cursor-pointer">
                  <Plus className="h-4 w-4 text-orange-500" />
                  <span className="text-sm font-semibold text-orange-500">
                    New Negotiation
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* <SidebarMenuItem className="flex w-full justify-center mt-8">
                <span className="text-sm text-gray-500 font-medium uppercase">
                  Recent Chats
                </span>
              </SidebarMenuItem> */}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="flex flex-col gap-2 items-stretch">
            <div className="mt-auto border-t p-4">
              <div className="flex items-center gap-3">
                <UserButton afterSignOutUrl="/" />
                <div className="flex flex-col">
                  <span className="font-medium">
                    {user?.firstName} {user?.lastName}
                  </span>
                  <span
                    className="text-sm text-gray-500 cursor-pointer hover:text-gray-700"
                    onClick={() => openUserProfile()}
                  >
                    Manage account
                  </span>
                </div>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>
      </SidebarProvider>
    </>
  );
}
