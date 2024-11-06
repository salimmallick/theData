import { ChevronDown } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Button } from '../ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { NavigationItem } from './types';
import { useState } from 'react';

interface NavigationSectionProps extends NavigationItem {}

export function NavigationSection({ icon: Icon, title, path, items }: NavigationSectionProps) {
  // Start with collapsed state
  const [isOpen, setIsOpen] = useState(false);

  if (!items) {
    return (
      <NavLink
        to={path}
        className={({ isActive }) =>
          `flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent ${
            isActive ? 'bg-accent' : ''
          }`
        }
      >
        {Icon && <Icon className="h-4 w-4" />}
        <span>{title}</span>
      </NavLink>
    );
  }

  return (
    <div className="space-y-1">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent"
          >
            <div className="flex items-center gap-2">
              {Icon && <Icon className="h-4 w-4" />}
              <span>{title}</span>
            </div>
            <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-1 pl-6">
          {items.map((item) => (
            <NavigationSection key={item.title} {...item} />
          ))}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}