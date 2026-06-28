export function verifyEmail(email: string) {
    const split_email = email.split("@")
    if (split_email.length !== 2) {
        return false
    } 
    if (split_email[0].length < 1 || split_email[1].length < 3 || email.includes(" ") || !split_email[1].includes(".")) {
        return false
    }
    return true
}