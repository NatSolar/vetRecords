import { Vaccine } from "./vaccine";

export interface Vaccines {
    id?: number,
    petId: number,
    yearsOld: number,
    date: string,
    vaccines: Vaccine[]
}