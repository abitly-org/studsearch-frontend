import UpdateEmitter from './updateemitter';

export const DEV = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

export const baseURL = DEV ? "https://localhost.test" : "https://studsearch.org";
// export const endpoint = DEV ? "https://server.studsearch.org:2324" : "https://server.studsearch.org:2323";
export const endpoint = DEV ? "http://localhost:2323" : "https://server.studsearch.org:2323";
export const telegramBot = DEV ? "StudSearch_TestBot" : "StudSearchBot";
export const instagramClientId = '710477512866503';

const arr = (v?: any | any[]) : string | undefined => 
    v ? (Array.isArray(v) ? v.join(',') : String(v)) : undefined

const getQueryString = (url = window.location.href) => {
    const questionMarkIndex = url.indexOf('?');
    if (questionMarkIndex < 0)
        return '';
    return url.substring(questionMarkIndex + 1);
}
export type QueryValue = undefined | string | number | boolean | (string | number | boolean)[];
export const parseQuery = (query: string = getQueryString()) : {[key: string]: QueryValue } => {
    if (!query)
        return {};
    if (query[0] === '?')
        query = query.substring(1);
    const result = {} as any;
    const params = query.split('&')?.map?.(str => str.split('=')) || [];
    for (const [keyStr, valueStr] of params) {
        const key = decodeURIComponent(keyStr);
        // empty string => empty value => only key mentioned
        let value : QueryValue = !valueStr ? true : decodeURIComponent(valueStr);
        if (value === 'true' || value === 'false')
            value = value === 'true';
        // if (typeof value === 'string' && /^[\d\.]+$/) {
        //     const valueNum = parseFloat(value);
        //     if (!isNaN(valueNum))
        //         value = valueNum;
        // }

        if (result[key]) {
            if (!Array.isArray(result[key]))
                result[key] = [ result[key] ];
            result[key].push(value);
        } else {
            result[key] = value;
        }
    }
    return result;
}
export const makeQuery = (query?: {[key: string]: QueryValue}) => {
    if (typeof query !== 'object' || query === null)
        return '';
    if (Object.keys(query).length === 0)
        return '';
    return '?' + 
        Object.entries(query)
            .filter(([key, value]) => value !== undefined && !((typeof value === 'string' || Array.isArray(value)) && value.length === 0))
            .map(([key, value]) => {
                if (value === undefined)
                    return '';
                if (Array.isArray(value))
                    return value.map(val => encodeURIComponent(key) + '=' + encodeURIComponent(val)).join('&');
                return encodeURIComponent(key) + '=' + encodeURIComponent(value)
            })
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
export const addQuery = (name: string, value: QueryValue, url = window.location.href, pathname = window.location.pathname) : string => {
    const questionMarkIndex = url.indexOf('?');
    if (questionMarkIndex < 0)
        return pathname + makeQuery({[name]: value});
    const path = pathname ?? url.substring(0, questionMarkIndex);
    const queryString = url.substring(questionMarkIndex + 1);
    const query = parseQuery(queryString);
    return path + makeQuery({ ...query, [name]: value });
}
export const setQuery = (query: {[name: string]: QueryValue}, url = window.location.href, pathname = window.location.pathname) : string => {
    const questionMarkIndex = url.indexOf('?');
    if (questionMarkIndex < 0)
        return pathname + makeQuery(query);
    const path = pathname ?? url.substring(0, questionMarkIndex);
    return path + makeQuery(query);
}


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

const localesMap : Record<string, string> = {
    'uk-UA': 'ua',
    'ru-RU': 'ru',
    'en-US': 'en'
}
export const takeString = (entry?: string | FieldEntry, lang?: string) => {
    if (!entry)
        return '';
    if (typeof entry === 'string')
        return entry;
    // if (lang && lang.indexOf('_') >= 0)
    //     lang = lang?.split?.('_')?.[0];
    // console.log('lang=', lang)
    if (lang && localesMap[lang])
        lang = localesMap[lang];

    if (lang && entry[lang])
        return entry[lang];
    for (const lng in (entry ?? {}))
        if (entry[lng]) 
            return entry[lng];
    return '';
}

export type FieldEntry<Value = string> = {
    [lang: string]: Value;
} | Value;

export interface Region {
    id: number;
    name: string;
    universitiesCount?: number | string;
    studentsCount?: number | string;
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
    name: FieldEntry;
    studentsCount?: number;
};
export const getUniversities = (query: string = '', regionId?: number | number[], count: number = 50, offset: number = 0) : Promise<University[]> => 
    __reqjson("/universities/", {count, offset, query, regionId: arr(regionId)});
export const Universities = <T>(customizer: (university: University) => T, regionId?: number) =>
    new DataSource<T>(async (query, count, offset) => {
        return (await getUniversities(query, regionId, count, offset))
            .map(customizer);
    });

export interface Faculty {
    id: number;
    name: FieldEntry;
    studentsCount: number;
};
export const getFaculties = (query: string = '', universityId?: number | number[], count: number = 50, offset: number = 0) : Promise<Faculty[]> => 
    __reqjson("/faculties/", {count, offset, query, universityId: arr(universityId)});
export const Faculties = <T>(customizer: (faculty: Faculty) => T, universityId?: number) =>
    new DataSource<T>(async (query, count, offset) => {
        return (await getFaculties(query, universityId, count, offset))
            .map(customizer);
    });

export interface Speciality {
    id: number;
    name: FieldEntry;
    code: string;
    studentsCount?: number;
}
export const getSpecialities = (query: string = '', universityId?: number | number[], count: number = 50, offset: number = 0) : Promise<Speciality[]> =>
    __reqjson("/specialities/", {count, offset, query, universityId: arr(universityId)});
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

    university: FieldEntry;
    faculty: FieldEntry;
    speciality: FieldEntry;
};
export const getStudents = async (
    count: number,
    offset: number = 0,
    regionId?: number | number[],
    universityId?: number | number[],
    specialityId?: number | number[],
    facultyId?: number | number[],
    courses?: number | number[]
) : Promise<Student[]> =>
  __reqjson("/students/", {
      regionId: arr(regionId),
      universityId: arr(universityId),
      specialityId: arr(specialityId),
      facultyId: arr(facultyId),
      course: arr(courses),
      count, offset
  });
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
    {id: 0, name: "1 курс"},
    {id: 1, name: "2 курс"},
    {id: 2, name: "3 курс"},
    {id: 3, name: "4 курс"},
    {id: 4, name: "5 курс"},
    {id: 5, name: "6 курс"},
    {id: 6, name: "Випускник"}
];