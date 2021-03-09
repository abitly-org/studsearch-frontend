/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { IForm } from "../../interfaces";
import Input from "../Input";
import {
  getUniversities,
  getFaculties,
  getSpecialities,
  getRegions,
  Courses,
  University,
  Region,
  Faculty,
  Speciality,
  DataSource,
} from "..//..//Helpers/api";

import DropDown from "../DropDown";

type FormProps = {};

const startUniversitiesValue: University[] = [];

export default function Form(props: FormProps) {
  const [universities, setUniversities] = useState(startUniversitiesValue);
  const isMounted = useRef(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!isMounted.current) {
      getUniversities("", undefined, 10, 0).then((universities) => {
        if (!universities) {
          setLoading(true);
        } else {
          setLoading(false);
        }
        setUniversities(universities);
      });
    }
    return () => {
      isMounted.current = true;
    };
  });

  return (
    <>
      <div>
        <input name="name" type="text" className=" " placeholder="name"></input>
        <input
          name="surname"
          type="text"
          className=" "
          placeholder="surname"
        ></input>
      </div>

      <DropDown
        dataItems={universities}
        placeholderValue="Вищий навчальний заклад"
        loading={loading}
      />
    </>
  );
}
