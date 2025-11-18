import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MenuItemCard } from "@/components/MenuItemCard";
import { ShoppingCart, LogOut, Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { MenuItem, CartItem, MenuVariant } from "@/types/menu";
import { useToast } from "@/hooks/use-toast";
import heroBanner from "@/assets/hero-banner.jpg";

const Menu = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  useEffect(() => {
    filterItems();
  }, [selectedCategory, searchQuery, menuItems]);

  const fetchMenuItems = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("menu_items")
      .select("*")
      .order("category", { ascending: true });

    if (error) {
      toast({
        title: "Error loading menu",
        description: error.message,
        variant: "destructive",
      });
    } else {
      const items = (data || []).map(item => ({
        ...item,
        variants: item.variants as unknown as MenuVariant[]
      })) as MenuItem[];
      setMenuItems(items);
      setFilteredItems(items);
    }
    setLoading(false);
  };

  const filterItems = () => {
    let filtered = menuItems;

    if (selectedCategory !== "ALL") {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredItems(filtered);
  };

  const handleAddToCart = (itemId: string, variant: string, quantity: number, price: number) => {
    const item = menuItems.find((i) => i.id === itemId);
    if (!item) return;

    const existingIndex = cart.findIndex(
      (c) => c.menuItemId === itemId && c.variant === variant
    );

    if (existingIndex >= 0) {
      const newCart = [...cart];
      newCart[existingIndex].quantity += quantity;
      setCart(newCart);
    } else {
      setCart([
        ...cart,
        {
          menuItemId: itemId,
          name: item.name,
          variant,
          quantity,
          price,
        },
      ]);
    }

    toast({
      title: "Added to cart!",
      description: `${item.name} (${variant}) x${quantity}`,
    });
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const categories = ["ALL", "PIZZA", "BURGER", "FRIES"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cafe-cream via-background to-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-bold">CHEZZY CREZZY CAFÉ</h1>
            <div className="flex items-center gap-4">
              <Button
                variant="secondary"
                className="relative"
                onClick={() => navigate("/cart")}
              >
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-accent text-accent-foreground">
                    {cartItemCount}
                  </Badge>
                )}
                <span className="ml-2 hidden md:inline">₹{cartTotal}</span>
              </Button>
              <Button variant="outline" size="icon" onClick={signOut}>
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img
          src={heroBanner}
          alt="Chezzy Crezzy Café"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40 flex items-center justify-center">
          <div className="text-center text-primary-foreground">
            <h2 className="text-4xl md:text-6xl font-bold mb-2">Delicious Food</h2>
            <p className="text-xl md:text-2xl">Pizza • Burgers • Fries</p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Menu Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading menu...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No items found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <MenuItemCard
                key={item.id}
                id={item.id}
                name={item.name}
                description={item.description}
                image={item.image_url}
                variants={item.variants}
                category={item.category}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </div>

      {/* Floating Cart Button (Mobile) */}
      {cartItemCount > 0 && (
        <div className="fixed bottom-6 right-6 md:hidden">
          <Button
            size="lg"
            className="rounded-full shadow-2xl h-16 w-16 bg-secondary hover:bg-secondary/90"
            onClick={() => navigate("/cart")}
          >
            <div className="relative">
              <ShoppingCart className="h-6 w-6" />
              <Badge className="absolute -top-3 -right-3 bg-primary text-primary-foreground">
                {cartItemCount}
              </Badge>
            </div>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Menu;
