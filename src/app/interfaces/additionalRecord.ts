import { Vaccines } from './vaccines';
import { Observation } from './observations';
import { Deworming } from './deworning';
import { InjectableMed } from './injectable';
import { PhysicalExam } from './physicalExam';
import { Exam } from './exam';

export interface AdditionalRecord {
    //vaccines: Vaccines
    observations: Observation[],
    dewormings: Deworming[],
    injectables: InjectableMed[],
    physicalExams : PhysicalExam[],
    exams: Exam[]
}