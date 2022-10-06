import { Deworming } from './deworning';
import { Exam } from './exam';
import { InjectableMed } from './injectable';
import { Observation } from './observations';
import { PhysicalExam } from './physicalExam';

export interface AdditionalRecord {
    observations: Observation[],
    dewormings: Deworming[],
    injectables: InjectableMed[],
    physicalExams : PhysicalExam[],
    exams: Exam[]
}