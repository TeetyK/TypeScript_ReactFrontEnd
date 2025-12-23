
export function UploadImage({token}){
    const handleUploadImage = async (e:React.FormEvent) =>{
        e.preventDefault();
        const formData = new FormData();
        //formData.append('name',productName);
        try{
            const response = await fetch('http://localhost:8080/products',{
                method:'POST',
                headers:{
                    'Authorization':`Bearer ${token}`
                },
                body:formData
                })
            }catch(err){
                console.log(err);
            }
        
    }   
    return <>
        TEST UPLOAD IMAGE
    </>
}