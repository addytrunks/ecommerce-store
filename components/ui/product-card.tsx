'use client'

import { Expand, ShoppingCart } from "lucide-react"
import Image from "next/image"

import { Product } from "@/types"
import IconButton from "@/components/ui/icon-button"
import Currency from "@/components/ui/currency"
import { useRouter } from "next/navigation"
import { MouseEventHandler } from "react"
import usePreviewModal from "@/hooks/use-preview-modal"
import useCart from "@/hooks/use-cart"

interface ProductCardProps{
    item:Product
}

const ProductCard = ({item}:ProductCardProps) => {

    const cart = useCart()
    const previewModal = usePreviewModal()
    const router = useRouter()

    const handleClick = () => {
        router.push(`/products/${item?.id}`)
    }

    const onPreview:MouseEventHandler<HTMLButtonElement> = (e) => {
        // Overrides the parent's event handler
        e.stopPropagation()
        
        previewModal.onOpen(item)
    }

    const onAddToCart:MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation()

        cart.addItem(item)
    }

  return (
    <div onClick={handleClick} className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4">
        {/* Images and Actions */}
        <div className="aspect-square rounded-xl bg-gray-100 relative">
            <Image src={item.images?.[0].url} alt='image' fill className="aspect-square object-cover rounded-md"/>
            <div className="opacity-0 group-hover:opacity-100 transition w-full absolute px-6 bottom-5">
                <div className="flex gap-x-6 justify-center items-center">
                    <IconButton onClick={onPreview} icon={<Expand size={20} className="text-gray-600"/>}/>
                    <IconButton onClick={onAddToCart} icon={<ShoppingCart size={20} className="text-gray-600"/>}/>
                </div>
            </div>
        </div>
        
        {/* Description */}
        <div>
            <p className="font-semibold text-lg">{item.name}</p>
            <p className="text-sm text-gray-500">{item.category.name}</p>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
            <Currency value={item?.price}/>
        </div>
    </div>
  )
}

export default ProductCard