export function verifyEmail(email: string) {
    const split_email = email.split("@")
    const user_part = split_email[0]
    const domain_part = split_email[1]

    // regarde qu'il y a un seul "@"
    if (split_email.length !== 2) return false

    // vérifie que le user part et le domain part sont valides
    if (user_part.length < 1 || domain_part.length < 3 || email.includes(" ") || !domain_part.includes(".") || (domain_part.includes('..')) || (domain_part.endsWith('.'))) {
        return false
    }
    return true
}