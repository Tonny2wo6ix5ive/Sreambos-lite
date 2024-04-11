import { clear } from "@testing-library/user-event/dist/clear";
import { useState, useEffect } from "react";
import zoomSdk from "@zoom/appssdk"

function App() {

  const [x, UseX] = useState(null);
  const [y, UseY] = useState(null);
  const [w, UseW] = useState(null);
  const [h, UseH] = useState(null);
  const [zoomImageID, SetZoomImageID] = useState("");
  const [color, UseColor] = useState('')

  useEffect(() => {
    async function configureApp() {
      const configResponse = await zoomSdk.config({
        popoutSize: { width: 1280, height: 720 },
        size:{
          width: 1280, height: 720 
        },
        capabilities: [
          "drawImage", 
          "clearImage"
        ]
      })

      console.log(configResponse)
    }
    configureApp();
  }, [])

  const xx = (event) => {
    UseX(event.target.value)
  }

  const yy = (event) => {
    UseY(event.target.value)
  }

  const ww = (event) => {
    UseW(event.target.value)
  }

  const hh = (event) => {
    UseH(event.target.value)
  }

  const cc = (event) => {
    UseColor(event.target.value)
  }

  console.log(x, y, w, h)

  const draw = async () => {
    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d');

    // Drawing a rectangle
    ctx.fillStyle = color; // Set fill color
    ctx.fillRect(x, y, w, h); // Draw rectangle (x, y, width, height)

    // taking screen shot of the canvas
    let imageData = ctx.getImageData(0, 0, 1280, 720);

    // Draws an image in the rendering context's canvas.
    const data = await zoomSdk.drawImage({
      imageData: imageData,
      x: 0, y: 0, zIndex: 3
    })

    SetZoomImageID(data.imageId)
  }

  const clearCanvas = () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d')

    ctx.clearRect(0, 0, 1280, 720)

    // Clears the content set by drawImage.
    zoomSdk.clearImage({
      imageId: zoomImageID
    })
    SetZoomImageID("");

  }



  return (
    <div className="App">
      <div>
        <nav className="shadow-xl bg-black text-gray-100 h-18 flex justify-center items-center">
          <ul className="flex justify-center items-center text-4xl">
            <li className="hover:opacity-50 duration-200 mx-4 my-2" ><a href='google.com'><ion-icon name="contact"></ion-icon></a></li>
            <li className="hover:opacity-50 duration-200 mx-4 my-2" ><a href='google.com'><ion-icon name='mail'></ion-icon></a></li>
            <li className="hover:opacity-50 duration-200 mx-4 my-2" ><a href='google.com'><ion-icon name='settings'></ion-icon></a></li>
          </ul>
        </nav>

        <div className="text-center">

          <h1 className="w-fit m-auto rounded-lg shadow-md border text-gray-50 p-2 bg-gray-800 my-6 text-4xl font-bold text-gray-700">
            Draw Rectangle
          </h1>

          <div className="text-xl text-gray-700">
            <input onChange={cc} className="w-40 h-10" type="color" />
            <br />
            Pick a Color
          </div>

          <div className="border">
            <input onChange={xx} type='number' className="px-4 py-2 border rounded-md bg-gray-100 text-gray-800 m-4" placeholder='Input x' />
            <input onChange={yy} type='number' className="px-4 py-2 border rounded-md bg-gray-100 text-gray-800 m-4" placeholder='Input y' />
            <input onChange={ww} type='number' className="px-4 py-2 border rounded-md bg-gray-100 text-gray-800 m-4" placeholder='Input w' />
            <input onChange={hh} type='number' className="px-4 py-2 border rounded-md bg-gray-100 text-gray-800 m-4" placeholder='Input h' />
            <button onClick={draw} className="shadow-md px-4 rounded-md py-2 border bg-gray-700 text-gray-50 m-4" >Draw</button>
            <button onClick={clearCanvas} className="shadow-md px-4 rounded-md py-2 border bg-gray-700 text-gray-50 m-4" >Clear</button>
          </div>


          <div className="w-auto border-4 border-gray-700 shadow-md rounded-md h-fit bg-gray-100 m-2 ">
            <canvas id="canvas" width={1280} height={720} />
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
