import { useState, useEffect, useRef } from 'react';
import { ShoppingCart, X, Plus, Minus, Trash2, ArrowRight, ArrowLeft, Home, Store, CreditCard, Smartphone, Truck, AlertCircle, CheckCircle, Package, CupSoda, MapPin, MessageCircle, Mail, Phone } from 'lucide-react';

// --- DATA ---
const CATEGORIES = [
  {
    id: 'Snacks',
    name: 'Snacks',
    description: 'Fuel your clutch moments with our premium tactical chips.',
    icon: <Package size={80} className="text-orange-500 drop-shadow-[0_0_20px_rgba(249,115,22,0.8)]" />,
    color: 'from-orange-500 to-amber-600'
  },
  {
    id: 'Drinks',
    name: 'Drinks',
    description: 'Zero sugar energy elixirs to keep your aim crisp and focused.',
    icon: <CupSoda size={80} className="text-blue-400 drop-shadow-[0_0_20px_rgba(59,130,246,0.8)]" />,
    color: 'from-blue-500 to-indigo-700'
  },
  {
    id: 'Clothing',
    name: 'Merchandise',
    description: 'Represent the flock with official premium apparel.',
    icon: <Store size={80} className="text-yellow-400 drop-shadow-[0_0_20px_rgba(250,204,21,0.8)]" />,
    color: 'from-orange-400 to-blue-600'
  }
];

const PRODUCTS = [
  {
    id: 'snack-1',
    name: 'Cheese Burst',
    category: 'Snacks',
    price: 65,
    description: 'Rich cheese flavour with creamy and buttery notes.',
    frontImage: 'cheese burst.png',
    backImage: 'back side cheese burst.png',
    color: 'from-orange-500 to-amber-600',
    stock: 50,
    details: {
      ingredients: 'Potatoes, Cheese Powder, Milk Solids, Vegetable Oil, Salt, Herbs, Flavour Enhancers',
      nutrition: ['Serving Size: 26g', 'Per 100g', 'Energy: 550 kcal', 'Protein: 7g', 'Carbohydrates: 52g', 'Total Sugars: 4g', 'Fat: 36g', 'Sodium: 620mg'],
      storage: ['Store in dry conditions', 'Consume immediately after opening']
    }
  },
  {
    id: 'snack-2',
    name: 'Cream & Onion',
    category: 'Snacks',
    price: 65,
    description: 'Creamy, smooth and slightly sweet onion flavour with rich dairy notes.',
    frontImage: 'cream and onion.png',
    backImage: 'back side cream and onion.png',
    color: 'from-green-500 to-emerald-700',
    stock: 45,
    details: {
      ingredients: 'Potatoes, Vegetable Oil, Cream Powder, Onion Powder, Milk Solids, Salt, Sugar, Herbs, Garlic Powder, Nature Identical Flavouring',
      nutrition: ['Serving Size: 26g', 'Servings Per Pack: 2', 'Per 100g', 'Energy: 535 kcal', 'Protein: 5g', 'Carbohydrates: 57g', 'Total Sugars: 4g', 'Dietary Fibre: 3g', 'Total Fat: 33g', 'Saturated Fat: 10g', 'Sodium: 580mg'],
      storage: ['Keep sealed after opening', 'Store in a cool dry place', 'Avoid moisture exposure']
    }
  },
  {
    id: 'snack-3',
    name: 'Masala Magic',
    category: 'Snacks',
    price: 65,
    description: 'Indian-style spicy masala blend with cumin, tangy spices and rich seasoning.',
    frontImage: 'masala magic.png',
    backImage: 'back side masala magic.png',
    color: 'from-purple-500 to-purple-800',
    stock: 60,
    details: {
      ingredients: 'Potatoes, Vegetable Oil, Masala Blend, Black Salt, Cumin Powder, Coriander Powder, Red Chilli Powder, Onion Powder',
      nutrition: ['Serving Size: 26g', 'Per 100g', 'Energy: 530 kcal', 'Protein: 6g', 'Carbohydrates: 58g', 'Total Sugars: 2g', 'Dietary Fibre: 4g', 'Total Fat: 32g', 'Sodium: 700mg'],
      storage: ['Store below 30°C', 'Avoid humidity']
    }
  },
  {
    id: 'snack-4',
    name: 'Salty Chilli',
    category: 'Snacks',
    price: 65,
    description: 'Bold spicy flavour with smoky chilli heat, balanced saltiness and mild garlic-onion notes.',
    frontImage: 'salty chilli.png',
    backImage: 'back side salty chilli.png',
    color: 'from-blue-600 to-orange-500',
    stock: 55,
    details: {
      ingredients: 'Potatoes, Refined Palmolein Oil, Iodized Salt, Red Chilli Powder, Black Pepper Powder, Onion Powder, Garlic Powder, Spice Blend, Sugar, Flavour Enhancers (INS 621, INS 635), Acidity Regulator (INS 330)',
      nutrition: ['Serving Size: 26g', 'Servings Per Pack: 2', 'Per 100g', 'Energy: 540 kcal', 'Protein: 6g', 'Carbohydrates: 54g', 'Total Sugars: 3g', 'Dietary Fibre: 4g', 'Total Fat: 34g', 'Saturated Fat: 12g', 'Trans Fat: 0g', 'Sodium: 650mg'],
      storage: ['Store in a cool, dry place', 'Avoid direct sunlight', 'Consume immediately after opening', 'Keep away from moisture']
    }
  },
  {
    id: 'snack-5',
    name: 'Sour Cream & Mayo',
    category: 'Snacks',
    price: 65,
    description: 'Creamy, tangy and slightly sour with smooth mayonnaise taste.',
    frontImage: 'sour cream and mayo.png',
    backImage: 'back side sour cream and mayo.png',
    color: 'from-teal-500 to-cyan-700',
    stock: 40,
    details: {
      ingredients: 'Potatoes, Sour Cream Powder, Mayonnaise Flavouring, Vegetable Oil, Salt, Herbs, Milk Solids',
      nutrition: ['Serving Size: 26g', 'Per 100g', 'Energy: 542 kcal', 'Protein: 5g', 'Carbohydrates: 55g', 'Total Sugars: 4g', 'Fat: 35g', 'Sodium: 600mg'],
      storage: ['Store in a dry place', 'Avoid direct sunlight']
    }
  },
  {
    id: 'snack-6',
    name: 'Fiery BBQ',
    category: 'Snacks',
    price: 85,
    description: 'Sweet smoky BBQ flavour with strong spicy aftertaste and grilled seasoning notes.',
    frontImage: 'fiery bbq.png',
    backImage: 'back side fiery bbq.png',
    color: 'from-red-600 to-red-900',
    stock: 40,
    details: {
      ingredients: 'Potatoes, Vegetable Oil, BBQ Spice Blend, Paprika Powder, Chilli Flakes, Salt, Sugar, Garlic Powder, Onion Powder',
      nutrition: ['Serving Size: 26g', 'Servings Per Pack: 2', 'Per 100g', 'Energy: 545 kcal', 'Protein: 6g', 'Carbohydrates: 55g', 'Total Sugars: 5g', 'Dietary Fibre: 4g', 'Total Fat: 35g', 'Sodium: 690mg'],
      storage: ['Keep away from heat', 'Store in a cool dry place']
    }
  },
  {
    id: 'drink-1',
    name: 'Blue Energy',
    category: 'Drinks',
    price: 150,
    description: 'Cool berry-citrus flavour with refreshing energy boost and mild sweetness.',
    frontImage: 'energy drink.png',
    backImage: 'back side energy drink.png',
    color: 'from-blue-600 to-blue-900',
    stock: 120,
    details: {
      ingredients: 'Carbonated Water, Sugar, Taurine, Caffeine, Acidity Regulator (INS 330), Sodium Citrate, Vitamins B3, B5, B6, B12, Nature Identical Flavouring',
      nutrition: ['Serving Size: 250ml', 'Per 100ml', 'Energy: 48 kcal', 'Protein: 0g', 'Carbohydrates: 12g', 'Total Sugars: 12g', 'Sodium: 44mg', 'Caffeine: 64mg', 'Taurine: 400mg'],
      storage: ['Best served chilled', 'Refrigerate after opening', 'Do not freeze', 'Avoid direct sunlight']
    }
  },
  {
    id: 'drink-2',
    name: 'Lemon Lime Fizz',
    category: 'Drinks',
    price: 110,
    description: 'Sharp citrus flavour with refreshing lemon and lime taste.',
    frontImage: 'lemon lime fizz.png',
    backImage: 'back side lemon lime fizz.png',
    color: 'from-green-500 to-green-800',
    stock: 100,
    details: {
      ingredients: 'Carbonated Water, Sugar, Lemon Juice Concentrate, Lime Extract, Acidity Regulator, Natural Flavouring',
      nutrition: ['Per 100ml', 'Energy: 42 kcal', 'Sugars: 10g', 'Sodium: 35mg'],
      storage: ['Keep refrigerated after opening', 'Consume within 24 hours after opening']
    }
  },
  {
    id: 'drink-3',
    name: 'Mango Blast',
    category: 'Drinks',
    price: 110,
    description: 'Sweet tropical mango flavour with juicy fruit taste.',
    frontImage: 'mango blast.png',
    backImage: 'back side mango blast.png',
    color: 'from-orange-500 to-orange-800',
    stock: 90,
    details: {
      ingredients: 'Carbonated Water, Mango Concentrate, Sugar, Acidity Regulator, Natural Flavouring',
      nutrition: ['Per 100ml', 'Energy: 46 kcal', 'Sugars: 11g', 'Sodium: 38mg'],
      storage: ['Best served chilled', 'Refrigerate after opening']
    }
  },
  {
    id: 'cloth-1',
    name: 'Black Quack T-Shirt',
    category: 'Clothing',
    price: 450,
    description: 'Classic black t-shirt featuring the iconic CT & T Quack duo.',
    frontImage: 'black tshirt.png',
    backImage: 'back side black tshirt.png',
    color: 'from-slate-700 to-slate-900',
    stock: 50,
    details: {
      ingredients: '100% Premium Breathable Cotton',
      nutrition: ['Fit: Regular', 'Neck: Crew Neck', 'Sleeve: Short Sleeve'],
      storage: ['Machine wash cold', 'Do not bleach', 'Tumble dry low']
    }
  },
  {
    id: 'cloth-2',
    name: 'White Quack T-Shirt',
    category: 'Clothing',
    price: 350,
    description: 'Clean white t-shirt featuring the iconic CT & T Quack duo.',
    frontImage: 'white tshirt.png',
    backImage: 'back side white tshirt.png',
    color: 'from-slate-200 to-slate-400',
    stock: 50,
    details: {
      ingredients: '100% Premium Breathable Cotton',
      nutrition: ['Fit: Regular', 'Neck: Crew Neck', 'Sleeve: Short Sleeve'],
      storage: ['Machine wash cold', 'Do not bleach', 'Tumble dry low']
    }
  },
  {
    id: 'cloth-3',
    name: 'Grey Quack T-Shirt',
    category: 'Clothing',
    price: 350,
    description: 'Sleek grey t-shirt featuring the iconic CT & T Quack duo.',
    frontImage: 'grey tshirt.png',
    backImage: 'back side grey tshirt.png',
    color: 'from-slate-500 to-slate-700',
    stock: 50,
    details: {
      ingredients: '100% Premium Breathable Cotton',
      nutrition: ['Fit: Regular', 'Neck: Crew Neck', 'Sleeve: Short Sleeve'],
      storage: ['Machine wash cold', 'Do not bleach', 'Tumble dry low']
    }
  },
  {
    id: 'merch-1',
    name: 'Tactical Quack Backpack',
    category: 'Clothing',
    price: 1600,
    description: 'Durable tactical backpack with the Quack Quack squad to carry all your gaming gear.',
    frontImage: 'bagpack.png',
    backImage: 'back side bagpack.png',
    color: 'from-neutral-700 to-neutral-900',
    stock: 30,
    details: {
      ingredients: 'High-density Water-resistant Nylon, Premium Zippers',
      nutrition: ['Capacity: 25L', 'Laptop Sleeve: Up to 15.6"', 'Pockets: Multiple utility compartments'],
      storage: ['Wipe clean with a damp cloth', 'Do not machine wash']
    }
  },
  {
    id: 'merch-2',
    name: 'Pro Glide Mouse Pad',
    category: 'Clothing',
    price: 1200,
    description: 'Large tactical desk mat featuring the CT & T clash. Perfect for precise flick shots.',
    frontImage: 'ct side keyboard mouse pad.png',
    backImage: 'back side keyboard mouse pad.png',
    color: 'from-blue-600 to-orange-500',
    stock: 100,
    details: {
      ingredients: 'Micro-woven Cloth Surface, Anti-slip Rubber Base',
      nutrition: ['Size: 900mm x 400mm', 'Thickness: 3mm', 'Edges: Stitched anti-fray'],
      storage: ['Roll loosely', 'Wipe with damp cloth to clean']
    }
  },
  {
    id: 'merch-3',
    name: 'CT Quack Keychain',
    category: 'Clothing',
    price: 180,
    description: 'Take the Counter-Terrorist Quack with you everywhere. Premium 3D rubber keychain.',
    frontImage: 'ct keychain.png',
    color: 'from-blue-600 to-blue-900',
    stock: 200,
    details: {
      ingredients: 'Premium PVC Rubber, Heavy-duty Metal Alloy Ring',
      nutrition: ['Size: 5cm x 4cm', 'Weight: 15g', 'Ring: 30mm reinforced'],
      storage: ['Wipe clean', 'Avoid extreme heat']
    }
  },
  {
    id: 'merch-4',
    name: 'T Quack Keychain',
    category: 'Clothing',
    price: 180,
    description: 'Take the Terrorist Quack with you everywhere. Premium 3D rubber keychain.',
    frontImage: 'T keychain.png',
    color: 'from-orange-500 to-amber-700',
    stock: 200,
    details: {
      ingredients: 'Premium PVC Rubber, Heavy-duty Metal Alloy Ring',
      nutrition: ['Size: 5cm x 4cm', 'Weight: 15g', 'Ring: 30mm reinforced'],
      storage: ['Wipe clean', 'Avoid extreme heat']
    }
  }
];

const CURRENCIES = {
  INR: { symbol: '₹', rate: 1 },
  USD: { symbol: '$', rate: 1 / 83.0 },
  EUR: { symbol: '€', rate: 0.92 / 83.0 }
};

const INDIAN_NAMES = [
  'Arjun', 'Rohan', 'Karthik', 'Ananya', 'Shreya', 'Manoj', 'Kiran', 'Suresh', 'Priya', 'Sneha', 'Aditya', 'Neha', 'Rahul', 'Pooja', 'Vikram'
];

const US_NAMES = [
  'James', 'Robert', 'Mary', 'Patricia', 'Michael', 'Linda', 'William', 'Elizabeth', 'David', 'Barbara', 'Alex', 'Sarah', 'Chris', 'Jessica'
];

const INDIAN_LOCATIONS = [
  'Mumbai, India', 'Bangalore, India', 'New Delhi, India', 'Hyderabad, India', 'Chennai, India', 'Pune, India', 'Ahmedabad, India', 'Kolkata, India'
];

const US_LOCATIONS = [
  'Los Angeles, CA', 'New York, NY', 'Austin, TX', 'Miami, FL', 'Chicago, IL', 'Seattle, WA', 'Denver, CO'
];

// --- COMPONENTS ---

const DuckBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let ducks = [];
    let mouse = { x: null, y: null };

    // Create custom yellow rubber duck image from SVG
    const duckImg = new Image();
    duckImg.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path fill="#FACC15" d="M416 288c-44-32-96-32-128-32c0-35-29-64-64-64c-35 0-64 29-64 64c-32 0-84 0-128 32c-21 15-32 39-32 64c0 53 43 96 96 96h256c53 0 96-43 96-96c0-25-11-49-32-64z"/>
        <circle fill="#FACC15" cx="224" cy="192" r="64"/>
        <path fill="#F97316" d="M160 192c-35 0-64 14-64 32s29 32 64 32c18 0 32-14 32-32s-14-32-32-32z"/>
        <circle fill="#000000" cx="200" cy="176" r="10"/>
    </svg>`);

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    class Duck {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 25 + 25; 
        this.baseSpeedX = (Math.random() - 0.5) * 1.5;
        this.baseSpeedY = (Math.random() - 0.5) * 1.5;
        this.vx = this.baseSpeedX;
        this.vy = this.baseSpeedY;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() - 0.5) * 0.02;
      }
      update() {
        // Smooth cursor repulsion - modifying velocity instead of position prevents stuttering
        if (mouse.x != null && mouse.y != null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 180;
          
          if (distance < maxDist && distance > 0) {
            const force = (maxDist - distance) / maxDist;
            this.vx -= (dx / distance) * force * 0.6;
            this.vy -= (dy / distance) * force * 0.6;
          }
        }

        // Gentle friction to return ducks to their natural floating speed
        this.vx += (this.baseSpeedX - this.vx) * 0.03;
        this.vy += (this.baseSpeedY - this.vy) * 0.03;

        this.x += this.vx;
        this.y += this.vy;
        this.rotation += this.rotSpeed;

        if (this.x > canvas.width + this.size) this.x = -this.size;
        else if (this.x < -this.size) this.x = canvas.width + this.size;
        if (this.y > canvas.height + this.size) this.y = -this.size;
        else if (this.y < -this.size) this.y = canvas.height + this.size;
      }
      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        if (duckImg.complete) {
          ctx.drawImage(duckImg, -this.size / 2, -this.size / 2, this.size, this.size);
        }
        ctx.restore();
      }
    }

    const init = () => {
      ducks = [];
      for (let i = 0; i < 40; i++) ducks.push(new Duck()); 
    };
    init();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ducks.forEach(d => {
        d.update();
        d.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    const handleMouseMove = (e) => { mouse.x = e.x; mouse.y = e.y; };
    const handleMouseLeave = () => { mouse.x = null; mouse.y = null; };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-40" />;
};

// New Scroll Animation Component (Optimized for GPU)
const ScrollReveal = ({ children, direction = 'up', delay = 0, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Toggle visibility when the element enters or leaves the screen
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.15 } // 15% visibility triggers the animation
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  // Reduced travel distance for a snappier, less demanding animation
  let transform = 'translate-y-16';
  if (direction === 'left') transform = '-translate-x-16';
  if (direction === 'right') transform = 'translate-x-16';

  const visibilityClass = isVisible ? 'opacity-100 translate-x-0 translate-y-0' : `opacity-0 ${transform}`;

  return (
    <div
      ref={ref}
      // Replaced transition-all with specific properties and added transform-gpu
      className={`transition-[opacity,transform] duration-700 ease-out transform-gpu ${visibilityClass} ${className}`}
      style={{ transitionDelay: `${delay}ms`, willChange: 'opacity, transform' }}
    >
      {children}
    </div>
  );
};

export default function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'store'
  const [selectedCategory, setSelectedCategory] = useState(null); // null | 'Snacks' | 'Drinks' | 'Clothing'
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [notification, setNotification] = useState(null);
  const [activeProductDetails, setActiveProductDetails] = useState(null); 
  const [currency, setCurrency] = useState('INR');

  // Track Order & Checkout States
  const [hasPlacedOrder, setHasPlacedOrder] = useState(false);
  const [isTrackOrderOpen, setIsTrackOrderOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi', 'card', 'cod'
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '', name: '' });
  const [cardErrors, setCardErrors] = useState({});

  // Live Purchase Popup State
  const [purchasePopup, setPurchasePopup] = useState(null);
  const [showPurchasePopup, setShowPurchasePopup] = useState(false);

  // Keep track of unused names so they don't repeat
  const availableIndianNames = useRef([...INDIAN_NAMES]);
  const availableUSNames = useRef([...US_NAMES]);

  useEffect(() => {
    let timeoutId;
    let hideTimeoutId;

    const triggerPopup = () => {
      // Randomly choose between India and US for this popup
      let isIndia = Math.random() > 0.5;
      
      // If the randomly chosen country has run out of names, switch to the other
      if (isIndia && availableIndianNames.current.length === 0) isIndia = false;
      if (!isIndia && availableUSNames.current.length === 0) isIndia = true;

      // If BOTH arrays are empty (all names used), stop scheduling popups completely
      if (availableIndianNames.current.length === 0 && availableUSNames.current.length === 0) {
        return;
      }

      let randomName;
      if (isIndia) {
        // Pick a random index, use it, and remove that name from the available pool
        const randomIndex = Math.floor(Math.random() * availableIndianNames.current.length);
        randomName = availableIndianNames.current[randomIndex];
        availableIndianNames.current.splice(randomIndex, 1); 
      } else {
        const randomIndex = Math.floor(Math.random() * availableUSNames.current.length);
        randomName = availableUSNames.current[randomIndex];
        availableUSNames.current.splice(randomIndex, 1);
      }
        
      const randomLocation = isIndia
        ? INDIAN_LOCATIONS[Math.floor(Math.random() * INDIAN_LOCATIONS.length)]
        : US_LOCATIONS[Math.floor(Math.random() * US_LOCATIONS.length)];

      const randomProduct = PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)].name;
      const timeAgo = Math.floor(Math.random() * 59) + 1; // 1 to 59 mins ago

      setPurchasePopup({ name: randomName, location: randomLocation, product: randomProduct, time: timeAgo });
      setShowPurchasePopup(true);

      // Hide after 5 seconds
      hideTimeoutId = setTimeout(() => {
        setShowPurchasePopup(false);
      }, 5000);

      // Schedule next popup (randomly between 10s and 15s)
      const nextDelay = Math.floor(Math.random() * 5000) + 10000;
      timeoutId = setTimeout(triggerPopup, nextDelay);
    };

    // Initial delay before first popup
    timeoutId = setTimeout(triggerPopup, 5000);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(hideTimeoutId);
    };
  }, []);

  const formatPrice = (basePrice) => {
    const converted = basePrice * CURRENCIES[currency].rate;
    return `${CURRENCIES[currency].symbol}${converted.toFixed(2)}`;
  };

  // Checkout Handlers
  const handleProceedCheckout = () => {
    if (paymentMethod === 'card') {
      const errors = {};
      const cleanNumber = cardDetails.number.replace(/\s+/g, '');
      
      if (!/^\d{16}$/.test(cleanNumber)) errors.number = true;
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardDetails.expiry)) errors.expiry = true;
      if (!/^\d{3,4}$/.test(cardDetails.cvv)) errors.cvv = true;
      if (cardDetails.name.trim().length < 2) errors.name = true;
      
      setCardErrors(errors);
      
      if (Object.keys(errors).length > 0) return; // Stop if errors exist
    }
    
    // Success
    setNotification('Payment successful! Order placed.');
    setTimeout(() => setNotification(null), 3000);
    setCart([]);
    setIsCheckoutOpen(false);
    setHasPlacedOrder(true);
    setCardDetails({ number: '', expiry: '', cvv: '', name: '' }); // Reset
  };

  // Navigation Handlers
  const goHome = () => {
    setCurrentView('home');
    setSelectedCategory(null);
  };

  const goStore = () => {
    setCurrentView('store');
    setSelectedCategory(null);
  };

  const goContact = () => {
    setCurrentView('contact');
    setSelectedCategory(null);
  };

  // Cart Functions
  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    
    setNotification(`${product.name} added to cart!`);
    setTimeout(() => setNotification(null), 3000);
    setIsCartOpen(true); 
  };

  const updateQuantity = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQ = item.quantity + delta;
        return newQ > 0 ? { ...item, quantity: newQ } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const shippingCharge = 30; // 30 INR Flat Rate Shipping

  // Main Category Card Component
  const CategoryCard = ({ category }) => {
    return (
      <div 
        onClick={() => setSelectedCategory(category.id)}
        className="relative flex flex-col group rounded-3xl bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 p-8 cursor-pointer transition-all duration-300 ease-out hover:border-blue-500/50 hover:shadow-[0_0_50px_rgba(59,130,246,0.2)] overflow-hidden shine-effect z-10"
      >
        <div 
          className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`}
        />

        <div className="flex justify-center items-center py-16 mb-6">
          <div className="relative group-hover:scale-110 transition-transform duration-500">
            <div className={`absolute inset-0 bg-gradient-to-br ${category.color} blur-2xl opacity-20 scale-150 rounded-full`} />
            {category.icon}
          </div>
        </div>

        <div className="flex-grow text-center">
          <h3 className="text-3xl font-black text-white mb-4">{category.name}</h3>
          <p className="text-slate-400 text-base">{category.description}</p>
        </div>
        
        <div className="mt-8 text-center text-sm font-bold text-slate-500 group-hover:text-white transition-colors flex items-center justify-center gap-2">
          EXPLORE {category.name.toUpperCase()} <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    );
  };

  // Product Card Component (for individual items)
  const ProductCard = ({ product }) => {
    return (
      <div 
        onClick={() => product.details && setActiveProductDetails(product)}
        className="relative flex flex-col group rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 p-6 transition-all duration-300 ease-out hover:border-blue-500/50 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] overflow-hidden shine-effect z-10 cursor-pointer"
      >
        <div 
          className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`}
        />

        <div className="flex justify-between items-start mb-6">
          <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-100 bg-slate-800/80 rounded-full border border-slate-600/50 shadow-sm">
            {product.category}
          </span>
          <span className="text-2xl font-black text-white drop-shadow-md">{formatPrice(product.price)}</span>
        </div>

        {product.frontImage && product.backImage ? (
          <div className="relative w-full h-56 md:h-64 overflow-hidden mb-6 group-hover:scale-105 transition-transform duration-500">
            <div className="flex w-[200%] h-full animate-[swipe_8s_ease-in-out_infinite]">
              <div className="w-1/2 h-full flex items-center justify-center p-2">
                <img src={product.frontImage} alt={`${product.name} Front`} className="max-h-full w-auto object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.5)]" />
              </div>
              <div className="w-1/2 h-full flex items-center justify-center p-2">
                <img src={product.backImage} alt={`${product.name} Back`} className="max-h-full w-auto object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.5)]" />
              </div>
            </div>
          </div>
        ) : product.frontImage ? (
          <div className="relative w-full h-56 md:h-64 flex justify-center items-center mb-6 group-hover:scale-105 transition-transform duration-500 p-2">
             <img src={product.frontImage} alt={product.name} className="max-h-full w-auto object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.5)]" />
          </div>
        ) : (
          <div className="flex justify-center items-center py-12 mb-6">
            <div className="relative group-hover:scale-110 transition-transform duration-500">
              <div className={`absolute inset-0 bg-gradient-to-br ${product.color} blur-2xl opacity-20 scale-150 rounded-full`} />
              {product.icon}
            </div>
          </div>
        )}

        <div className="flex-grow">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-white">{product.name}</h3>
          </div>
          <p className="text-slate-400 text-sm mb-8 line-clamp-2">{product.description}</p>
        </div>

        <div className="flex gap-3 mt-auto relative z-20">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="flex-1 py-3 px-4 rounded-xl font-bold text-sm bg-slate-800 text-yellow-400 hover:bg-slate-700 hover:text-yellow-300 transition-colors border border-yellow-400/30 hover:border-yellow-400/60"
          >
            Add to Cart
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
              setIsCartOpen(false);
              setIsCheckoutOpen(true);
            }}
            className="flex-1 py-3 px-4 rounded-xl font-bold text-sm text-slate-950 bg-yellow-400 hover:bg-yellow-300 transition-colors shadow-[0_0_15px_rgba(250,204,21,0.3)]"
          >
            Buy Now
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-black text-slate-50 font-sans overflow-x-hidden selection:bg-orange-500/30">
      <style>
        {`
          @keyframes swipe {
            0%, 40% { transform: translateX(0); }
            50%, 90% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
          .shine-effect::before {
            content: '';
            position: absolute;
            top: 0;
            left: -150%;
            width: 100%;
            height: 100%;
            background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%);
            transform: skewX(-20deg);
            z-index: 50;
            pointer-events: none;
            transition: left 0.7s ease-in-out;
          }
          .shine-effect:hover::before {
            left: 150%;
          }
        `}
      </style>
      <DuckBackground />
      
      {/* Toast Notification */}
      <div className={`fixed top-24 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${notification ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
        <div className="bg-gradient-to-r from-orange-500 to-blue-600 text-white px-6 py-3 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.5)] font-bold border border-white/20 flex items-center gap-2">
           <span>🦆</span> {notification}
        </div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo / Brand */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={goHome}
          >
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-orange-500 group-hover:border-blue-500 transition-colors shadow-[0_0_15px_rgba(249,115,22,0.4)] group-hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] relative">
              <div className="absolute inset-0 bg-slate-800 flex items-center justify-center text-xs text-slate-500">Logo</div>
              <img 
                src="Untitled design (1).jpg" 
                alt="Quack Quack CS2 Logo" 
                className="w-full h-full object-cover relative z-10"
                onError={(e) => e.target.style.display = 'none'}
              />
            </div>
            <span className="font-black italic tracking-tighter text-xl hidden sm:block">
              <span className="text-orange-400">QUACK QUACK</span> <span className="text-blue-500">CS2</span>
            </span>
          </div>

          {/* Nav Links */}
          <div className="flex items-center gap-2 sm:gap-6 bg-slate-900/50 px-2 sm:px-4 py-2 rounded-full border border-slate-800">
            <button 
              onClick={goHome}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm transition-all ${currentView === 'home' ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Home</span>
            </button>
            <button 
              onClick={goStore}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm transition-all ${currentView === 'store' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
            >
              <Store className="w-4 h-4" />
              <span className="hidden sm:inline">Store</span>
            </button>
            <button 
              onClick={goContact}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm transition-all ${currentView === 'contact' ? 'bg-green-600 text-white shadow-lg shadow-green-600/20' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
            >
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">Contact</span>
            </button>
          </div>
          
          {/* Currency Selector & Cart Icon */}
          <div className="flex items-center gap-2 md:gap-3">
            
            {/* Track Order Button (Appears only after successful checkout) */}
            {hasPlacedOrder && (
              <button 
                onClick={() => setIsTrackOrderOpen(true)}
                className="flex items-center gap-2 px-3 py-2 bg-green-500/10 border border-green-500/50 text-green-400 rounded-full font-bold text-xs md:text-sm hover:bg-green-500/20 transition-colors animate-in fade-in slide-in-from-right-4 duration-500"
              >
                <MapPin className="w-4 h-4" />
                <span className="hidden sm:inline">Track Order</span>
              </button>
            )}

            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-slate-300 rounded-full px-3 py-2.5 text-xs md:text-sm font-bold focus:outline-none focus:border-blue-500 transition-colors cursor-pointer appearance-none text-center outline-none hover:bg-slate-800 hover:border-blue-500"
              style={{ backgroundImage: 'none' }}
            >
              <option value="INR">INR</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>
            
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-3 rounded-full bg-slate-900 border border-slate-700 hover:border-blue-500 hover:bg-slate-800 transition-all group"
            >
              <ShoppingCart className="w-6 h-6 text-slate-300 group-hover:text-blue-400 transition-colors" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-400 to-orange-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shadow-lg">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT AREA */}
      <main className="relative z-10 pt-20">
        
        {/* HOME VIEW */}
        {currentView === 'home' && (
          <section className="min-h-[85vh] flex flex-col items-center justify-center px-4 md:px-8 relative animate-in fade-in zoom-in duration-500 py-16">
            <div className="max-w-[1200px] mx-auto w-full space-y-16 md:space-y-24">
              
              {/* Top Heading */}
              <ScrollReveal direction="up" className="text-center space-y-4">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-tight drop-shadow-xl text-white">
                  QUACK QUACK CS2
                </h1>
                <span className="block bg-gradient-to-r from-orange-400 via-yellow-400 to-blue-500 text-transparent bg-clip-text text-2xl md:text-3xl lg:text-4xl font-black">
                  More Flavour. More Focus. More Wins.
                </span>
              </ScrollReveal>

              {/* Row 1: Duck (Left) + Text (Right) */}
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                <ScrollReveal direction="left" className="w-48 h-48 md:w-80 md:h-80 shrink-0 relative group flex justify-center">
                   <div className="absolute inset-0 bg-blue-600/20 rounded-full blur-3xl group-hover:bg-blue-600/40 transition-colors duration-700 animate-pulse" />
                   <img 
                      src="2.png" 
                      alt="CT Duck" 
                      className="relative z-10 w-full h-full object-contain drop-shadow-[0_0_30px_rgba(59,130,246,0.3)] group-hover:scale-105 transition-transform duration-700"
                    />
                </ScrollReveal>
                <ScrollReveal direction="right" className="flex-1 bg-slate-900/60 p-6 md:p-10 rounded-[2rem] border border-slate-700/50 backdrop-blur-md shadow-2xl text-slate-300 text-lg md:text-xl leading-relaxed">
                  Quack Quack CS2 is more than just a brand — it's a gaming lifestyle built for players, creators, and fans who live and breathe the competitive gaming world. Inspired by the energy, teamwork, and excitement of CS2, we bring together gaming culture and unique products into one community.
                </ScrollReveal>
              </div>

              {/* Row 2: Text (Left) + Duck (Right) */}
              <div className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-16">
                <ScrollReveal direction="left" className="flex-1 bg-slate-900/60 p-6 md:p-10 rounded-[2rem] border border-slate-700/50 backdrop-blur-md shadow-2xl text-slate-300 text-lg md:text-xl leading-relaxed">
                  Starting from our YouTube journey, where we create entertaining CS2 content, gameplay moments, funny clips, highlights, and gaming experiences, Quack Quack CS2 continues to grow beyond the screen. What began as content for gamers has evolved into a complete brand experience.
                </ScrollReveal>
                <ScrollReveal direction="right" className="w-48 h-48 md:w-80 md:h-80 shrink-0 relative group flex justify-center">
                   <div className="absolute inset-0 bg-orange-500/20 rounded-full blur-3xl group-hover:bg-orange-500/40 transition-colors duration-700 animate-pulse" style={{ animationDelay: '1s' }} />
                   <img 
                      src="1.png" 
                      alt="T Duck" 
                      className="relative z-10 w-full h-full object-contain drop-shadow-[0_0_30px_rgba(249,115,22,0.3)] group-hover:scale-105 transition-transform duration-700"
                    />
                </ScrollReveal>
              </div>

              {/* Row 3: CT Duck (Left) + Text (Center) + T Duck (Right) */}
              <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-16">
                {/* Left Duck (CT - 2.png) */}
                <ScrollReveal direction="left" className="w-48 h-48 md:w-80 md:h-80 shrink-0 relative group hidden lg:flex justify-center">
                   <div className="absolute inset-0 bg-blue-600/20 rounded-full blur-3xl group-hover:bg-blue-600/40 transition-colors duration-700 animate-pulse" />
                   <img 
                      src="2.png" 
                      alt="CT Duck" 
                      className="relative z-10 w-full h-full object-contain drop-shadow-[0_0_30px_rgba(59,130,246,0.3)] group-hover:scale-105 transition-transform duration-700"
                    />
                </ScrollReveal>

                {/* Center Text */}
                <ScrollReveal direction="up" className="flex-1 bg-slate-900/60 p-6 md:p-10 rounded-[2rem] border border-slate-700/50 backdrop-blur-md shadow-2xl text-slate-300 text-lg md:text-xl leading-relaxed text-center">
                  <p className="mb-8">
                    Our product lineup includes bold-flavoured snacks like Salty Chilli, Cream & Onion, Fiery BBQ, Masala Magic, Cheese Burst and more, along with refreshing drinks such as Blue Energy, Lemon Lime Fizz, Mango Blast and Cola Classic. Alongside food and drinks, we also create gaming-inspired merchandise including T-shirts, backpacks, keychains, mouse pads and accessories designed for the community.
                  </p>
                  <div className="pt-8 border-t border-slate-700">
                    <p className="text-xl font-bold text-white italic">
                      At Quack Quack CS2, every product is made with one goal:
                    </p>
                    <p className="text-3xl md:text-4xl font-black mt-4 tracking-widest uppercase">
                      <span className="text-blue-500 drop-shadow-md">Defuse.</span> <span className="text-orange-500 drop-shadow-md">Focus.</span> <span className="text-yellow-400 drop-shadow-md">Win.</span>
                    </p>
                  </div>
                </ScrollReveal>

                {/* Right Duck (T - 1.png) */}
                <ScrollReveal direction="right" className="w-48 h-48 md:w-80 md:h-80 shrink-0 relative group hidden lg:flex justify-center">
                   <div className="absolute inset-0 bg-orange-500/20 rounded-full blur-3xl group-hover:bg-orange-500/40 transition-colors duration-700 animate-pulse" style={{ animationDelay: '1s' }} />
                   <img 
                      src="1.png" 
                      alt="T Duck" 
                      className="relative z-10 w-full h-full object-contain drop-shadow-[0_0_30px_rgba(249,115,22,0.3)] group-hover:scale-105 transition-transform duration-700"
                    />
                </ScrollReveal>
              </div>

              {/* Call to Action */}
              <ScrollReveal direction="up" className="flex justify-center pt-8">
                <button 
                  onClick={goStore}
                  className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-slate-950 font-black rounded-full overflow-hidden transition-transform hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.15)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-blue-500 to-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  <span className="relative z-10 group-hover:text-white transition-colors text-lg tracking-wide">ENTER THE STORE</span>
                  <ArrowRight className="relative z-10 w-6 h-6 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </button>
              </ScrollReveal>

            </div>
          </section>
        )}

        {/* STORE VIEW */}
        {currentView === 'store' && (
          <section className="py-24 px-6 relative animate-in fade-in slide-in-from-bottom-8 duration-500">
            <div className="max-w-7xl mx-auto">
              
              {/* Category Selection Menu */}
              {!selectedCategory ? (
                <>
                  <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-black">
                      <span className="bg-gradient-to-r from-orange-400 to-blue-500 text-transparent bg-clip-text">THE ARMORY</span>
                    </h2>
                    <p className="text-slate-400 font-medium">Select a category to gear up.</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {CATEGORIES.map(category => (
                      <CategoryCard key={category.id} category={category} />
                    ))}
                  </div>
                </>
              ) : (
                /* Individual Category Products */
                <>
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 border-b border-slate-800 pb-6 gap-6">
                    <button 
                      onClick={() => setSelectedCategory(null)}
                      className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-bold w-fit bg-slate-900/50 py-2 px-4 rounded-full border border-slate-700/50 hover:bg-slate-800"
                    >
                      <ArrowLeft className="w-5 h-5" /> Back to Categories
                    </button>
                    <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white flex items-center gap-3">
                      {selectedCategory}
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-in fade-in zoom-in-95 duration-300">
                    {PRODUCTS.filter(p => p.category === selectedCategory).map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                    {PRODUCTS.filter(p => p.category === selectedCategory).length === 0 && (
                       <div className="col-span-3 text-center py-20 text-slate-500 font-bold text-xl">
                          More {selectedCategory} arriving in the next drop!
                       </div>
                    )}
                  </div>
                </>
              )}

            </div>
          </section>
        )}

        {/* CONTACT VIEW */}
        {currentView === 'contact' && (
          <section className="min-h-[85vh] py-16 px-4 md:px-8 relative animate-in fade-in slide-in-from-bottom-8 duration-500 flex flex-col items-center">
            <div className="max-w-[900px] mx-auto w-full space-y-12">
              
              <ScrollReveal direction="up" className="text-center space-y-4 mb-16">
                <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-white uppercase drop-shadow-xl">
                  Reach the <span className="bg-gradient-to-r from-orange-400 to-blue-500 text-transparent bg-clip-text">Flock</span>
                </h1>
                <p className="text-slate-400 text-lg font-medium">Got questions or need backup? We're on standby.</p>
              </ScrollReveal>

              {/* WhatsApp (Duck 1) */}
              <ScrollReveal direction="up" delay={100}>
                <div className="flex flex-col md:flex-row items-center gap-8 bg-slate-900/80 p-6 md:p-8 rounded-[2rem] border border-slate-700/50 backdrop-blur-md shadow-2xl hover:border-green-500/50 transition-colors group">
                  <div className="w-40 h-40 md:w-56 md:h-56 shrink-0 relative flex justify-center items-center">
                    <div className="absolute inset-0 bg-green-500/20 rounded-full blur-3xl group-hover:bg-green-500/40 transition-colors duration-700" />
                    <img src="9.png" alt="WhatsApp Duck" className="relative z-10 w-full h-full object-contain drop-shadow-[0_0_20px_rgba(34,197,94,0.3)] group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-3xl font-black text-white mb-3 flex items-center justify-center md:justify-start gap-3">
                      <MessageCircle className="text-green-500 w-8 h-8" /> WhatsApp
                    </h3>
                    <p className="text-slate-400 mb-6 text-lg">Fastest way to reach us for live order updates, support, or just a quick chat.</p>
                    <a href="https://wa.me/916284144253?text=Hi!%20I%20have%20a%20question%20about%20Quack%20Quack%20CS2%20products." target="_blank" rel="noopener noreferrer" className="inline-block bg-green-500 text-slate-950 font-black px-8 py-4 rounded-full hover:bg-green-400 transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:scale-105">
                      MESSAGE US NOW
                    </a>
                  </div>
                </div>
              </ScrollReveal>

              {/* Email (Duck 2) */}
              <ScrollReveal direction="up" delay={200}>
                <div className="flex flex-col md:flex-row items-center gap-8 bg-slate-900/80 p-6 md:p-8 rounded-[2rem] border border-slate-700/50 backdrop-blur-md shadow-2xl hover:border-blue-500/50 transition-colors group">
                  <div className="w-40 h-40 md:w-56 md:h-56 shrink-0 relative flex justify-center items-center">
                    <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-500/40 transition-colors duration-700" />
                    <img src="10.png" alt="Email Duck" className="relative z-10 w-full h-full object-contain drop-shadow-[0_0_20px_rgba(59,130,246,0.3)] group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-3xl font-black text-white mb-3 flex items-center justify-center md:justify-start gap-3">
                      <Mail className="text-blue-500 w-8 h-8" /> Email Support
                    </h3>
                    <p className="text-slate-400 mb-6 text-lg">Drop us a line for business inquiries, bulk merchandise orders, or detailed support.</p>
                    <a href="mailto:quackquackcounterstrike2@gmail.com" target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-600 text-white font-black px-8 py-4 rounded-full hover:bg-blue-500 transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:scale-105">
                      quackquackcounterstrike2@gmail.com
                    </a>
                  </div>
                </div>
              </ScrollReveal>

              {/* Phone (Duck 3) */}
              <ScrollReveal direction="up" delay={300}>
                <div className="flex flex-col md:flex-row items-center gap-8 bg-slate-900/80 p-6 md:p-8 rounded-[2rem] border border-slate-700/50 backdrop-blur-md shadow-2xl hover:border-orange-500/50 transition-colors group">
                  <div className="w-40 h-40 md:w-56 md:h-56 shrink-0 relative flex justify-center items-center">
                    <div className="absolute inset-0 bg-orange-500/20 rounded-full blur-3xl group-hover:bg-orange-500/40 transition-colors duration-700" />
                    <img src="11.png" alt="Phone Duck" className="relative z-10 w-full h-full object-contain drop-shadow-[0_0_20px_rgba(249,115,22,0.3)] group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-3xl font-black text-white mb-3 flex items-center justify-center md:justify-start gap-3">
                      <Phone className="text-orange-500 w-8 h-8" /> Phone Call
                    </h3>
                    <p className="text-slate-400 mb-6 text-lg">Prefer speaking to a human? Give our support operators a ring to get instant help.</p>
                    <a href="tel:+916284144253" className="inline-block bg-orange-500 text-slate-950 font-black px-8 py-4 rounded-full hover:bg-orange-400 transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:scale-105">
                      6284144253
                    </a>
                  </div>
                </div>
              </ScrollReveal>

            </div>
          </section>
        )}
      </main>

      {/* Cart Sidebar Modal */}
      <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsCartOpen(false)}
        />
        
        {/* Sidebar */}
        <div className={`absolute top-0 right-0 h-full w-full max-w-md bg-slate-900 border-l border-slate-700 shadow-2xl flex flex-col transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          
          {/* Cart Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-950">
            <h2 className="text-2xl font-black flex items-center gap-3">
              YOUR CART
              <span className="bg-blue-600 text-white text-xs py-1 px-2 rounded-full">
                {cartItemCount} ITEMS
              </span>
            </h2>
            <button 
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-4">
                <ShoppingCart className="w-16 h-16 opacity-20" />
                <p className="font-medium">Your cart is feeling a bit empty.</p>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="mt-4 px-6 py-2 bg-slate-800 text-white rounded-full font-bold hover:bg-slate-700 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              cart.map(item => (
                <div key={item.id} className="flex gap-4 bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50 shadow-sm">
                  <div className={`w-20 h-20 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center opacity-90 overflow-hidden shrink-0`}>
                    {item.frontImage ? (
                      <img src={item.frontImage} alt={item.name} className="w-full h-full object-contain p-1 drop-shadow-md" />
                    ) : (
                      <div className="scale-75 drop-shadow-md text-white">
                        {item.icon}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-white text-sm leading-tight">{item.name}</h4>
                      <div className="text-orange-400 font-bold mt-1">{formatPrice(item.price)}</div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2 bg-slate-900 rounded-lg p-1 border border-slate-700">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-6 text-center font-bold text-sm">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-slate-500 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer / Checkout */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-slate-800 bg-slate-950">
              <div className="flex justify-between text-slate-400 mb-2">
                <span>Subtotal</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-slate-400 mb-6">
                <span>Shipping</span>
                <span>{formatPrice(shippingCharge)}</span>
              </div>
              <div className="flex justify-between text-white text-xl font-black mb-6">
                <span>Total</span>
                <span className="text-orange-400">{formatPrice(cartTotal + shippingCharge)}</span>
              </div>
              
              <button 
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="w-full py-4 rounded-xl font-black text-lg bg-gradient-to-r from-orange-500 to-blue-600 text-white hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-shadow"
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Checkout Modal */}
      <div className={`fixed inset-0 z-[70] transition-opacity duration-300 ${isCheckoutOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div 
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
          onClick={() => setIsCheckoutOpen(false)}
        />
        
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div 
            className={`w-full max-w-xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col transition-transform duration-500 ease-out transform-gpu ${isCheckoutOpen ? 'translate-y-0 scale-100' : 'translate-y-12 scale-95'}`}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-slate-800 bg-slate-950">
              <h2 className="text-2xl font-black text-white flex items-center gap-2">
                 SECURE CHECKOUT
              </h2>
              <button 
                onClick={() => setIsCheckoutOpen(false)}
                className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[70vh]">
              {/* Amount Due Banner */}
              <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 mb-8 text-center">
                <p className="text-slate-400 font-bold mb-1 uppercase tracking-widest text-sm">Amount Due</p>
                <p className="text-4xl font-black text-orange-400 drop-shadow-md">
                  {formatPrice(cartTotal + shippingCharge)}
                </p>
              </div>

              {/* Payment Method Tabs */}
              <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Select Payment Method</h3>
              <div className="grid grid-cols-3 gap-3 mb-8">
                <button
                  onClick={() => setPaymentMethod('upi')}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${paymentMethod === 'upi' ? 'border-blue-500 bg-blue-500/10 text-white' : 'border-slate-700 bg-slate-800 text-slate-400 hover:border-slate-500'}`}
                >
                  <Smartphone className="w-6 h-6" />
                  <span className="font-bold text-xs uppercase">UPI</span>
                </button>
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${paymentMethod === 'card' ? 'border-orange-500 bg-orange-500/10 text-white' : 'border-slate-700 bg-slate-800 text-slate-400 hover:border-slate-500'}`}
                >
                  <CreditCard className="w-6 h-6" />
                  <span className="font-bold text-xs uppercase">Card</span>
                </button>
                <button
                  onClick={() => setPaymentMethod('cod')}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${paymentMethod === 'cod' ? 'border-green-500 bg-green-500/10 text-white' : 'border-slate-700 bg-slate-800 text-slate-400 hover:border-slate-500'}`}
                >
                  <Truck className="w-6 h-6" />
                  <span className="font-bold text-xs uppercase">COD</span>
                </button>
              </div>

              {/* Dynamic Payment Content */}
              <div className="min-h-[220px]">
                {/* UPI Content */}
                {paymentMethod === 'upi' && (
                  <div className="flex flex-col items-center justify-center p-8 bg-slate-800/50 rounded-2xl border border-slate-700 animate-in fade-in zoom-in-95 duration-300 text-center">
                    <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-4 text-blue-400">
                      <Smartphone className="w-8 h-8" />
                    </div>
                    <p className="text-slate-400 mb-2 font-medium">Scan or pay using our Official UPI ID:</p>
                    <div className="bg-slate-900 border border-blue-500/50 text-white font-black text-xl py-3 px-6 rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                      k.bhavish@ptyes
                    </div>
                  </div>
                )}

                {/* Card Content */}
                {paymentMethod === 'card' && (
                  <div className="space-y-4 animate-in fade-in zoom-in-95 duration-300">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Card Number</label>
                      <div className="relative">
                        <input 
                          type="text"
                          maxLength="16"
                          placeholder="0000 0000 0000 0000"
                          value={cardDetails.number}
                          onChange={(e) => {
                            setCardDetails({...cardDetails, number: e.target.value.replace(/\D/g, '')});
                            if (cardErrors.number) setCardErrors({...cardErrors, number: false});
                          }}
                          className={`w-full bg-slate-800 border ${cardErrors.number ? 'border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]' : 'border-slate-700 focus:border-orange-500'} text-white px-4 py-3 rounded-xl focus:outline-none transition-colors`}
                        />
                        {cardErrors.number && <AlertCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500" />}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Expiry Date</label>
                        <div className="relative">
                          <input 
                            type="text"
                            maxLength="5"
                            placeholder="MM/YY"
                            value={cardDetails.expiry}
                            onChange={(e) => {
                              let val = e.target.value.replace(/[^\d/]/g, '');
                              if (val.length === 2 && !val.includes('/')) val += '/';
                              setCardDetails({...cardDetails, expiry: val});
                              if (cardErrors.expiry) setCardErrors({...cardErrors, expiry: false});
                            }}
                            className={`w-full bg-slate-800 border ${cardErrors.expiry ? 'border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]' : 'border-slate-700 focus:border-orange-500'} text-white px-4 py-3 rounded-xl focus:outline-none transition-colors`}
                          />
                          {cardErrors.expiry && <AlertCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500" />}
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-2">CVV</label>
                        <div className="relative">
                          <input 
                            type="text"
                            maxLength="4"
                            placeholder="123"
                            value={cardDetails.cvv}
                            onChange={(e) => {
                              setCardDetails({...cardDetails, cvv: e.target.value.replace(/\D/g, '')});
                              if (cardErrors.cvv) setCardErrors({...cardErrors, cvv: false});
                            }}
                            className={`w-full bg-slate-800 border ${cardErrors.cvv ? 'border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]' : 'border-slate-700 focus:border-orange-500'} text-white px-4 py-3 rounded-xl focus:outline-none transition-colors`}
                          />
                          {cardErrors.cvv && <AlertCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500" />}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Card Holder Name</label>
                      <div className="relative">
                        <input 
                          type="text"
                          placeholder="John Doe"
                          value={cardDetails.name}
                          onChange={(e) => {
                            setCardDetails({...cardDetails, name: e.target.value});
                            if (cardErrors.name) setCardErrors({...cardErrors, name: false});
                          }}
                          className={`w-full bg-slate-800 border ${cardErrors.name ? 'border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]' : 'border-slate-700 focus:border-orange-500'} text-white px-4 py-3 rounded-xl focus:outline-none transition-colors`}
                        />
                        {cardErrors.name && <AlertCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500" />}
                      </div>
                    </div>
                  </div>
                )}

                {/* COD Content */}
                {paymentMethod === 'cod' && (
                  <div className="flex flex-col items-center justify-center p-8 bg-slate-800/50 rounded-2xl border border-slate-700 animate-in fade-in zoom-in-95 duration-300 text-center">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4 text-green-400">
                      <CheckCircle className="w-8 h-8" />
                    </div>
                    <p className="text-white font-bold text-xl mb-2">Cash on Delivery</p>
                    <p className="text-slate-400 text-sm">You can pay with cash when your gear arrives at your door.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer / Confirm Payment */}
            <div className="p-6 border-t border-slate-800 bg-slate-950">
               <button 
                  onClick={handleProceedCheckout}
                  className={`w-full py-4 rounded-xl font-black text-lg text-slate-950 transition-all flex justify-center items-center gap-2 ${
                    paymentMethod === 'card' && Object.keys(cardErrors).length === 0 && cardDetails.number.length >= 15 
                      ? 'bg-yellow-400 hover:bg-yellow-300 shadow-[0_0_20px_rgba(250,204,21,0.5)]' 
                      : 'bg-white hover:bg-slate-200'
                  }`}
                >
                  PROCEED <ArrowRight className="w-5 h-5" />
                </button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Modal */}
      <div className={`fixed inset-0 z-[60] transition-opacity duration-300 ${activeProductDetails ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div 
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
          onClick={() => setActiveProductDetails(null)}
        />
        
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div 
            className={`w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col transition-transform duration-500 ease-out transform-gpu ${activeProductDetails ? 'translate-y-0 scale-100' : 'translate-y-12 scale-95'}`}
          >
            {activeProductDetails && (
              <>
                <div className={`h-2 w-full bg-gradient-to-r ${activeProductDetails.color}`} />
                
                <div className="flex justify-between items-center p-6 border-b border-slate-800 bg-slate-950">
                  <h2 className="text-2xl font-black text-white">{activeProductDetails.name} <span className="text-slate-500 text-lg font-bold ml-2">DETAILS</span></h2>
                  <button 
                    onClick={() => setActiveProductDetails(null)}
                    className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                  {/* Flavour Profile */}
                  <div>
                    <h4 className="text-yellow-500 font-bold mb-2 uppercase tracking-wider text-sm flex items-center gap-2">
                       Flavour Profile
                    </h4>
                    <p className="text-slate-300 bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 leading-relaxed">
                      {activeProductDetails.description}
                    </p>
                  </div>

                  {/* Ingredients */}
                  <div>
                    <h4 className="text-yellow-500 font-bold mb-2 uppercase tracking-wider text-sm">Ingredients</h4>
                    <p className="text-slate-300 bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 leading-relaxed text-sm">
                      {activeProductDetails.details.ingredients}
                    </p>
                  </div>

                  {/* Nutrition & Storage Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-yellow-500 font-bold mb-2 uppercase tracking-wider text-sm">Nutrition Facts</h4>
                      <div className="flex flex-wrap gap-2">
                        {activeProductDetails.details.nutrition.map(item => (
                          <span key={item} className="bg-slate-800 text-slate-300 text-xs px-3 py-1.5 rounded-lg border border-slate-700 shadow-sm">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-yellow-500 font-bold mb-2 uppercase tracking-wider text-sm">Storage Instructions</h4>
                      <ul className="space-y-2">
                        {activeProductDetails.details.storage.map(item => (
                          <li key={item} className="flex items-start gap-2 text-slate-300 text-sm">
                            <span className="text-yellow-500 font-bold mt-0.5">•</span> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Modal Footer / Add to Cart Quick Access */}
                <div className="p-6 border-t border-slate-800 bg-slate-950 flex justify-end">
                   <button 
                      onClick={() => {
                        addToCart(activeProductDetails);
                        setActiveProductDetails(null);
                      }}
                      className="px-8 py-3 rounded-xl font-bold text-slate-950 bg-yellow-400 hover:bg-yellow-300 transition-colors shadow-[0_0_15px_rgba(250,204,21,0.3)] flex items-center gap-2"
                    >
                      <Plus className="w-5 h-5" /> Add to Cart — {formatPrice(activeProductDetails.price)}
                    </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Track Order Modal */}
      <div className={`fixed inset-0 z-[80] transition-opacity duration-300 ${isTrackOrderOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div 
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
          onClick={() => setIsTrackOrderOpen(false)}
        />
        
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div 
            className={`w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col transition-transform duration-500 ease-out transform-gpu ${isTrackOrderOpen ? 'translate-y-0 scale-100' : 'translate-y-12 scale-95'}`}
          >
            <div className="flex justify-between items-center p-6 border-b border-slate-800 bg-slate-950">
              <h2 className="text-xl font-black text-white flex items-center gap-2">
                 TRACK ORDER
              </h2>
              <button 
                onClick={() => setIsTrackOrderOpen(false)}
                className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-8 flex flex-col items-center text-center space-y-6">
               <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.2)]">
                  <Truck className="w-10 h-10" />
               </div>
               <div>
                  <h3 className="text-2xl font-black text-white mb-2">Order #QQ-51028</h3>
                  <p className="text-slate-400 font-medium">Status: <span className="text-orange-400">Processing</span></p>
               </div>

               <div className="w-full space-y-6 mt-4 text-left border border-slate-800 bg-slate-950 p-6 rounded-2xl">
                  <div className="flex items-center gap-4 text-slate-300 font-bold">
                      <CheckCircle className="text-green-500 w-5 h-5" /> Order Confirmed
                  </div>
                  <div className="flex items-center gap-4 text-orange-400 font-bold">
                      <div className="w-5 h-5 border-2 border-orange-400 rounded-full border-t-transparent animate-spin" /> Preparing for Dispatch
                  </div>
                  <div className="flex items-center gap-4 text-slate-600 font-bold">
                      <MapPin className="w-5 h-5" /> Out for Delivery
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Purchase Popup */}
      <div 
        className={`fixed bottom-6 left-6 z-50 transition-all duration-700 ease-out transform ${showPurchasePopup ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 pointer-events-none'}`}
      >
        {purchasePopup && (
          <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-700/80 p-4 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.6)] flex items-center gap-4 max-w-sm relative overflow-hidden group">
            {/* Subtle rotating glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 via-blue-500/20 to-orange-500/20 blur-xl opacity-50"></div>
            
            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center shrink-0 border border-slate-600 relative z-10 shadow-inner">
              <Package className="w-6 h-6 text-orange-400" />
            </div>
            <div className="relative z-10 pr-4">
              <p className="text-sm text-slate-300 leading-tight mb-1">
                <span className="font-bold text-white">{purchasePopup.name}</span> in <span className="text-slate-400">{purchasePopup.location}</span>
              </p>
              <p className="text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300">
                Purchased {purchasePopup.product}
              </p>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1.5 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse inline-block"></span>
                {purchasePopup.time} min ago
              </p>
            </div>
            
            {/* Close button for popup */}
            <button 
              onClick={() => setShowPurchasePopup(false)}
              className="absolute top-2 right-2 text-slate-500 hover:text-white transition-colors z-10 p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-8 border-t border-slate-800/50 bg-slate-950 mt-auto">
        <div className="max-w-7xl mx-auto px-6 text-center text-slate-500 font-medium text-sm">
          &copy; {new Date().getFullYear()} Quack Quack CS2. All rights reserved.
        </div>
      </footer>

    </div>
  );
}