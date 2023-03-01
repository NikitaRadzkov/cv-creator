import * as C from './styles';
import { useNavigate } from 'react-router-dom';
import {
  setName,
  setPosition,
  setEducation,
  setCurrentStep,
  setLanguageProficiency,
  setDomains
} from '../../context/slices/formSlice';
import { Theme } from '../../components/Theme';
import { ChangeEvent, FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { formState } from '../../context/slices/formSlice';
import { Input } from '../../components/Input';
import { useDebounce } from '../../hooks/debounce';

export const Personal: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { name, position, education, languageProficiency, domains } = useAppSelector(formState);
  const debouncedName = useDebounce<string>(name);
  const debouncedPosition = useDebounce<string>(position);
  const debouncedEducation = useDebounce<string>(education);
  const debouncedLanguageProficiency = useDebounce<string[]>(languageProficiency);
  const debouncedDomains = useDebounce<string[]>(domains);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: setName,
      payload: e.target.value
    });
  };

  const handlePositionChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: setPosition,
      payload: e.target.value
    });
  };

  const handleEducationChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: setEducation,
      payload: e.target.value
    });
  };

  const handleLanguageProficiencyChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: setLanguageProficiency,
      payload: e.target.value
    });
  };

  const handleDomainsChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: setDomains,
      payload: e.target.value
    });
  };

  const handleNextStep = () => {
    if (
      name !== '' &&
      position !== '' &&
      education !== '' &&
      languageProficiency.length !== 0 &&
      domains.length !== 0
    ) {
      navigate('/step2');
    } else {
      alert('Fill all data');
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  useEffect(() => {}, [
    debouncedName,
    debouncedPosition,
    debouncedEducation,
    debouncedLanguageProficiency,
    debouncedDomains
  ]);

  useEffect(() => {
    dispatch({
      type: setCurrentStep,
      payload: 1
    });
  }, []);

  return (
    <Theme>
      <C.Container>
        <p className="step">Step 1/5</p>
        <h2>Let's start with your name</h2>
        <p>Fill in the field with your name</p>

        <Input
          label="Your full name"
          placeholder="Anakin Skywalker"
          handleChange={handleNameChange}
          value={name}
          autoFocus={true}
        />
        <Input label="Your position" placeholder="QA Engineer" handleChange={handlePositionChange} value={position} />
        <Input
          label="Your education"
          placeholder="Higher Education in Computer Science and Software Engineering"
          handleChange={handleEducationChange}
          value={education}
        />
        <Input
          label="Language proficiency"
          placeholder="English - B2, French - A2"
          handleChange={handleLanguageProficiencyChange}
        />
        <Input
          label="Domains"
          placeholder="Big Data, Fintech, Social networking, E-commerce"
          handleChange={handleDomainsChange}
        />

        <button onClick={handleNextStep}>Next</button>
      </C.Container>
    </Theme>
  );
};
