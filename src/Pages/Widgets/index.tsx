import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { CoursesTabs, LoadStudentFilters, StudentFiltersProps, useQueryId, useQueryNumberArray } from '../../Blocks/Students';
import { FacultyDropdown, RegionDropdown, SpecialityDropdown, UniversityDropdown } from '../../Components/Dropdown2/custom';
import { H1, H3, P1 } from '../../Components/Text';
import { makeQuery, Region } from '../../Helpers/api';
import { GoBack } from '../Registration/registration';

import './index.scss';

const StudentsWidgetBlock = ({ _regions, _universities, _faculties, _specialties }: StudentFiltersProps) => {

  const { t } = useTranslation();

  const [regions, setRegions] = useQueryId(_regions, 'region', true);
  const [universities, setUniversities] = useQueryId(_universities, 'university', true);
  const [specialties, setSpecialities] = useQueryId(_specialties, 'specialty', true);
  const [faculties, setFaculties] = useQueryId(_faculties, 'faculty', true);
  const [courses, setCourses] = useQueryNumberArray('course');

  const filters = {
    region: regions?.map?.(r => r?.id)?.join(' '),
    university: universities?.map?.(u => u?.id)?.join(' '),
    faculty: faculties?.map?.(f => f?.id)?.join(' '),
    specialty: specialties?.map?.(s => s?.id)?.join(' '),
    course: courses?.join?.(' ')
  }

  return (
    <>
      <H3>2. Віджет студентів</H3>
      <br />
      <br />
      <P1>Віджет зі студентами з обраними заздалегідь фільтрами. Підходить для сайту заклада вищої освіти для показу їх студентів.</P1>
      <P1>Оберіть нижче потрібні фільтри та скопіюйте код віджета на ваш сайт.</P1>
      <br />
      <br />
      <br />
      <br />
      <div className='Filters'>
        <RegionDropdown
          className='Region'
          name={t('block-students-region')}

          multiple
          value={regions} onChange={setRegions}
        />
        <UniversityDropdown
          className='University'
          name={t('block-students-university')}

          regions={regions}

          multiple
          value={universities}
          onChange={setUniversities}
        />
        <FacultyDropdown
          className='Faculty'
          name={t('block-students-faculty')}

          universities={universities}

          multiple
          value={faculties}
          onChange={setFaculties}
        />
        <SpecialityDropdown
          className='Speciality'
          name={t('block-students-specialty')}
          
          universities={universities}
          
          multiple
          value={specialties}
          onChange={setSpecialities}
        />
        <CoursesTabs
          courses={courses}
          setCourses={setCourses}
        />
      </div>
      <br />
      <br />
      <br />
      <iframe
        width={'100%'}
        height={600}
        src={`/widget/students${makeQuery(filters)}`}
      />
      <pre className='Code'>
        {`<!-- StudSearch widget -->
<iframe width='100%' height='600' src='https://studsearch.org/widget/students${makeQuery(filters)}' />`}
      </pre>
      <P1>Ви можете змінити ширину, висоту і стилі віджету для вашого сайту.</P1>
    </>
  );
}

const ButtonWidgetBlock = ({ _regions, _universities, _faculties, _specialties }: StudentFiltersProps) => {

  const { t } = useTranslation();

  const [regions, setRegions] = useQueryId(_regions, 'region', true);
  const [universities, setUniversities] = useQueryId(_universities, 'university', true);
  const [specialties, setSpecialities] = useQueryId(_specialties, 'specialty', true);
  const [faculties, setFaculties] = useQueryId(_faculties, 'faculty', true);
  const [courses, setCourses] = useQueryNumberArray('course');

  const filters = {
    region: regions?.map?.(r => r?.id)?.join(' '),
    university: universities?.map?.(u => u?.id)?.join(' '),
    faculty: faculties?.map?.(f => f?.id)?.join(' '),
    specialty: specialties?.map?.(s => s?.id)?.join(' '),
    course: courses?.join?.(' ')
  }

  return (
    <>
      <H3>1. Кнопка</H3>
      <br />
      <br />
      <P1>// TODO</P1>
      <br />
      <br />
    </>
  )
};

const WidgetsPage = () => {
  return (
    <div className='WidgetsPage'>
      <div className='Content'>
        <GoBack to="/" />
        <br />
        <br />
        <H1>Віджети StudSearch</H1>
        <br />
        <P1>За допомогою звертайтеся до <a href="https://t.me/VladBandurin">нас</a>.</P1>
        <br />
        <br />
        <br />
        <LoadStudentFilters children={filters =>
          <>
            <ButtonWidgetBlock {...filters} />
            <StudentsWidgetBlock {...filters} />
          </>
        } />
      </div>
    </div>
  )
}

export default WidgetsPage;