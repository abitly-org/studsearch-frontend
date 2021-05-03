import React from "react";
import {
  Faculty,
  getFaculties,
  getRegions,
  getSpecialities,
  getUniversities,
  Region,
  Speciality,
  University,
} from "../../Helpers/api";
import Dropdown2 from "../Dropdown2";

import "./index.scss";

export default function MyltyDropdowns() {
  const [regions, setRegions] = React.useState<Region[]>([]);
  const [selectedRegions, setSelectedRegions] = React.useState<Region[]>([]);

  const [selectedUniversities, setSelectedUniversities] = React.useState<
    University[]
  >([]);

  const [selectedSpecialities, setSelectedSpeсialities] = React.useState<
    Speciality[]
  >([]);

  const [selectedFaculties, setSelectedFaculties] = React.useState<Faculty[]>(
    []
  );

  React.useEffect(() => {
    getRegions().then((data) => setRegions(data.regions));
  }, []);

  return (
    <>
      <div className="multy-dropdown-group">
        <div className="row">
          <Dropdown2
            className="DropdownShadow"
            style={{ flex: 0.8 }}
            name="Регіон"
            values={regions ?? []}
            renderItem={(v) => v?.name}
            multiple={true}
            value={selectedRegions}
            onChange={setSelectedRegions}
            equals={(a, b) => a?.id === b?.id}
          />
        </div>

        <div className="row">
          <Dropdown2<University>
            className="DropdownShadow"
            style={{ flex: 1 }}
            name="Вищий навчальний заклад"
            pagination={React.useCallback(
              (count, offset, query) =>
                getUniversities(query, selectedRegions[0]?.id, count, offset),
              [selectedRegions]
            )}
            renderItem={(v) => v?.name}
            multiple={true}
            value={selectedUniversities}
            onChange={setSelectedUniversities}
            equals={(a, b) => a?.id === b?.id}
          />
        </div>

        <div className="row">
          <Dropdown2<Speciality>
            className="DropdownShadow"
            style={{ flex: 1 }}
            name="Спеціальність"
            pagination={React.useCallback(
              (count, offset, query) =>
                getSpecialities(
                  query,
                  selectedUniversities[0]?.id,
                  count,
                  offset
                ),
              [selectedUniversities]
            )}
            renderItem={(v) => v?.name}
            multiple={true}
            value={selectedSpecialities}
            onChange={setSelectedSpeсialities}
            equals={(a, b) => a?.id === b?.id}
          />

          <Dropdown2<Faculty>
            className="DropdownShadow"
            style={{ flex: 1 }}
            name="Факультет"
            pagination={React.useCallback(
              (count, offset, query) =>
                getFaculties(query, selectedSpecialities[0]?.id, count, offset),
              [selectedSpecialities]
            )}
            renderItem={(v) => v?.name}
            multiple={true}
            value={selectedFaculties}
            onChange={setSelectedFaculties}
            equals={(a, b) => a?.id === b?.id}
          />
        </div>
      </div>
    </>
  );
}
