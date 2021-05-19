import * as React from 'react';
import Dropdown2 from '.';
import { Region, getRegions, takeString, University, getUniversities, Speciality, getSpecialities, Faculty, getFaculties } from '../../Helpers/api';
import useLoad from '../../Helpers/useLoad';
import { P4 } from '../Text';

import specialty from '../../Components/StudentCard/specialty.svg';
import university from '../../Components/StudentCard/university.svg';
import { TFunction, useTranslation } from 'react-i18next';

import './custom.scss';

const Item = ({ children, studentsCount, universitiesCount, inDropdown }: {
  children: React.ReactNode,
  studentsCount?: number,
  universitiesCount?: number,
  inDropdown: boolean
}) : JSX.Element =>
  <P4 className='DropdownItem'>
    {children}
    { (studentsCount || universitiesCount) &&
      <span className="Stat">
        { studentsCount && 
          <span className='StudentsCount'>
            <img src={specialty} />
            <P4>{studentsCount}</P4>
          </span>
          || null
        }
        { universitiesCount && 
          <span className='UniversitiesCount'>
            <img src={university} />
            <P4>{universitiesCount}</P4>
          </span>
          || null
        }
      </span>
      || null
    }
  </P4>;


export type CustomDropdownProps<I> = {
  className?: string,
  style?: React.CSSProperties,
  singleBorder?: boolean
  error?: boolean,
  name: string,
} & ({
  multiple: true;
  value: I[];
  onChange: (newValue: I[]) => void
} | {
  multiple: false;
  value: I | null;
  onChange: (newValue: I | null) => void
});

export const RegionDropdown = (props: CustomDropdownProps<Region>) => {
  const { i18n } = useTranslation();
  const allRegions = useLoad(() => getRegions().then(r => r?.regions), []);
  return (
    <Dropdown2<Region>
      {...props}

      renderItem={(r, inDropdown) => 
        inDropdown ? 
          <Item
            children={takeString(r?.name, i18n.language)}
            studentsCount={Number(r?.studentsCount)}
            universitiesCount={Number(r?.universitiesCount)}
            inDropdown={inDropdown}
          />
          :
          takeString(r?.name, i18n.language)
      }

      values={allRegions ?? []}
      loading={allRegions === null}
      equals={(a, b) => a?.id === b?.id}
    />
  );
}

export const UniversityDropdown = ({
  regions, ...props
}: CustomDropdownProps<University> & { regions?: Region[] }) => {
  const { i18n } = useTranslation();
  return (
    <Dropdown2<University>
      {...props}

      renderItem={(r, inDropdown) => 
        inDropdown ? 
          <Item
            children={takeString(r?.name, i18n.language)}
            studentsCount={Number(r?.studentsCount)}
            inDropdown={inDropdown}
          />
          :
          takeString(r?.name, i18n.language)
      }

      pagination={React.useCallback((count, offset, query) => 
        getUniversities(query, regions?.map?.(r => r?.id), count, offset),
        [ regions ]
      )}
      equals={(a, b) => a?.id === b?.id}
    />
  );
}

export const SpecialityDropdown = ({
  universities, ...props
}: CustomDropdownProps<Speciality> & { universities?: University[] }) => {
  const { i18n } = useTranslation();
  return (
    <Dropdown2<Speciality>
      {...props}

      renderItem={(r, inDropdown) => 
        inDropdown ? 
          <Item
            children={(r?.code ? r?.code + ' ' : '') + takeString(r?.name, i18n.language)}
            studentsCount={Number(r?.studentsCount)}
            inDropdown={inDropdown}
          />
          :
          (r?.code ? r?.code + ' ' : '') + takeString(r?.name, i18n.language)
      }

      pagination={React.useCallback(async (count, offset, query) => 
        (universities && universities?.length > 0) ? 
          getSpecialities(query, universities?.map?.(u => u?.id), count, offset)
          :
          [],
        [ universities ]
      )}
      disabled={universities?.length === 0}
      equals={(a, b) => a?.id === b?.id}
    />
  );
}

export const FacultyDropdown = ({
  universities, ...props
}: CustomDropdownProps<Faculty> & { universities?: University[] }) => {
  const { i18n } = useTranslation();

  return (
    <Dropdown2<Faculty>
      {...props}

      renderItem={(r, inDropdown) => 
        inDropdown ? 
          <Item
            children={takeString(r?.name, i18n.language)}
            studentsCount={Number(r?.studentsCount)}
            inDropdown={inDropdown}
          />
          :
          takeString(r?.name, i18n.language)
      }

      pagination={React.useCallback(async (count, offset, query) => 
        (universities && universities?.length > 0) ? 
          getFaculties(query, universities?.map?.(u => u?.id), count, offset)
          :
          [],
        [ universities ]
      )}
      disabled={universities?.length === 0}

      equals={(a, b) => a?.id === b?.id}
    />
  );
}

const CoursesCount = 7;
export const Courses = (t: TFunction) => (
  [...Array(CoursesCount)]
    .map((_, id) => ({ name: t(`student-course-${id}`), id }))
)
export const CourseDropdown = (props: CustomDropdownProps<{id?: number, name?: string}>) => {
  const { i18n, t } = useTranslation();
  return (
    <Dropdown2
      {...props}
      values={Courses(t)}
      renderItem={c => c?.name}

      equals={(a, b) => a?.id === b?.id}
    />
  );
}