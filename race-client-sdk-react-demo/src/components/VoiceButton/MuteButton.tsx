import { Button } from "@twilio-paste/core/button";
import { MicrophoneOffIcon } from "@twilio-paste/icons/esm/MicrophoneOffIcon";
import { FC } from "react";
import { useVoiceContext } from "../../../src/hooks/useVoiceContext";

export const MuteButton: FC = () => {
	const { voice } = useVoiceContext();
	return (
		<Button onClick={() => voice?.call?.mute(true)} variant="secondary">
			<MicrophoneOffIcon aria-label="Mute Microphone" title="Mute Microphone" decorative={false} />
		</Button>
	)
}