import { Sync } from "@ciptex/race-client-sdk";
import { Context, createContext, FC, useEffect, useState } from "react";
import { ACCOUNT_SID, IDENTITY, KIOSK_ID } from "../../constants";
import { ReactElementProps } from "src/interface";

export type SyncContextType = {
	sync?: Sync;
	isLoading: boolean;
	status: "closed" | "ready";
	init: () => void;
};

export const SyncContext: Context<SyncContextType> = createContext<SyncContextType>(null!);


export const SyncProvider: FC<ReactElementProps> = ({ children }: ReactElementProps) => {
	const [sync, setSync] = useState<Sync>();
	const [statusDocument, setStatusDocument] = useState<Sync.SyncDocument>();
	const [status, setStatus] = useState<"closed" | "ready">("closed");
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		console.info("[SyncProvider] Sync Changes Detected", sync, statusDocument);
		if (sync && statusDocument) {
			const current: any = statusDocument.data;
			if (current.status) {
				setStatus(current.status);
				setIsLoading(false);
			}

			const handleUpdate = (update: any) => {
				console.info("[SyncProvider] Kiosk Config Changes", update);
				if (typeof update.data.status !== "undefined") {
					setStatus(update.data.status);
				}
			}

			statusDocument.on("updated", handleUpdate);

			return () => {
				statusDocument.off("updated", handleUpdate);
			}
		}
	}, [sync, statusDocument])

	const init = async () => {
		try {
			if (!ACCOUNT_SID || !IDENTITY || !KIOSK_ID) {
				throw new Error("Missing ACCOUNT_SID or IDENTITY or KIOSK_ID Variables");
			}

			setIsLoading(true);

			const v = new Sync({
				accountSid: ACCOUNT_SID,
				identity: IDENTITY,
				kioskId: KIOSK_ID
			});

			setSync(v);

			v.on("sync#ready", () => {
				console.info("[SyncProvider] Sync Ready");
				v.init();
			});

			v.on("sync#connected", async () => {
				console.info("[SyncProvider] Sync Connected");
				const doc: Sync.SyncDocument = await v.registerDocument({ name: `K-${KIOSK_ID}` });
				console.info("[SyncProvider] Sync Document Registered", doc);
				setStatusDocument(doc);
			});
		} catch (error) {
			console.error("[Client] ", error);
		}
	}

	return (<SyncContext.Provider value={{ init, status, isLoading }}>{children}</SyncContext.Provider>);
}