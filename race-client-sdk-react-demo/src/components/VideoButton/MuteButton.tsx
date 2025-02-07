import { Button } from "@twilio-paste/core/button";
import { MicrophoneOnIcon } from "@twilio-paste/icons/esm/MicrophoneOnIcon";
import { FC } from "react";
import { useVideoContext } from "../../hooks/useVideoContext";

export const MuteButton: FC = () => {
	const { video } = useVideoContext();
	return (
		<Button onClick={() => video?.mute()} variant="secondary">
			<MicrophoneOnIcon aria-label="Mute Microphone" title="Mute Microphone" decorative={false} />
		</Button>
	)
}