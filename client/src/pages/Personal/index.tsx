import * as C from './styles';
import { useNavigate } from 'react-router-dom';
import {
  setName,
  setPosition,
  setEducation,
  setCurrentStep,
  setDomains,
  addLanguage,
  removeLanguage,
  updateLanguage
} from '../../context/slices/formSlice';
import { Theme } from '../../components/Theme';
import { ChangeEvent, FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { formState } from '../../context/slices/formSlice';
import { Input } from '../../components/Input';
import { useDebounce } from '../../hooks/debounce';
import { TooltipHandler } from '../../components/TooltipHandler';
import { Select } from '../../components/Select';

export const Personal: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { name, position, education, languages, domains } = useAppSelector(formState);
  const debouncedName = useDebounce<string>(name);
  const debouncedPosition = useDebounce<string>(position);
  const debouncedEducation = useDebounce<string>(education);
  const debouncedDomains = useDebounce<string[]>(domains);

  const options = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

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

  const handleDomainsChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: setDomains,
      payload: e.target.value
    });
  };

  const handleAddLanguage = () => {
    const newLanguage = {
      id: new Date().getTime(),
      language: '',
      level: ''
    };
    dispatch(addLanguage(newLanguage));
  };

  const handleRemoveLanguage = (id: number) => {
    if (languages.length === 1) {
      alert("You can't remove all languages");
    } else {
      dispatch(removeLanguage({ id }));
    }
  };

  const handleChange = (field: string, id: number, value: string) => {
    dispatch(updateLanguage({ id, field, value }));
  };

  const handleNextStep = () => {
    if (name !== '' && position !== '' && education !== '' && domains.length !== 0) {
      navigate('/step2');
    } else {
      alert('Fill all data');
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  useEffect(() => {}, [debouncedName, debouncedPosition, debouncedEducation, debouncedDomains]);

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
        {languages.map(language => (
          <div key={language.id}>
            <TooltipHandler
              className="tooltip-styles"
              handleAdd={handleAddLanguage}
              handleRemove={handleRemoveLanguage}
              item={language}
            />
            <div className="component-wrapper">
              <Input
                label="Language proficiency"
                placeholder="English"
                value={language.language}
                handleChange={e => handleChange('language', language.id, e.target.value)}
              />
              <Select
                options={options}
                value={language.level}
                handleChange={e => handleChange('level', language.id, e.target.value)}
              />
            </div>
          </div>
        ))}
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
