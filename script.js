document.addEventListener("DOMContentLoaded", () => {
  const paletteWrapper = document.querySelector(".palette-wrapper");
  const notificationCopy = document.querySelector(".notification-copy");
  const copiedHex = document.querySelector("#copiedHex");
  const btnGenerate = document.querySelector("#btnGenerate");
  const gridPalette = document.querySelector(".grid-palette");

  const generateHex = () =>
    `#${Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padEnd(6, "0")}`;

  const createColorCards = (num) => {
    gridPalette.innerHTML = "";

    for (let i = 0; i < num; i++) {
      const colorCard = document.createElement("div");
      colorCard.classList.add("color-card");
      const hexColor = generateHex();
      colorCard.innerHTML = `
                <div class="color-display"></div>
                <p class="color-code">${hexColor}<p/>
            `;
      gridPalette.appendChild(colorCard);

      const colorDisplay = colorCard.querySelector(".color-display");
      colorDisplay.style.backgroundColor = hexColor;

      colorCard.addEventListener("click", () => {
        navigator.clipboard.writeText(hexColor).then(() => {
          notificationCopy.style.display = "block";
          copiedHex.textContent = hexColor;

          setTimeout(() => {
            notificationCopy.style.display = "none";
          }, 1500);
        });
      });
    }
  };

  createColorCards(12);

  btnGenerate.addEventListener("click", () => createColorCards(12));

  document.body.onkeyup = (e) => {
    if ((e.code = "Space")) {
      createColorCards(12);
    }
  };
});
