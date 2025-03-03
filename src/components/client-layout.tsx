"use client"

import { useState } from "react"
import { CartProvider } from "@/contexts/cart-context"
import { Cart } from "@/components/cart"
import { Navbar } from "@/components/navbar"

interface ClientLayoutProps {
  children: React.ReactNode
}

function CartLayout({ children }: { children: React.ReactNode }) {
  const [isCartOpen, setIsCartOpen] = useState(false)

  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar onCartClick={() => setIsCartOpen(true)} />
      <main className="flex-1">{children}</main>
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  )
}

export function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <CartProvider>
      <CartLayout>{children}</CartLayout>
    </CartProvider>
  )
} 