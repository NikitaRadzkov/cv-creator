import * as C from './styles';
import { Theme } from '../../components/Theme';
import { Link, useNavigate } from 'react-router-dom';
import { ChangeEvent, FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  addSkill,
  formState,
  removeSkill,
  setCurrentStep,
  setMainPageExperience,
  setMainPageTitle,
  updateSkill
} from '../../context/slices/formSlice';
import { Input } from '../../components/Input';
import { useDebounce } from '../../hooks/debounce';
import { TooltipHandler } from '../../components/TooltipHandler';

export const AboutMe: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { mainPageTitle, mainPageExperience, name, skills } = useAppSelector(formState);
  const debouncedMainPageTitle = useDebounce<string>(mainPageTitle);
  const debouncedMainPageExperience = useDebounce<string>(mainPageExperience);

  const handleNextStep = () => {
    if (mainPageTitle !== '' && mainPageExperience !== '') {
      navigate('/step3');
    } else {
      alert('fill in the data correctly');
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  useEffect(() => {}, [debouncedMainPageTitle, debouncedMainPageExperience]);

  useEffect(() => {
    if (name === '') {
      navigate('/');
    } else {
      dispatch({
        type: setCurrentStep,
        payload: 2
      });
    }
  }, []);

  const handleMainPageTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: setMainPageTitle,
      payload: e.target.value
    });
  };

  const handleMainPageExperienceChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({
      type: setMainPageExperience,
      payload: e.target.value
    });
  };

  const handleAddSkill = () => {
    const newSkill = {
      id: new Date().getTime(),
      name: '',
      description: ''
    };
    dispatch(addSkill(newSkill));

    console.log('test');
  };

  const handleRemoveSkill = (id: number) => {
    if (skills.length === 1) {
      alert("You can't remove all skills");
    } else {
      dispatch(removeSkill({ id }));
    }
  };

  const handleChange = (field: string, id: number, value: string) => {
    dispatch(updateSkill({ id, field, value }));
  };

  return (
    <Theme>
      <C.Container>
        <p className="step">Step 2/5</p>
        <h2>Nice {name}, what is your experience?</h2>
        <p>Describe your experience and amount of experience.</p>
        <Input
          label="Role and experience"
          value={mainPageTitle}
          placeholder="QA Engineer with 5 years of experience."
          autoFocus={true}
          handleChange={handleMainPageTitleChange}
        />
        <label className="project-descriptions-label">Project descriptions</label>
        <textarea
          placeholder="Highly skilled and motivated AQA specialist..."
          value={mainPageExperience}
          onChange={handleMainPageExperienceChange}
        />
        {skills.map(skill => (
          <div key={skill.id}>
            <TooltipHandler handleAdd={handleAddSkill} handleRemove={handleRemoveSkill} item={skill} />
            <div className="component-wrapper">
              <Input
                label="Skill name"
                value={skill.name}
                placeholder="Project Tools"
                autoFocus={true}
                className="component-wrapper-project-name"
                handleChange={e => handleChange('name', skill.id, e.target.value)}
              />
              <Input
                label="Skill description"
                value={skill.description}
                placeholder="Jira, Centerpoint, Unity, Trello, Miro, Slack, Teams, Skype"
                className="component-wrapper-project-name"
                handleChange={e => handleChange('description', skill.id, e.target.value)}
              />
            </div>
            <hr className="component-line" />
          </div>
        ))}
        <div className="component-footer">
          <Link to="/">Come back</Link>
          <button onClick={handleNextStep}>Next</button>
        </div>
      </C.Container>
    </Theme>
  );
};
