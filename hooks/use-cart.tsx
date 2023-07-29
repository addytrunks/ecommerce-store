import { Product } from "@/types";
import { toast } from "react-hot-toast";
import { create } from "zustand";
import {persist,createJSONStorage} from 'zustand/middleware'

interface CartStore{
   items:Product[],
   addItem:(data:Product) => void,
   removeItem:(id:string) => void,
   removeAll:() => void,
   getTotal:() => number,
}

const useCart = create(
    persist<CartStore>((set,get) => ({
        items:[],
        addItem:(data:Product) => {
            const currentItems = get().items;
            const existingItems = currentItems.find((item) => item.id === data.id)

            if(existingItems){
                return toast("Product already in cart")
            }
            set({items:[...currentItems,data]})
            toast.success("Product added to cart")
        },
        removeItem:(id:string) => {
            set({items:[...get().items.filter((item) => item.id !== id)]})
            toast.success("Product removed from cart")
        },
        removeAll:() => {
            set({items:[]})
            toast.success("All Products removed from cart.")
        },
        getTotal:() => {
            const totes = get().items.reduce((acc,item) => {
                return acc+Number(item.price)
            },0)
            return totes
        }
    }),{
        name:'cartStorage',
        storage:createJSONStorage(() => localStorage)
    })
)

export default useCart