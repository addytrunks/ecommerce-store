import { Product } from "@/types";
import { toast } from "react-hot-toast";
import { create } from "zustand";
import {persist,createJSONStorage} from 'zustand/middleware'

interface CartStore{
   items:{
    quantity:number,
    product:Product
   }[],
   getProductQuantity:(id:string) => number,
   addItem:(data:Product) => void,
   removeItem:(id:string) => void,
   removeAll:() => void,
   getTotal:() => number,
   getTotalQuantity:() => number
}

const useCart = create(
    persist<CartStore>((set,get) => ({
        items:[],

        getProductQuantity(id) {
            const quantity = get().items.find((item) => item.product.id === id)?.quantity
            if (quantity === undefined){
                return 0;
            }
            return Number(quantity)
        },

        addItem:(data:Product) => {
            const quantity = get().getProductQuantity(data.id)

            if(quantity == 0){
                set({items:[...get().items,{product:data,quantity:1}]})
                toast.success("Product added to cart")
            }else{
                const items = get().items
                const updatedItem = { quantity: get().getProductQuantity(data.id) + 1, product: data };
                const updatedItems = items.map(item => (item.product.id !== data.id ? item : updatedItem));

                set({items:updatedItems})
                toast.success("Product quantity increased")
            }
        },

        removeItem:(id:string) => {
            const quantity = get().getProductQuantity(id)
            const data:Product|undefined = get().items.find((item) => item.product.id === id)?.product
            // If quantity is not 1, decrease quantity
            if(quantity!==1){
                const updatedItem = { quantity: get().getProductQuantity(data?.id!) - 1, product: data };
                const updatedItems = [...get().items.filter(item => item.product.id !== data?.id), updatedItem];
                // @ts-ignore
                set({items:updatedItems})
            }else if(quantity == 1){
                set({items:[...get().items.filter((item) => item.product.id !== id)]})
            }

            // If quantity is 1, remove the item
            toast.success("Product removed from cart")
        },
        removeAll:() => {
            set({items:[]})
            toast.success("All Products removed from cart.")
        },

        getTotal:() => {
            const totes = get().items.reduce((acc,item) => {
                return acc+(Number(item.product.price)*item.quantity)
            },0)
            return totes
        },

        getTotalQuantity:() => {
            const totalQuantity = get().items.reduce((acc,item) => {
                return acc+item.quantity
            },0)
            return totalQuantity
        }
    }),{
        name:'cartStorage',
        storage:createJSONStorage(() => localStorage)
    })
)

export default useCart