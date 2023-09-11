"use client"

import { Minus, Plus, X } from "lucide-react"

import IconButton from "@/components/ui/icon-button"
import useCart from "@/hooks/use-cart"
import { Product } from "@/types"
import Image from "next/image"

interface CartItemProps{
    item:{
        quantity:number,
        product:Product
    }
}

const CartItem = ({item}:CartItemProps) => {

    const cart = useCart()

    const onRemove = () => {
        cart.removeItem(item.product.id)
    }

  return (
    <li className="flex py-6 border-b">
        <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
            <Image src={item.product.images[0].url} alt="image" className="object-cover object-center" fill/>
        </div>

        <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">

            <div className="absolute z-10 right-0 top-0">
                <IconButton onClick={onRemove} icon={<X size={15}/>}/>
            </div>

            <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                <div className="flex justify-between">
                    <p className="text-lg font-semibold">{item.product.name}</p>
                    <div className="flex items-center gap-x-3">
                            <IconButton onClick={() => cart.addItem(item.product)} icon={<Plus size={15}/>}/>
                            {item.quantity}
                            <IconButton onClick={() => cart.removeItem(item.product.id)} icon={<Minus size={15}/>}/>
                    </div>
                </div>

                <div className="mt-1 flex text-sm">
                    <p className="text-gray-500">{item.product.color.name}</p>
                    <p className="text-gray-500 ml-4 border-l border-gray-200 pl-4">{item.product.size.name}</p>
                </div>
            </div>

        </div>

    </li>
  )
}

export default CartItem