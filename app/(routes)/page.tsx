import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import Billboard from "@/components/billboard";
import ProductList from "@/components/product-list";
import Container from "@/components/ui/container";

export const revalidate = 0;

const HomePage = async () => {

  const products = await getProducts({isFeautured:true})
  const billboard = await getBillboard('9830079a-cbb9-4ba7-a5f1-320160398891')
  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Billboard data={billboard}/>

        <div className="flex flex-col gap-y-8 px-4 sm:px-8">
          <ProductList title="Feautured Products" items={products}/>
        </div>
      </div>
    </Container>
  )
}

export default HomePage;
