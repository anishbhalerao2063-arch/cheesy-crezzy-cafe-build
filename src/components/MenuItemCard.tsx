import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

interface Variant {
  size: string;
  price: number;
}

interface MenuItemCardProps {
  id: string;
  name: string;
  description?: string;
  image: string;
  variants: Variant[];
  category: string;
  onAddToCart: (itemId: string, variant: string, quantity: number, price: number) => void;
}

export const MenuItemCard = ({
  id,
  name,
  description,
  image,
  variants,
  category,
  onAddToCart,
}: MenuItemCardProps) => {
  const [selectedVariant, setSelectedVariant] = useState(variants[0].size);
  const [quantity, setQuantity] = useState(1);

  const currentPrice = variants.find((v) => v.size === selectedVariant)?.price || 0;

  const handleAddToCart = () => {
    onAddToCart(id, selectedVariant, quantity, currentPrice);
    setQuantity(1);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-border">
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-4">
        <div className="mb-2">
          <Badge variant="secondary" className="mb-2">
            {category}
          </Badge>
          <h3 className="text-lg font-bold text-foreground">{name}</h3>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>
        
        {variants.length > 1 && (
          <div className="flex gap-2 mb-3">
            {variants.map((variant) => (
              <Button
                key={variant.size}
                variant={selectedVariant === variant.size ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedVariant(variant.size)}
                className="flex-1"
              >
                {variant.size}
              </Button>
            ))}
          </div>
        )}
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-primary">₹{currentPrice}</span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center font-semibold">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setQuantity(quantity + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold"
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};
