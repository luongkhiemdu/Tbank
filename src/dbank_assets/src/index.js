import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory } from "../../declarations/dbank/service.did.js";

const canisterId = process.env.DBANK_CANISTER_ID;
let dbank;

window.addEventListener("load", async function () {
  const agent = new HttpAgent({ host: "http://127.0.0.1:8000" });

  if (process.env.NODE_ENV !== "production") {
    try {
      await agent.fetchRootKey();
    } catch (error) {
      console.warn("Unable to fetch root key. Check to ensure that your local replica is running");
      console.error(error);
    }
  }

  dbank = Actor.createActor(idlFactory, { agent, canisterId });

  const currentAmount = await dbank.checkBalance();
  document.getElementById("value").innerText = Math.round(currentAmount * 100) / 100;
});

document.querySelector("form").addEventListener("submit", async (event) => {
  event.preventDefault();
const button = event.target.querySelector("#submit-btn");
  const inputAmount = parseFloat(document.getElementById("input-amount").value);
  const outputAmount = parseFloat(document.getElementById("withdrawal-amount").value);
    button.setAttribute("disabled", true);

    if (document.getElementById("input-amount").value.length != 0) {
      await dbank.topUp(inputAmount);
    }
    if (document.getElementById("withdrawal-amount").value.length != 0) {
      await dbank.withdraw(outputAmount);
    }
   
  const currentAmount = await dbank.checkBalance();
  document.getElementById("value").innerText = Math.round(currentAmount * 100) / 100;
  document.getElementById("input-amount").value = "";
  document.getElementById("withdrawal-amount").value = "";  
  button.removeAttribute("disabled");
});
