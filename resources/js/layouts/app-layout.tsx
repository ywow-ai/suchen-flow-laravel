import { Link, router, usePage } from '@inertiajs/react';
import {
  Bell,
  Braces,
  Building2,
  Contrast,
  CreditCard,
  Folder,
  Layers,
  LayoutDashboard,
  LogOut,
  Moon,
  MoreVertical,
  Package,
  Receipt,
  Settings,
  Share2,
  ShoppingCart,
  Sun,
  Trash2,
  UserCircle,
  Users,
} from 'lucide-react';
import { ReactNode } from 'react';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { logout } from '@/routes';
import { BreadcrumbItem, NavItem } from '@/types';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

const navs: Record<string, NavItem[]> = {
  main: [
    {
      path: '/',
      name: 'Dasbor',
      regex:
        /^(?!\/(kasir|produk|stok|member|transaksi|settings|rekap)(\/[^?#]*)?(\?[^#]*)?(#.*)?$).+$/,
      Icon: LayoutDashboard,
    },
    {
      path: '/kasir',
      name: 'Kasir',
      regex: /^\/kasir(\/[^?#]*)?(\?[^#]*)?(#.*)?$/,
      Icon: ShoppingCart,
    },
    {
      path: '/produk',
      name: 'Produk',
      regex: /^\/produk(\/[^?#]*)?(\?[^#]*)?(#.*)?$/,
      Icon: Package,
    },
    {
      path: '/stok',
      name: 'Stok',
      regex: /^\/stok(\/[^?#]*)?(\?[^#]*)?(#.*)?$/,
      Icon: Layers,
    },
    {
      path: '/member',
      name: 'Member',
      regex: /^\/member(\/[^?#]*)?(\?[^#]*)?(#.*)?$/,
      Icon: Users,
    },
    {
      path: '/transaksi',
      name: 'Transaksi',
      regex: /^\/transaksi(\/[^?#]*)?(\?[^#]*)?(#.*)?$/,
      Icon: Receipt,
    },
  ],
  secondary: [
    {
      path: '/settings',
      name: 'Pengaturan',
      regex: /^\/settings(\/[^?#]*)?(\?[^#]*)?(#.*)?$/,
      Icon: Settings,
    },
  ],
  user: [],
  rekap: [
    {
      path: '/rekap/laporan-harian',
      name: 'Laporan Harian',
      regex: /^\/rekap\/laporan-harian(\/[^?#]*)?(\?[^#]*)?(#.*)?$/,
      Icon: Braces,
    },
    {
      path: '/rekap/laba-rugi',
      name: 'Laba Rugi',
      regex: /^\/rekap\/laba-rugi(\/[^?#]*)?(\?[^#]*)?(#.*)?$/,
      Icon: Braces,
    },
    {
      path: '/rekap/pengeluaran',
      name: 'Pengeluaran',
      regex: /^\/rekap\/pengeluaran(\/[^?#]*)?(\?[^#]*)?(#.*)?$/,
      Icon: Braces,
    },
    {
      path: '/rekap/stok-pembelian',
      name: 'Stok & Pembelian',
      regex: /^\/rekap\/stok-pembelian(\/[^?#]*)?(\?[^#]*)?(#.*)?$/,
      Icon: Braces,
    },
    {
      path: '/rekap/buku-kas',
      name: 'Buku Kas',
      regex: /^\/rekap\/buku-kas(\/[^?#]*)?(\?[^#]*)?(#.*)?$/,
      Icon: Braces,
    },
  ],
} as const;

const user = {
  name: 'shadcn',
  email: 'm@example.com',
  avatar: '/avatars/shadcn.jpg',
} as const;

const SidebarMain = ({
  ...props
}: React.ComponentPropsWithoutRef<typeof SidebarGroup>) => {
  const { url } = usePage();
  const { isMobile } = useSidebar();
  const { theme, setTheme } = {
    theme: 'dark',
    setTheme: (theme: 'system' | 'light' | 'dark') => {
      console.log(theme);
    },
  };

  return (
    <Sidebar collapsible="offcanvas" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <a href="#">
                <Building2 className="size-5!" />
                <span className="text-base font-semibold">{appName}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="flex flex-col gap-2">
            <SidebarMenu>
              {navs.main.map((item, k) => {
                const isActive = item.regex.test(url);
                return (
                  <SidebarMenuItem key={k}>
                    <SidebarMenuButton
                      isActive={isActive}
                      tooltip={item.name}
                      asChild
                    >
                      <Link href={item.path}>
                        <item.Icon />
                        <span>{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel>Rekap</SidebarGroupLabel>
          <SidebarMenu>
            {navs.rekap.map((item) => {
              const isActive = item.regex.test(url);
              return (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton isActive={isActive} asChild>
                    <Link href={item.path}>
                      <item.Icon />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuAction
                        showOnHover
                        className="rounded-sm data-[state=open]:bg-accent"
                      >
                        <MoreVertical />
                        <span className="sr-only">Lainnya</span>
                      </SidebarMenuAction>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-24 rounded-sm"
                      side={isMobile ? 'bottom' : 'right'}
                      align={isMobile ? 'end' : 'start'}
                    >
                      <DropdownMenuItem>
                        <Folder />
                        <span>Buka</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Share2 />
                        <span>Bagikan</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem variant="destructive">
                        <Trash2 />
                        <span>Hapus</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuItem>
              );
            })}
            <SidebarMenuItem>
              <SidebarMenuButton className="text-sidebar-foreground/70">
                <MoreVertical className="text-sidebar-foreground/70" />
                <span>Lainnya</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup {...props}>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  type="button"
                  onClick={() => {
                    setTheme(
                      theme === 'system'
                        ? 'light'
                        : theme === 'light'
                          ? 'dark'
                          : 'system',
                    );
                  }}
                >
                  {theme === 'system' && <Contrast />}
                  {theme === 'light' && <Sun />}
                  {theme === 'dark' && <Moon />}
                  <span>Ubah Tema</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {navs.secondary.map((item) => {
                const isActive = item.regex.test(url);
                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton isActive={isActive} asChild>
                      <Link href={item.path}>
                        <item.Icon />
                        <span>{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-sm grayscale">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="rounded-sm">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{user.name}</span>
                    <span className="truncate text-xs text-muted-foreground">
                      {user.email}
                    </span>
                  </div>
                  <MoreVertical className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-sm"
                side={isMobile ? 'bottom' : 'right'}
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-sm">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="rounded-sm">CN</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium">{user.name}</span>
                      <span className="truncate text-xs text-muted-foreground">
                        {user.email}
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <UserCircle />
                    Akun
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCard />
                    Tagihan
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Bell />
                    Notifikasi
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link
                    className="block w-full cursor-pointer"
                    href={logout()}
                    as="button"
                    onClick={() => {
                      router.flushAll();
                    }}
                    data-test="logout-button"
                  >
                    <LogOut />
                    Keluar
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

interface AppLayoutProps {
  children: ReactNode;
  breadcrumbs?: BreadcrumbItem[];
}

export const AppLayout = ({
  children,
  breadcrumbs,
  ...props
}: AppLayoutProps) => {
  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 12)',
        } as React.CSSProperties
      }
    >
      <SidebarMain {...props} />
      <SidebarInset>
        <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
          <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mx-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumbs breadcrumbs={breadcrumbs ?? []} />
            {/* <h1 className="text-base font-medium">Documents</h1> */}
            <div className="ml-auto flex items-center gap-2"></div>
          </div>
        </header>

        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {children}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};
