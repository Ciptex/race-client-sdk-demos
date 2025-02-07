import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "");
	return {
		plugins: [react()],
		define: {
			"process.env.ACCOUNT_SID": JSON.stringify(env.ACCOUNT_SID),
			"process.env.FLEXCHAT_FLOW_SID": JSON.stringify(env.FLEXCHAT_FLOW_SID),
			"process.env.FORM_ID": JSON.stringify(env.FORM_ID),
			"process.env.IDENTITY": JSON.stringify(env.IDENTITY),
			"process.env.KIOSK_ID": JSON.stringify(env.KIOSK_ID),
			"process.env.VOICE_APP_CLI": JSON.stringify(env.VOICE_APP_CLI),
			"process.env.VOICE_APP_SID": JSON.stringify(env.VOICE_APP_SID),
		},
		server: {
			port: 3000
		},
		resolve: {
			alias: {
				events: "events"
			}
		},
		optimizeDeps: {
			include: ["react/jsx-runtime"]
		}
	}
})

