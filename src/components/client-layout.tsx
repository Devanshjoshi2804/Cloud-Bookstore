"use client"

import { Navbar } from "@/components/navbar"
import { Cart } from "@/components/cart"
import { useState } from "react"
import { CartProvider } from "@/contexts/cart-context"
import { SessionProvider } from "next-auth/react"

interface ClientLayoutProps {
  children: React.ReactNode
}

export function ClientLayout({ children }: ClientLayoutProps) {
  const [isCartOpen, setIsCartOpen] = useState(false)

  return (
    <SessionProvider>
      <CartProvider>
        <Navbar onCartClick={() => setIsCartOpen(true)} />
        <main>{children}</main>
        <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </CartProvider>
    </SessionProvider>
  )
} 