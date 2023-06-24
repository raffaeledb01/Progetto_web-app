import React from "react";
import Button from './Button'

function Home() {
    
    return(
        <div>
            <Button description='LOGIN' url='./login' />
            <Button description='SIGN UP' url = './signup' />
        </div>
    )
}

export default Home