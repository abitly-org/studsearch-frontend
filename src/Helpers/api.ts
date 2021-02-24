import UpdateEmitter from './updateemitter';

export const DEV = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

export const baseURL = DEV ? "https://localhost.test" : "https://studsearch.org";
export const endpoint = DEV ? "https://server.studsearch.org:2324" : "https://server.studsearch.org:2323";
export const telegramBot = DEV ? "StudSearch_TestBot" : "StudSearchBot";
export const instagramClientId = '710477512866503';

const makeQuery = (query?: {[key: string]: any}) => {
    if (typeof query !== 'object')
        return '';
    return '?' + Object.entries(query)
                        .filter(([key, value]) => value !== undefined)
                        .map(([key, value]) => encodeURIComponent(key) + '=' + encodeURIComponent(value))
                        .join('&');
};
export const getQuery = (name : string, url : string = window.location.href) => {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
};


// const store : {[path: string]: any} = {};
export const __reqjson = async (path: string, query?: any) : Promise<any> => {
    // if (store[path])
    //     return store[path];
    const result = await (await fetch(endpoint + path + makeQuery(query))).json();
    
    // store[path] = result;
    return result;
};

export class DataSource<T> extends UpdateEmitter<[]> {
    items: T[] = [];
    loading: boolean = false;
    complete: boolean = false;
    constructor(loadCallback: (query: string, count: number, offset: number) => Promise<T[] | undefined>, pageCount: number = 50) {
        super();

        this.loadCallback = loadCallback;
        this.pageCount = pageCount;
    }

    private id : number = 0;
    private query: string = '';
    pageCount: number = 20;
    loadCallback: (query: string, count: number, offset: number) => Promise<T[] | undefined>;
    async load() {
        if (this.complete || this.loading)
            return;

        this.loading = true;
        this.update();

        const myID = ++this.id;
        let result = await this.loadCallback(this.query, this.pageCount, this.items.length);
        if (myID !== this.id)
            return;
            
        if (result === undefined || result.length < this.pageCount)
            this.complete = true;
        if (result !== undefined)
            this.items.push(...result);
        this.loading = false;
        this.update();
    }

    async updateQuery(query: string = '') {
        if (this.query === query)
            return;
        this.query = query;
        this.items = [];
        this.loading = false;
        this.complete = false;
        this.update();
        await this.load();
    }


}


export interface Region {
    id: number;
    name: string;
    universitiesCount: number | string;
    studentsCount: number | string;
};
export interface RegionsData {
    regions: Region[];
    yours: number | null;
}
export const getRegions = async () : Promise<RegionsData> => {
    const result = await __reqjson('/regions');
    if (Array.isArray(result))
        return {regions: result, yours: null};
    return result;
};


export interface University {
    id: number;
    name: string;
    studentsCount: number;
};
export const getUniversities = (query: string = '', regionId?: number, count: number = 50, offset: number = 0) : Promise<University[]> => 
    __reqjson("/universities/" + (regionId !== undefined ? regionId : ''), {count, offset, query});
export const Universities = <T>(customizer: (university: University) => T, regionId?: number) =>
    new DataSource<T>(async (query, count, offset) => {
        return (await getUniversities(query, regionId, count, offset))
            .map(customizer);
    });

export interface Faculty {
    id: number;
    name: string;
    studentsCount: number;
};
export const getFaculties = (query: string = '', universityId?: number, count: number = 50, offset: number = 0) : Promise<Faculty[]> => 
    __reqjson("/faculties/" + (universityId !== undefined ? universityId : ''), {count, offset, query});
export const Faculties = <T>(customizer: (faculty: Faculty) => T, universityId?: number) =>
    new DataSource<T>(async (query, count, offset) => {
        return (await getFaculties(query, universityId, count, offset))
            .map(customizer);
    });

export interface Speciality {
    id: number;
    name: string;
    code: string;
    studentsCount: number;
}
export const getSpecialities = (query: string = '', universityId?: number, count: number = 50, offset: number = 0) : Promise<Speciality[]> =>
    __reqjson("/specialities/" + (universityId !== undefined ? universityId : ''), {count, offset, query});
export const Specialities = <T>(customizer: (speciality: Speciality) => T, universityId?: number) =>
    new DataSource<T>(async (query, count, offset) => 
        (await getSpecialities(query, universityId, count, offset))
            .map(customizer)
    );

export interface Student {
    uuid: string;
    name: string;
    about: string;
    course: number;
    social: string[];

    university: string;
    faculty: string;
    speciality: string;
};
export const getStudents = async (count: number, offset: number = 0, regionId?: number, universityId?: number, specialityId?: number, facultyId?: number) : Promise<Student[]> =>
  __reqjson("/students/", {regionId, universityId, specialityId, facultyId, count, offset});
// {
//     await new Promise(resolve => setTimeout(resolve, 1000));
//     return Array(count).fill(null).map((_, i) => ({
//         uuid: (Math.random() * 999999).toString(),
//         name: Math.round(Math.random() * 999999).toString(),
//         about: Math.round(Math.random() * 9999999999999).toString().repeat(Math.random() * 20),

//         course: Math.round(Math.random() * 6),

//         university: Math.round(Math.random() * 9999999999999).toString(),
//         faculty: Math.round(Math.random() * 9999999999999).toString(),
//         speciality: Math.round(Math.random() * 9999999999999).toString(),

//         social: ['telegram']
//     }))
// }
    
export const Students = (regionId?: number, universityId?: number, facultyId?: number, specialityId?: number) =>
    new DataSource<Student>(async (_, count, offset) => 
        await getStudents(count, offset, regionId, universityId, specialityId, facultyId),
        12
    );

// export const getStudentLink = (studentUUID: string, social: string) => 
//     __reqjson(`/link/${studentUUID}/${social}/`);
export const studentLink = (studentUUID: string, social: string) =>
    `${endpoint}/link/${studentUUID}/${social}/`;
export const studentPhoto = (studentUUID: string) =>
    `${endpoint}/photo/${studentUUID}`

export const login = async (socialName: string, data: any) =>
    await __reqjson(`/auth/${socialName}`, {data: JSON.stringify(data)});
export const instagramLink = () =>
    `https://www.instagram.com/oauth/authorize?client_id=${instagramClientId}&redirect_uri=${baseURL}/callback/instagram/&response_type=code&scope=user_profile`

export const count = async () : Promise<{studentsCount: number, universitiesCount: number}> =>
    await __reqjson('/count/');

export const register = async (
    name: string,
    about: string,
    universityID: number,
    facultyID: number,
    specialityID: number,
    course: number,
    tokens: string[]
) => await __reqjson("/register/", {name, about, universityID, facultyID, specialityID, course, tokens: tokens.join(',')});

export const Courses = [
    {id: 0, title: "1 курс"},
    {id: 1, title: "2 курс"},
    {id: 2, title: "3 курс"},
    {id: 3, title: "4 курс"},
    {id: 4, title: "5 курс"},
    {id: 5, title: "6 курс"},
    {id: 6, title: "Випускник"}
];