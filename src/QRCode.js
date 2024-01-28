import React, { useState } from "react";
import "./QRCode.css";
const QRCode = () => {
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [img, setImg] = useState("");
  const [size, setSize] = useState(150);
  const generateQR = () => {
    setLoading(true);
    try {
      if(link.length !== 0){
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(
        link
      )}`;
      setImg(url);
      }else{
        alert("Enter url to get a QR code")
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const downloadQR = () => {
    try {
      if (img) {
        fetch(img)
          .then((response) => response.blob())
          .then((blob) => {
            const downloadLink = document.createElement("a");
            downloadLink.href = URL.createObjectURL(blob);
            downloadLink.download = "qrcode.png";
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
          });
      } else {
        alert("Generate QR code first");
      }
    } catch (error) {
      console.error("Error downloading QR code:", error);
    }
  };
  return (
    <div className="app-container">
      {loading && <p>QR code loading please wait...</p>}
      <h1>QR CODE GENERATOR</h1>
      <img src={img} alt="" className="qr-code-image" />
      <div>
        <label htmlFor="dataInput" className="input-label">
          Data for QR Code:
        </label>
        <input
          type="text"
          id="dataInput"
          placeholder="Enter a url"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          required
        />
        <label htmlFor="sizeInput" className="input-label">
          Image size:
        </label>
        <input
          type="text"
          id="sizeInput"
          placeholder="Enter a size"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          required
        />
        <button
          className="generate-button"
          onClick={generateQR}
          disabled={loading}
        >
          Generate QR code
        </button>
        <button className="download-button" onClick={downloadQR}>
          Download QR code
        </button>
      </div>
    </div>
  );
};

export default QRCode;
