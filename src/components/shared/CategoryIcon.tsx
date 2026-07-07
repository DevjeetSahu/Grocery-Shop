import * as LucideIcons from 'lucide-react';
import type { LucideProps } from 'lucide-react';

// Map category icon names to Lucide components
const iconMap: Record<string, React.ComponentType<LucideProps>> = {
  apple: LucideIcons.Apple,
  carrot: LucideIcons.Carrot,
  milk: LucideIcons.MilkOff,
  wheat: LucideIcons.Wheat,
  coffee: LucideIcons.Coffee,
  cookie: LucideIcons.Cookie,
  flame: LucideIcons.Flame,
  home: LucideIcons.Home,
  'shopping-bag': LucideIcons.ShoppingBag,
  'shopping-basket': LucideIcons.ShoppingBasket,
  package: LucideIcons.Package,
  leaf: LucideIcons.Leaf,
  egg: LucideIcons.Egg,
  beef: LucideIcons.Beef,
  fish: LucideIcons.Fish,
  candy: LucideIcons.Candy,
  wine: LucideIcons.Wine,
  grape: LucideIcons.Grape,
  cherry: LucideIcons.Cherry,
  citrus: LucideIcons.Citrus,
  'ice-cream-cone': LucideIcons.IceCreamCone,
  soup: LucideIcons.Soup,
  sandwich: LucideIcons.Sandwich,
  pizza: LucideIcons.Pizza,
  popcorn: LucideIcons.Popcorn,
  croissant: LucideIcons.Croissant,
  salad: LucideIcons.Salad,
  nut: LucideIcons.Nut,
  ham: LucideIcons.Ham,
  bean: LucideIcons.Bean,
  drum: LucideIcons.Drum,
  spray: LucideIcons.SprayCan,
  sparkles: LucideIcons.Sparkles,
};

interface CategoryIconProps extends LucideProps {
  iconName: string | null;
}

export function CategoryIcon({ iconName, ...props }: CategoryIconProps) {
  const IconComponent = iconName ? iconMap[iconName] : null;

  if (!IconComponent) {
    return <LucideIcons.Package {...props} />;
  }

  return <IconComponent {...props} />;
}

// Export available icon names for the admin form
export const availableIcons = Object.keys(iconMap);
