import { useEffect, useState } from "react";
import zoomSdk from "@zoom/appssdk"

function Zoom() {

    const [displayMessage, UseDisplayMessage] = useState('')
    const [displayColor, UseDisplayColor] = useState('')

    useEffect(()=>{
         // message posting on screen
         zoomSdk.onMessage((event) => {
            const json = JSON.parse(event.payload.toString());
            //{"message":postmessage} from zoomSdk.postMessage in home.js
            UseDisplayMessage(json.message)
            UseDisplayColor(json.color)
        });
    },[]);

    console.log(displayMessage)


    return ( 
        <div className="bg-green-300 flex justify-center items-center w-screen h-screen">
            <h1 className="text-6xl font-bold text-gray-700 bg-gray-100">
                The Panel says:{' '} 
                <span className="text-red-500" style={{ color: displayColor }}>
                    {displayMessage}
                </span>
            </h1>
        </div>
     );
}

export default Zoom;