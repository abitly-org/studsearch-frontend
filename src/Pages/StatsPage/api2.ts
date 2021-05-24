import { makeQuery } from "../../Helpers/api";

export const DEV = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
const ENDPOINT = DEV ? 'https://studsearchback.herokuapp.com' : 'https://studsearchback.herokuapp.com';

export type Branch = {
  name: string;
  id: number;
}
export const getBranches = (count: number, offset: number, query?: string): Promise<Branch[]> =>
  fetch(`${ENDPOINT}/branches${makeQuery({ count, offset, q: query })}`)
    .then(r => r?.json?.());

export type Region = {
  name: string;
  id: number;
}
export const getRegions = (
  count: number,
  offset: number,
  query?: string
): Promise<Region[]> =>
  fetch(`${ENDPOINT}/regions${makeQuery({ count, offset, q: query })}`)
    .then(r => r?.json?.());

export type Stats = {
  place?: number;
  count?: number;
  zno?: number;
}

export type University = {
  id: number;
  
  short_name?: string;
  full_name: string;

  city?: string;
  website?: string;
} & Stats;

export const getUniversities = (
  branchId: number | number[],
  specialityId: number[],
  regionId: number[],
  positionType: 'contract' | 'budget' = 'contract',
  count: number,
  offset: number,
  stats?: boolean
) : Promise<University[]> =>
  fetch(`${ENDPOINT}/universities${makeQuery({ count, offset, branchId, specialityId, regionId, stats, positionType })}`)
    .then(r => r?.json?.());
    // .then(r => r.map(([id, full]: any) => ({ id, full })));

export type Speciality = {
  id: number;
  name: string;
  code?: string;
} & Stats;

export const getSpecialities = (
  branchId: number | number[],
  specialityId: number[],
  universityId: number | undefined,
  facultyId: number | undefined,
  count: number,
  offset: number,
  query?: string,
  positionType?: string,
  stats?: boolean
) : Promise<Speciality[]> =>
  fetch(`${ENDPOINT}/specialities${makeQuery({ count, offset, branchId, specialityId, facultyId, positionType, universityId, stats, q: query })}`)
    .then(r => r?.json?.());

export type Faculty = {
  id: number;
  name: string;
} & Stats;

export const getFaculties = (
  branchId: number | number[],
  universityId: number,
  specialityId: number[] | number | undefined,
  count: number,
  offset: number,
  positionType?: string,
  stats?: boolean
) : Promise<Faculty[]> =>
  fetch(`${ENDPOINT}/faculties${makeQuery({ count, offset, branchId, specialityId, positionType, universityId, stats })}`)
    .then(r => r?.json?.());