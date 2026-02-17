'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  BookOpen,
  LayoutDashboard,
  MessageSquare,
  ListChecks,
  LogOut,
  Sparkles,
} from 'lucide-react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const menuItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/notes', label: 'Notes', icon: BookOpen },
    { href: '/flashcards', label: 'Flashcards', icon: Sparkles },
    { href: '/planner', label: 'Planner', icon: ListChecks },
    { href: '/chat', label: 'Chat', icon: MessageSquare },
  ];

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Logo />
            <SidebarTrigger className="ml-auto" />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map(({ href, label, icon: Icon }) => (
              <SidebarMenuItem key={href}>
                <Link href={href} legacyBehavior passHref>
                  <SidebarMenuButton isActive={pathname.startsWith(href)} tooltip={label}>
                    <Icon />
                    <span>{label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <div className="flex items-center gap-3">
             <Avatar>
                <AvatarImage src="https://picsum.photos/seed/user-avatar/40/40" alt="User" />
                <AvatarFallback>U</AvatarFallback>
             </Avatar>
             <div className="flex flex-col overflow-hidden">
                <span className="font-medium text-sm truncate">User Name</span>
                <span className="text-xs text-muted-foreground truncate">user@example.com</span>
             </div>
             <Link href="/login" className="ml-auto">
                <Button variant="ghost" size="icon" aria-label="Log out">
                    <LogOut className="w-4 h-4"/>
                </Button>
             </Link>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <main className="min-h-screen">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
