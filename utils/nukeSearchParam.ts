export const nukeSearchParam = (id: string | string[]): number => {
	let arg
	if(Array.isArray(id)) {
		arg = id.pop()
		if (!!arg) {
			return parseInt(arg, 10)
		}
	} else {
		return parseInt(id, 10)
	}
	return -1
}