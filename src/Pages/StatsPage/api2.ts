import { makeQuery } from "../../Helpers/api";

const ENDPOINT = 'http://localhost:5000';

export type Branch = {
  name: string;
  id: number;
}
export const getBranches = (count: number, offset: number, query?: string): Promise<Branch[]> =>
  fetch(`${ENDPOINT}/branches${makeQuery({ count, offset, q: query })}`)
    .then(r => r?.json?.())
    .then(r => r.map(([id, name]: any) => ({ id, name })));

export type Region = {
  name: string;
  id: number
}
export const getRegions = (count: number, offset: number, query?: string): Promise<Region[]> =>
  fetch(`${ENDPOINT}/regions${makeQuery({ count, offset, q: query })}`)
    .then(r => r?.json?.())
    .then(r => r.map(([id, name]: any) => ({ id, name })));

export type Stats = {
  count: number;
  zno: number;
}

export type University = {
  id: number;
  
  short?: string;
  full: string;
} & Stats;

export const getUniversities = (
  branchId: number | undefined,
  specialityId: number[],
  regionId: number[],
  count: number,
  offset: number
) : Promise<University[]> =>
  fetch(`${ENDPOINT}/universities${makeQuery({ count, offset, branchId, specialityId, regionId, stats: true })}`)
    .then(r => r?.json?.())
    .then(r => r.map(([id, full]: any) => ({ id, full })));

export type Speciality = {
  id: number;
  name: string;

  // TODO: stat
} & Stats;

export const getSpecialities = (
  branchId: number | undefined,
  specialityId: number[],
  universityId: number,
  facultyId: number | undefined,
  count: number,
  offset: number
) : Promise<Speciality[]> =>
  fetch(`${ENDPOINT}/specialities${makeQuery({ count, offset, branchId, specialityId, facultyId, universityId, stats: true })}`)
    .then(r => r?.json?.())
    .then(r => r.map(([id, full]: any) => ({ id, full })));

export type Faculty = {
  id: number;
  name: string;
} & Stats;

export const getFaculties = (
  branchId: number | undefined,
  universityId: number,
  specialityId: number[] | number | undefined,
  count: number,
  offset: number
) : Promise<Faculty[]> =>
  fetch(`${ENDPOINT}/faculties${makeQuery({ count, offset, branchId, specialityId, universityId, stats: true })}`)
    .then(r => r?.json?.())
    .then(r => r.map(([id, full]: any) => ({ id, full })));