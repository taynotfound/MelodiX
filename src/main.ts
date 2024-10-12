import { App } from "@prozilla-os/core";
import { Melodix } from "./components/Melodix";

const melodix = new App("Melodix", "Melodix", Melodix)
	.setIconUrl("https://us-east-1.tixte.net/uploads/tay.needs.rest/MelodiXLogo.png")
	.setPinnedByDefault(false);

export { melodix };