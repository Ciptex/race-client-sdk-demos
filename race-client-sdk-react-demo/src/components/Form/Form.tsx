import { Box } from "@twilio-paste/core/box";
import { FC } from "react";
import { useFormContext } from "../../../src/hooks/useFormContext";

export const FormContainer: FC = () => {
	const { formContainer } = useFormContext();
	return (
		<Box ref={formContainer}>

		</Box>
	);
}