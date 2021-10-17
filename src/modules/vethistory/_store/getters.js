export const getVetHistory = ({ vetHistory }) => (petId) => vetHistory.filter(history => history.pet_id === petId)
export const hasSelectedVetHistory = ({ selectedVetHistory }) => selectedVetHistory && !!selectedVetHistory.vethistory_id