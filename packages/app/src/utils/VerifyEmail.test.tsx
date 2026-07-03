import { expect, test } from "vitest";
import { verifyEmail } from "./VerifyEmail";

test('true : valid email', () => {
    expect(verifyEmail("nomprenom@mail.com")).toBe(true)
})

test('false : miss the "@"', () => {
    expect(verifyEmail("nomprenom.com")).toBe(false)
})

test('false : more than one "@"', () => {
    expect(verifyEmail("nom@prenom@mail.com")).toBe(false)
})

test('false : "@" is only at the end', () => {
    expect(verifyEmail("nomprenom.com@")).toBe(false)
})

test('false : "@" is only at the begining', () => {
    expect(verifyEmail("@nomprenom.com")).toBe(false)
})

test('false : there is 2 "@" next to each other', () => {
    expect(verifyEmail("nomprenom@@mail.com")).toBe(false)
})

test('false : the domain part miss the "."', () => {
    expect(verifyEmail("nomprenom@mail")).toBe(false)
})

test('false : there is a " " in the mail address (1)', () => {
    expect(verifyEmail("nomprenom@m ail")).toBe(false)
})

test('false : there is a " " in the mail address (2)', () => {
    expect(verifyEmail("nom prenom@mail")).toBe(false)
})

test('false : there is 2 points next to each other', () => {
    expect(verifyEmail("nom.prenom@mail..com")).toBe(false)
})

test('false : the domain part is absent', () => {
    expect(verifyEmail("nomprenom@mail.")).toBe(false)
})