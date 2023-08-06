"use client"

import axios from "axios"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react";
import { toast } from "react-hot-toast";

import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";

const Summary = () => {

    const searchParams = useSearchParams()
    const cart = useCart();

    // After the payment, the user will be redirected to the cart page, and a confirmation message will be displayed
    useEffect(() => {
        if(searchParams.get('success')){
            toast.success('Payment Completed')
            cart.removeAll();
        }
        if(searchParams.get("cancelled")){
            toast.error("Something went wrong")
        }
    },[cart,searchParams])

    const onCheckout = async () => {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`,{
            productIds:cart.items.map((item) => item.product.id)
        });

        // Stripe checkout page URL is passed down the response
        window.location = res.data.url
    }

  return (
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
        <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
        <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <div className="text-base font-medium text-gray-900">
                    Order Total
                </div>
                <Currency value={cart.getTotal()}/>
            </div>
        </div>
        <Button onClick={onCheckout} className="w-full mt-6">Checkout</Button>
    </div>
  )
}

export default Summary