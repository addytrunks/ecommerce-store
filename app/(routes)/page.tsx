import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import Billboard from "@/components/billboard";
import Container from "@/components/ui/container";

export const revalidate = 0;

const HomePage = async () => {
  
  const data = {
    id: "9830079a-cbb9-4ba7-a5f1-320160398891",
    label: "Oppenheimer",
    imageUrl: "https://res.cloudinary.com/dd9hjbolr/image/upload/v1690387885/nrnuki90zgz8n1vtwwmv.png",
  }

  const products = await getProducts({isFeautured:true})
  const billboard = await getBillboard('9830079a-cbb9-4ba7-a5f1-320160398891')
  
  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Billboard data={billboard}/>
      </div>
    </Container>
  )
}

export default HomePage;
