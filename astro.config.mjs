// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import umami from "@yeskunall/astro-umami";

// https://astro.build/config
export default defineConfig({
	site: "https://example.com",
	integrations: [mdx(), sitemap(), react(), umami({ id: import.meta.env.UNAMI_ID })],
	vite: {
		plugins: [tailwindcss()],
	},
});
