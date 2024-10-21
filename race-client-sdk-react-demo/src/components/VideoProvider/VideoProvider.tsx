import { Context, createContext, FC, useCallback, useEffect, useState } from "react";
import { Video } from "@ciptex/race-client-sdk";
import { ReactElementProps } from "../../interface";
import { ACCOUNT_SID, IDENTITY } from "../../constants";

export type VideoContextType = {
	video?: Video;
	isMuted: boolean;
	isOpen: boolean;
	init: () => void;
	connect: () => void;
	disconnect: () => void;
	localVideoMedia: (node: HTMLDivElement) => void;
	remoteVideoMedia: (node: HTMLDivElement) => void;
};

export const VideoContext: Context<VideoContextType> = createContext<VideoContextType>(null!);

export const VideoProvider: FC<ReactElementProps> = ({ children }: ReactElementProps) => {
	const [video, setVideo] = useState<Video>();
	const [isOpen, setIsOpen] = useState(false);
	const [isMuted, setIsMuted] = useState<boolean>(false);
	const [localMediaContainer, setLocalMediaContainer] = useState<HTMLDivElement>();
	const [remoteMediaContainer, setRemoteMediaContainer] = useState<HTMLDivElement>();

	const localVideoMedia = useCallback((node: HTMLDivElement | null) => {
		if (node && node !== null) { setLocalMediaContainer(node); }
	}, []);

	const remoteVideoMedia = useCallback((node: HTMLDivElement | null) => {
		if (node && node !== null) { setRemoteMediaContainer(node); }
	}, []);

	useEffect(() => {
		const disabled = () => setIsMuted(true);
		const enabled = () => setIsMuted(false);

		const created = () => {
			console.info("[Client] video#created recieved");
			video?.localTracks?.forEach((track) => {
				track.kind === "audio" && track.on("disabled", disabled);
				track.kind === "audio" && track.on("enabled", enabled);
			});
		};

		const disconnected = async () => {
			console.info("[Client] video#disconnected recieved");
			setTimeout(() => {
				setIsOpen(false);
				setLocalMediaContainer(undefined);
				setRemoteMediaContainer(undefined);
			}, 200);
		}

		if (video && isOpen && localMediaContainer && remoteMediaContainer) {
			video.once("video#created", created);
			video.once("video#disconnected", disconnected);

			video.connect({
				localMediaContainer: localMediaContainer,
				remoteMediaContainer: remoteMediaContainer
			});
		}

		return () => {
			video?.localTracks?.forEach((track) => {
				track.off("disabled", disabled);
				track.off("enabled", enabled);
			});
		}
	}, [isOpen, video, localMediaContainer, remoteMediaContainer]);

	const init = (): void => {
		try {
			if(!ACCOUNT_SID || !IDENTITY) {
				throw new Error ("Missing ACCOUNT_SID or IDENTITY Variables");
			}

			const v = new Video({
				accountSid: ACCOUNT_SID,
				identity: IDENTITY
			});

			v.on("video#ready", () => {
				console.info("[Client] video#ready recieved");
				setVideo(v);
			});
		} catch (error) {
			console.error("[Client] ", error);
		}
	}

	const connect = (): void => {
		setIsOpen(true);
	}

	const disconnect = (): void => {
		video?.disconnect();
	}

	return (<VideoContext.Provider value={{ video, isMuted, isOpen, init, localVideoMedia, remoteVideoMedia, connect, disconnect }}>{children}</VideoContext.Provider>);
}