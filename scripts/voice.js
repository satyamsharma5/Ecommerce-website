// voice.js

const alanBtnInstance = alanBtn({
  key: "YOUR_ALAN_AI_PROJECT_KEY", // Replace with your Alan Studio Web Key

  onCommand: function (commandData) {
    switch (commandData.command) {
      case "goHome":
        window.location.href = "index.html";
        break;

      case "goToCart":
        window.location.href = "cart.html";
        break;

      case "changeTheme":
        if (commandData.theme === "dark") {
          document.body.classList.add("dark-mode");
          alanBtnInstance.playText("Switched to dark mode.");
        } else {
          document.body.classList.remove("dark-mode");
          alanBtnInstance.playText("Switched to light mode.");
        }
        break;

      case "addToCart":
        if (commandData.productName) {
          addToCart(commandData.productName);
          alanBtnInstance.playText(`Added ${commandData.productName} to your cart.`);
        } else {
          alanBtnInstance.playText("Which product should I add to your cart?");
        }
        break;

      default:
        alanBtnInstance.playText("Sorry, I didn't understand that.");
    }
  }
});
