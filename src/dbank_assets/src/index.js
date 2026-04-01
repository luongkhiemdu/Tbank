import { createActor, canisterId } from "../../declarations/dbank";

// Tạo actor rõ ràng với host của local replica trong môi trường development
const dbank = createActor(canisterId, {
    agentOptions: {
        host: process.env.NODE_ENV !== "production" ? "http://127.0.0.1:8000" : undefined,
        // Disable query signature verification in development to avoid the
        // "Timestamp not found in query response" runtime error when using the
        // dev proxy/replica.
        verifyQuerySignatures: process.env.NODE_ENV !== "production" ? false : undefined,
    },
});

window.addEventListener("load", async function() {
      const currentAmount = await dbank.checkBalance();
    document.getElementById("value").innerText = Math.round(currentAmount * 100) / 100;
 
});
document.querySelector("form").addEventListener("submit", async function(event) {
    event.preventDefault();
  const inputAmount = document.getElementById("input-amount").value;
  const outputAmount = doccument.getElementById("withdrawal-amount").value;
  await dbank.topUp(inputAmount);
});