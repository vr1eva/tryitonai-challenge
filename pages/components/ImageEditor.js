import { useState, useEffect, useRef } from 'react';

export default function ImageEditor() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [canvasContext, setCanvasContext] = useState(null);
  const [mouseDown, setMouseDown] = useState(false);
  const [lastX, setLastX] = useState(null);
  const [lastY, setLastY] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    setCanvasContext(context);
  }, []);

  function handleImageLoad() {
    setImageLoaded(true);
  }

  function handleMouseDown(event) {
    // Set the state to indicate that the mouse button is down
    setMouseDown(true);

    // Get the starting position of the mouse
    const rect = canvasRef.current.getBoundingClientRect();
    setLastX(event.clientX - rect.left);
    setLastY(event.clientY - rect.top);
  }

  function handleMouseMove(event) {
    if (mouseDown) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      canvasContext.beginPath();
      canvasContext.moveTo(lastX, lastY);
      canvasContext.lineTo(x, y);
      canvasContext.strokeStyle = '#ffffff';
      canvasContext.lineWidth = 10;
      canvasContext.stroke();

      setLastX(x);
      setLastY(y);
    }
  }

  function handleMouseUp() {
    setMouseDown(false);
  }

  async function handleSave() {
    // Get the canvas element and convert it to a data URL
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL('image/png');

    // Remove the "data:image/png;base64," prefix from the data URL
    const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '');

    // Make a POST request to your server to save the base64-encoded image data
    const response = await fetch('/api/save-image', {
      method: 'POST',
      body: JSON.stringify({ data: base64Data }),
    });
    const result = await response.json();
    console.log(result);
  }

  return (
    <div>
      <img
        src="/my-image.jpg"
        alt="My Image"
        onLoad={handleImageLoad}
        style={{ display: imageLoaded ? 'block' : 'none' }}
      />
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{ display: imageLoaded ? 'block' : 'none' }}
      />
      <button onClick={handleSave}>Save Image</button>
    </div>
  );
}
