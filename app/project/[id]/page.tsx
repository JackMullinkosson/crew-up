
import Assigned from "./Assigned";
import Unassigned from "./Unassigned";
const BASE_URL = "http://localhost:3000/"



   export default async function Page ({ params }: any) {
    const id = parseInt(params.id)

    async function getGoToById() {
      const res = await fetch(`${BASE_URL}api/getGoToById/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        return await res.json(); 
      } else {
        return null; 
      }
    }
    
    const projGoTo = await getGoToById()

    
      

    if(projGoTo)return (
        <Assigned id={id}/>
    )
    else return (
      <Unassigned id={id}/>
    );
  }