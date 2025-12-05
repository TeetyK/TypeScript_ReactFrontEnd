
export function Login(){
    return <div className="container mx-auto p-8 text-center relative z-10">
        <div>
            <input name="username" type="text" placeholder="Username"/><br/>
        </div>
        <div>
            <input name="password" type="password" placeholder="Password"/><br/>
        </div>
        <button type='submit' className="m-2 p-2 border-b-black">Login</button>
    </div>
}

