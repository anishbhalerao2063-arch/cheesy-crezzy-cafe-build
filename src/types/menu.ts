export interface MenuVariant {
  size: string;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  category: "PIZZA" | "BURGER" | "FRIES";
  description?: string;
  image_url: string;
  variants: MenuVariant[];
}

export interface CartItem {
  menuItemId: string;
  name: string;
  variant: string;
  quantity: number;
  price: number;
}
