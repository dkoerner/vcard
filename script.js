
function createQRCodeImage(url, qrContainer) {
  // Generate the QR code inside the container
  new QRCode(qrContainer, {
      text: url,
      width: 128,
      height: 128,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
  });

  // qrcodejs generates a <canvas> as the FIRST child
  const canvas = qrContainer.querySelector("canvas");
  return canvas;
}


document.addEventListener("DOMContentLoaded", function() {
  // Create a URLSearchParams object from the current URL
  const params = new URLSearchParams(window.location.search);
  
  // email --------------
  const email = params.get('email');
  
  // Display the parameter value on the page
  if (email !== null) {
      document.getElementById('email').textContent = `${email}`;
      document.getElementById('email').href = `mailto:${email}`;
  } else {
      document.getElementById('email').textContent = `email not provided`;
  }

  // view qr code id requested --------------
  const portraitContainer = document.getElementById('portrait-container');
  const qrCodeContainer = document.getElementById("qr-code-container");
  const qrjsContainer = document.getElementById("qrjs-container");

  // generate qr code image
  const url = `https://dkoerner.github.io/vcard/card.html?email=${email}`;
  const canvas = createQRCodeImage(url, qrjsContainer);

  if (canvas) {
    // Convert the canvas to PNG data URL
    const dataUrl = canvas.toDataURL("image/png");

    // Insert a new <img> with the data URL
    qrCodeContainer.innerHTML = '';
    const img = document.createElement("img");
    img.src = dataUrl;
    //img.style.width = "128px";
    //img.style.height = "128px";
    qrCodeContainer.appendChild(img);
  } else {
    console.error("QR canvas not found — QR generation failed.");
  }

  function togglePortraitQR() {
    if( portraitContainer.style.display == "none" ) {
      // show portrait and hide qr code
      portraitContainer.style.display = "block";
      qrCodeContainer.style.display = "none";
    }else{
      // hide portrait and show qr code
      portraitContainer.style.display = "none";
      qrCodeContainer.style.display = "block";
    }
  }

  if (params.get('qr') !== null) {
    togglePortraitQR();
  }

  // register click handler to toggle between portrait and qr code
  portraitContainer.addEventListener("click", (e) => {
    togglePortraitQR();
    e.stopPropagation();
  });
  qrCodeContainer.addEventListener("click", (e) => {
    togglePortraitQR();
    e.stopPropagation();
  });
});