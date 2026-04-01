import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import { SiteProvider } from '@/context/SiteContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartSidebar from '@/components/CartSidebar';

export const metadata = {
  title: 'THE AURIKA | Find Your Spark - Premium Jewelry',
  description: 'Discover exquisite handcrafted jewelry at THE AURIKA. Premium Grade, diamond & pearl collections. Find Your Spark with our curated contemporary jewelry pieces. Shop necklaces, rings, earrings, bracelets & more.',
  keywords: 'jewelry, premium jewelry, artificial jewelry, contemporary design, diamond rings, pearl earrings, luxury jewelry, THE AURIKA, Dehradun jewelry, Indian jewelry, bridal jewelry',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <AuthProvider>
          <SiteProvider>
            <CartProvider>
              <Navbar />
              <CartSidebar />
              <main>{children}</main>
              <Footer />
            </CartProvider>
          </SiteProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
