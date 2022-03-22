const handleDate = (date) => {
	return date.format("DD/MM/YYYY").slice(-7)
}
export default handleDate
