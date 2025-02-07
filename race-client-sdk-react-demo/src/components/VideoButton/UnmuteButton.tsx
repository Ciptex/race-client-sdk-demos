import { Button } from "@twilio-paste/core/button";
import { MicrophoneOffIcon } from "@twilio-paste/icons/esm/MicrophoneOffIcon";
import { FC } from "react";
import { useVideoContext } from "../../hooks/useVideoContext";

export const UnmuteButton: FC = () => {
	const { video } = useVideoContext();
	return (
		<Button onClick={() => video?.unmute()} variant="secondary">
			<MicrophoneOffIcon aria-label="Unmute Microphone" title="Unmute Microphone" decorative={false} />
		</Button>
	)
}