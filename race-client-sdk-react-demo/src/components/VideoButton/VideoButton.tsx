import { FC } from "react";
import { Button } from "@twilio-paste/core/button";
import { Modal, ModalHeader, ModalHeading, ModalBody, ModalFooter, ModalFooterActions } from "@twilio-paste/core/modal";
import { ProductVideoIcon } from "@twilio-paste/icons/esm/ProductVideoIcon";
import { useUID } from "@twilio-paste/core/uid-library";
import { Box } from "@twilio-paste/core/box";
import { useVideoContext } from "../../hooks/useVideoContext";
import { MuteButton } from "./MuteButton";
import { UnmuteButton } from "./UnmuteButton";
import { useSyncContext } from "../../hooks/useSyncContext";

export const VideoButton: FC = () => {
	const { video, isMuted, isOpen, localVideoMedia, remoteVideoMedia, connect, disconnect } = useVideoContext();
	const { isLoading, status: kioskStatus } = useSyncContext();
	const modalHeadingID = useUID();

	return (<>
		<Button variant="primary" onClick={connect} disabled={!isLoading && kioskStatus === "closed"} loading={!video?.ready || isLoading}><ProductVideoIcon decorative={true} /> Start Video Call</Button>
		<Modal ariaLabelledby={modalHeadingID} isOpen={isOpen} onDismiss={disconnect} size="wide">
			<ModalHeader>
				<ModalHeading as="h3" id={modalHeadingID}>Video Call Us</ModalHeading>
			</ModalHeader>
			<ModalBody>
				<Box position="relative" minHeight="500px">
					<Box ref={localVideoMedia} position="absolute" width="30%" borderRadius="borderRadius30" overflow="hidden" zIndex="zIndex90">

					</Box>
					<Box ref={remoteVideoMedia} position="relative" borderRadius="borderRadius30" overflow="hidden" zIndex="zIndex50">

					</Box>
				</Box>
			</ModalBody>
			<ModalFooter>
				<ModalFooterActions>
					{isMuted ? <UnmuteButton /> : <MuteButton />}
				</ModalFooterActions>
			</ModalFooter>
		</Modal></>)
}