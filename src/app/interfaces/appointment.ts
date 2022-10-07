export interface Appointment {
    id?: number,
    title: string,
    recordId: number,
    start: Date,
    end: Date,
    ownerId: number
}