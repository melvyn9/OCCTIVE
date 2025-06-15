import Papa from 'papaparse';

const SPREADSHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSS6rL8L7-EZNE9qQHbA18j3gcUAvWLQ2B5TnloSPkxQR4iKvDMJxp-UFOdsFlGhjM0x47pUK4gcuC2/pub?output=csv';

export enum DataTypes {
  Headers = '29489883',
  Home='395547379',
  Majors = '860790804',
  Videos = '2013487824',
  Departments = '929723649',
  MajorSpecializations = '1867072131',
}

export interface Majors {
  code: string;
  name: string;
  selective: string;
  'degree_type': string;
  departments: string;
  hook: string;
  description: string;
  'link_1_title': string;
  'link_1_url': string;
  'link_2_title': string;
  'link_2_url': string;
  image: string;
  note: string;
}

export interface Videos {
  name: string;
  description: string;
  note: string;
  links: { title: string; url: string }[];

  subunit1: string;
  subunit1Video1: string;
  subunit1Video1Url: string;
  subunit1Video2: string;
  subunit1Video2Url: string;
  subunit1Video3: string;
  subunit1Video3Url: string;

  subunit2: string;
  subunit2Video1: string;
  subunit2Video1Url: string;
  subunit2Video2: string;
  subunit2Video2Url: string;
  subunit2Video3: string;
  subunit2Video3Url: string;

  subunit3: string;
  subunit3Video1: string;
  subunit3Video1Url: string;
  subunit3Video2: string;
  subunit3Video2Url: string;
  subunit3Video3: string;
  subunit3Video3Url: string;

}

export const useData = (gid: DataTypes): Promise<Array<any>> => new Promise((resolve, reject) => {
  const cacheData = sessionStorage.getItem(gid);

  if (cacheData) {
    resolve(JSON.parse(cacheData));
    return;
  }

  const prefetch = () => {
    Object.keys(DataTypes).forEach((type) => {
      if (DataTypes[type] !== gid) {
        Papa.parse<any>(`${SPREADSHEET_URL}&gid=${DataTypes[type]}`, {
          download: true,
          header: true,
          complete: (results) => {
            const { data } = results;
            if (data.length !== 0) {
              sessionStorage.setItem(DataTypes[type], JSON.stringify(data));
            }
          },
          error: (error) => {
            reject(error);
          },
        });
      }
    });
  };

  Papa.parse<any>(`${SPREADSHEET_URL}&gid=${gid}`, {
    download: true,
    header: true,
    complete: (results) => {
      const { data } = results;

      if (data.length !== 0) {
        sessionStorage.setItem(gid, JSON.stringify(data));
      }

      prefetch();
      resolve(data);
    },
    error: (error) => {
      reject(error);
    },
  });
});
