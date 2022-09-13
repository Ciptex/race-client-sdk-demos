import Call from "../components/core/Call/Call"

export const ViewRender = (containerName: string) => {

	switch (containerName) {
	case "call":
		return (
			<Call />
		)
	case "video":
		return (
			<Call />
		)
	case "chat":
		return (
			<Call />
		)
	default:
		return (
			null
		)
	}
}
