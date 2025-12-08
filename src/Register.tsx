import { useState } from 'react';

export function Register(){
    const [email , setEmail ] = useState('');
    const [password , setPassword ] = useState('');
    const [name , setName ] = useState('');
    const [token , setToken ] = useState('');
    const [error , setError ] = useState('');

    return <>
        Register
    </>
}