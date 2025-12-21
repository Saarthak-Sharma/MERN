import { useAuth } from "../store/Auth";
//import { Login } from "./Login";

export const Service = () => {
    const { services } = useAuth();
   //console.log("Services From Context:", services);
    const list = Array.isArray( services ) ? services : [];
    //console.log("List For Map:", list);
    
    return (
    <section className="section-services">
          <div className="container">
            <h1 className="main-heading">Services</h1>
            </div>

            <div className="container grid grid-three-cols">

                {
                    list.map((curElem, index) => {
                        const {price, description, provider, service} = curElem;
                        return(
                        <div className="card" key={index}>
                    <div className="card-image">
                        <img src="/images/design.png" alt="services info" width="200" height="200" />
                    </div>

                    <div className="card-details">
                        <div className="grid grid-three-cols">
                            <p>{provider}</p>
                            <p>{price}</p>
                        </div>
                        <h2>{service}</h2>
                        <p>{description}</p>
                    </div>
                    </div>
                    );
                    })
                }                
            </div>
            </section>
)};
