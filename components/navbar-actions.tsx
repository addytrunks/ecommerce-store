'use client'

import React, { useEffect, useState } from 'react'
import Button from '@/components/ui/button'
import { ShoppingBag } from 'lucide-react'
import useCart from '@/hooks/use-cart'
import { useRouter } from 'next/navigation'

const NavbarActions = () => {

    const router = useRouter()

    // Preventing hydration error
    const [isMounted,setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    },[])

    const cart = useCart();

    if(!isMounted){
        return null;
    }

  return (
    <div className='ml-auto flex items-center gap-x-4'>
        <Button onClick={() => router.push('/cart')} className='flex items-center rounded-full bg-black px-4 py-2'>
            <ShoppingBag color='white' size={20}/>
            <span className='ml-2 text-sm font-medium text-white'>{cart?.getTotalQuantity()}</span>
        </Button>
    </div>
  )
}

export default NavbarActions