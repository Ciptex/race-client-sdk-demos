import { Button } from "@twilio-paste/core/button";
import { FC } from "react";
import { useVoiceContext } from "../../hooks/useVoiceContext";
import { ProductVoiceIcon } from "@twilio-paste/icons/esm/ProductVoiceIcon";
import { Popover, PopoverButton, PopoverContainer } from "@twilio-paste/core/popover";
import { UnmuteButton } from "./UnmuteButton";
import { MuteButton } from "./MuteButton";
import { Box } from "@twilio-paste/core/box";
import { useSyncContext } from "../../../src/hooks/useSyncContext";

export const VoiceButton: FC = () => {
	const { connect, voice, disconnect, status, isMuted } = useVoiceContext();
	const { isLoading, status: kioskStatus } = useSyncContext();

	return (<PopoverContainer baseId="voice-controls">
		<PopoverButton onClick={() => connect()} disabled={!isLoading && kioskStatus === "closed"} variant="primary" loading={!voice?.ready || isLoading}><ProductVoiceIcon decorative={true} />
			Start Voice Call
		</PopoverButton>
		<Popover aria-label="Popover">
			{status !== "closed" ? <Box width="150px" padding="space40">
				<Box display="flex" position="relative" flexDirection="row" flex="1 1 auto" justifyContent="space-between">
					{isMuted ? <UnmuteButton /> : <MuteButton />}
					<Button onClick={() => disconnect()} variant="destructive">Hangup</Button>
				</Box>
			</Box> :
				<Box>No Active Call</Box>}
		</Popover>
	</PopoverContainer>);
}