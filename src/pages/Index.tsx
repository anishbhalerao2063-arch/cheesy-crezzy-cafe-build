import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import heroBanner from "@/assets/hero-banner.jpg";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-cafe-cream via-background to-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl md:text-5xl font-bold text-center">CHEZZY CREZZY CAFÉ</h1>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative">
        <div className="relative h-[500px] overflow-hidden">
          <img
            src={heroBanner}
            alt="Delicious food at Chezzy Crezzy Café"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/50 flex items-center justify-center">
            <div className="text-center text-primary-foreground px-4">
              <h2 className="text-5xl md:text-7xl font-bold mb-4">
                Delicious Food<br />Delivered Fresh
              </h2>
              <p className="text-xl md:text-2xl mb-8">
                Pizza • Burgers • Fries & More
              </p>
              <Button
                size="lg"
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold text-lg px-8 py-6 h-auto"
                onClick={() => navigate("/auth")}
              >
                Order Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
          Why Choose Us?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-card p-6 rounded-xl shadow-lg text-center">
            <div className="text-5xl mb-4">🍕</div>
            <h3 className="text-xl font-bold mb-2 text-foreground">Fresh Ingredients</h3>
            <p className="text-muted-foreground">
              We use only the finest, freshest ingredients in all our dishes
            </p>
          </div>
          <div className="bg-card p-6 rounded-xl shadow-lg text-center">
            <div className="text-5xl mb-4">⚡</div>
            <h3 className="text-xl font-bold mb-2 text-foreground">Quick Service</h3>
            <p className="text-muted-foreground">
              Fast preparation and delivery without compromising quality
            </p>
          </div>
          <div className="bg-card p-6 rounded-xl shadow-lg text-center">
            <div className="text-5xl mb-4">💯</div>
            <h3 className="text-xl font-bold mb-2 text-foreground">Best Prices</h3>
            <p className="text-muted-foreground">
              Affordable prices for premium quality food
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Order?
          </h2>
          <p className="text-xl mb-8">
            Join us today and enjoy delicious food at great prices!
          </p>
          <Button
            size="lg"
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold text-lg px-8 py-6 h-auto"
            onClick={() => navigate("/auth")}
          >
            Get Started
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-8">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-2">CHEZZY CREZZY CAFÉ</h3>
          <p className="text-sm opacity-80">© 2024 All rights reserved</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
