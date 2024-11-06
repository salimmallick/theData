import { Bell, Search } from 'lucide-react';
import { Outlet } from 'react-router-dom';
import { EchoAI } from '../components/echo-ai';
import { Navigation } from '../components/navigation';
import { ThemeToggle } from '../components/theme-toggle';
import { UserNav } from '../components/user-nav';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { ScrollArea } from '../components/ui/scroll-area';
import { Separator } from '../components/ui/separator';
import { UnifiedFilters } from '../components/unified-filters';

export function DashboardLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <aside className="hidden border-r bg-gray-100/40 lg:block lg:w-72 dark:bg-gray-800/40">
        <div className="flex h-full flex-col">
          <div className="flex h-14 items-center justify-between border-b px-6">
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-primary"
              >
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.29 7 12 12 20.71 7" />
                <line x1="12" y1="22" x2="12" y2="12" />
              </svg>
              <span className="font-semibold text-xl">theData.io</span>
            </div>
            <ThemeToggle />
          </div>
          <ScrollArea className="flex-1 p-4">
            <Navigation />
          </ScrollArea>
        </div>
      </aside>
      <main className="flex-1 overflow-hidden">
        <header className="border-b">
          <div className="flex h-14 items-center gap-4 px-6">
            <div className="flex-1 flex items-center gap-4">
              <div className="w-96">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search..." className="pl-8" />
                </div>
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <UserNav />
          </div>
        </header>
        <ScrollArea className="h-[calc(100vh-3.5rem)]">
          <div className="container py-6">
            <div className="mb-8">
              <UnifiedFilters />
            </div>
            <Outlet />
          </div>
        </ScrollArea>
      </main>
      <EchoAI />
    </div>
  );
}