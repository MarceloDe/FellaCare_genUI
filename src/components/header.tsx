import { Menu } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

export function Header() {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between h-16 px-4 border-b bg-background/80 backdrop-blur-sm shrink-0">
      <div className="flex items-center gap-2 sm:gap-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium mt-8">
              <a href="#" className="flex items-center gap-2 text-lg font-semibold text-primary">MediMate</a>
              <a href="#" className="hover:text-primary transition-colors">Coverage</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Claims</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Medications</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Providers</a>
            </nav>
          </SheetContent>
        </Sheet>
        <a href="#" className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-primary">MediMate</h1>
        </a>
      </div>
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
        <a href="#" className="text-foreground hover:text-primary transition-colors">Coverage</a>
        <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Claims</a>
        <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Medications</a>
        <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Providers</a>
      </nav>
    </header>
  );
}
