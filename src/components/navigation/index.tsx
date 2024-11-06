import { NavigationMenu } from '../ui/navigation-menu';
import { NavigationSection } from './navigation-section';
import { navigationItems } from './navigation-items';

export function Navigation() {
  return (
    <NavigationMenu>
      {navigationItems.map((section) => (
        <NavigationSection key={section.title} {...section} />
      ))}
    </NavigationMenu>
  );
}