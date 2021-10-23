export const getUserId = ({ user }) => user && user.id;
export const isInstitution = ({ user }) => user && user.id && !!user.cnpj;