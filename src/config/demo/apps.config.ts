import { AppsConfig } from "@prozilla-os/core";
import { melodix } from "../../main";

export const appsConfig = new AppsConfig({
	apps: [
		melodix.setPinnedByDefault(true)
			.setLaunchAtStartup(true)
	]
});