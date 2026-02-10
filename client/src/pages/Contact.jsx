import { useEffect, useState } from "react";
import { useAuth } from "../store/Auth";
import { toast } from 'react-toastify';

     const defaultContactFromData = {
        username:"",
        email:"",
        message:"",
     };


     export const Contact = () => {
        const {user} = useAuth();
        const [ Contact, setContact] = useState(defaultContactFromData);
     
    useEffect(() => {
        if( user && user.username && user.email ) {
             setContact({
            username: user.username ,
            email: user.email,
            message:"",
        });
        }
    }, [user]);
    

    // console.log("frontend user", Contact.email );
    // const [userData, setUserData] = useState(true);
   

    // if(userData && user){
    //     setContact({
    //         username: user.username ,
    //         email: user.email,
    //         message:"",
    //     });
    //     setUserData(false);
    // }

    // lets tackle our handleinput

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setContact((prev) => ({ ...prev, [name]: value}));
    };

    

    const handleContactForm = async (e) => {
        e.preventDefault();
        
        
        try {
            const response = await fetch("http://localhost:5000/api/form/contact", {
                method:"POST",
                headers:{
                    'Content-Type':"application/json"
                },
                body:JSON.stringify(Contact)
            });

            

            if(response.ok){
                setContact(defaultContactFromData);
                const data = await response.json();
                console.log("Contact Data:", data);
                toast.success("Message sent successfully!");
                
            };
        } catch (error) {
            toast.error("Failed to send message. Please try again.");
            console.log(error)
        }


    };


    return(
    <>
    <section className="section-contact">
            <div className="contact-content container">
                <h1 className="main-heading">
                    contact us
                </h1>
                </div>

    {/* contact page main */}

            <div className="container grid grid-two-cols">
                <div className="contact-img">
            <img src="/images/support.png" alt="coding together" width="400" height="500"/>

            </div>


            {/* contact content actual */}

            <section className="section-form">
                <form onSubmit={handleContactForm}>
                    <div>
                        <label htmlFor="Username">Username</label>
                        <input type="text" name="username" id="username" autoComplete="off" required value={Contact.username} onChange={handleInput}/>

                    </div>
                    <div>
                        <label htmlFor="email">email</label>
                        <input type="text" name="email" id="email" autoComplete="off" required value={Contact.email} onChange={handleInput}/>

                    </div>
                    <div>
                        <label htmlFor="message">message</label>
                        <textarea name="message" id="message" cols="30" rows="10" required autoComplete="off" value={Contact.message} onChange={handleInput}></textarea>
                    </div>
                    <div>
                        <button type="submit">submit</button>
                    </div>
                </form>
            </section>
            </div>
            <section className="mb-3">
               <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3528.5869658346046!2d75.02439557405812!3d27.822481820406566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396cab179b77afb1%3A0xfe5cf403a1ac0760!2sGanesh%20Ji%20Ka%20Mandir!5e0!3m2!1sen!2sin!4v1762935967440!5m2!1sen!2sin"
           width="100%"
           height="450" 
           allowFullScreen 
           loading="lazy" 
           referrerPolicy="no-referrer-when-downgrade"
           ></iframe>
            </section>
        </section>

 </>
 );
};