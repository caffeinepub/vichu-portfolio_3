import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface Skill {
    id: string;
    created: Time;
    name: string;
    level?: string;
    updated: Time;
    imageId?: string;
}
export interface Contact {
    linkedin: string;
    instagram: string;
    email: string;
    telegram: string;
}
export interface Project {
    id: string;
    title: string;
    created: Time;
    link?: string;
    year: bigint;
    description: string;
    updated: Time;
    imageId?: string;
    purpose: string;
}
export interface Profile {
    bio: string;
    title: string;
    profileImageId?: string;
    name: string;
}
export interface Certificate {
    id: string;
    title: string;
    created: Time;
    year?: bigint;
    updated: Time;
    imageId?: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addCertificate(certificate: Certificate): Promise<void>;
    addProject(project: Project): Promise<void>;
    addSkill(skill: Skill): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteCertificate(id: string): Promise<void>;
    deleteProject(id: string): Promise<void>;
    deleteSkill(id: string): Promise<void>;
    getCallerUserRole(): Promise<UserRole>;
    getCertificates(): Promise<Array<Certificate>>;
    getContact(): Promise<Contact>;
    getProfile(): Promise<Profile>;
    getProjects(): Promise<Array<Project>>;
    getSkills(): Promise<Array<Skill>>;
    isCallerAdmin(): Promise<boolean>;
    updateCertificate(certificate: Certificate): Promise<void>;
    updateContact(newContact: Contact): Promise<void>;
    updateProfile(newProfile: Profile): Promise<void>;
    updateProject(project: Project): Promise<void>;
    updateSkill(skill: Skill): Promise<void>;
}
