import * as C from './styles';
import { Theme } from '../../components/Theme';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  formState,
  addProfessionalTool,
  removeProfessionalTool,
  updateProfessionalTool,
  addProfessionalSkill,
  removeProfessionalSkill,
  updateProfessionalSkill,
  setCurrentStep
} from '../../context/slices/formSlice';
import { Input } from '../../components/Input';
import { TooltipHandler } from '../../components/TooltipHandler';
import { ReactComponent as UpIcon } from '../../icons/up.svg';
import { ReactComponent as DownIcon } from '../../icons/down.svg';
import { Colors } from '../../shared/colors';

export const Tools = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { professionalTools, professionalSkills, name } = useAppSelector(formState);
  const [hovered, setHovered] = useState(0);
  const [active, setActive] = useState(1);

  const handleClick = (index: number) => {
    if (index === active) {
      setActive(0);
    } else {
      setActive(index);
    }
  };

  const handleNextStep = () => {
    if (professionalSkills.length < 0) {
      navigate('/step5');
    } else {
      alert('fill in the data correctly');
    }
  };

  useEffect(() => {
    if (name === '') {
      navigate('/');
    } else {
      dispatch({
        type: setCurrentStep,
        payload: 4
      });
    }
  }, []);

  const handleAddProfessionalTool = (skillId: number) => {
    const professionalTool = {
      id: new Date().getTime(),
      skillId,
      name: '',
      experience: '',
      lastUsed: ''
    };
    dispatch(addProfessionalTool(professionalTool));
  };

  const handleAddProfessionalSkill = () => {
    const professionalSkill = {
      id: new Date().getTime(),
      sectionName: ''
    };

    setActive(professionalSkill.id);
    handleAddProfessionalTool(professionalSkill.id);
    dispatch(addProfessionalSkill(professionalSkill));
  };

  const handleRemoveProfessionalSkill = (id: number) => {
    if (professionalSkills.length === 1) {
      alert("You can't remove all skills");
    } else {
      dispatch(removeProfessionalSkill({ id }));
    }
  };

  const handleRemoveProfessionalTool = (id: number) => {
    if (professionalTools.length === 1) {
      alert("You can't remove all skills");
    } else {
      dispatch(removeProfessionalTool({ id }));
    }
  };

  const handleChangeProfessionalTool = (field: string, id: number, value: string) => {
    dispatch(updateProfessionalTool({ id, field, value }));
  };

  const handleChangeProfessionalSkill = (field: string, id: number, value: string) => {
    dispatch(updateProfessionalSkill({ id, field, value }));
  };

  return (
    <Theme>
      <C.Container>
        <p className="step">Step 4/5</p>
        <h2>Nice {name}, describe your professional skills</h2>
        <p>Fill in your professional skills and tools that you have used.</p>
        {professionalSkills.map(professionalSkill => (
          <div key={professionalSkill.id}>
            <TooltipHandler
              handleAdd={handleAddProfessionalSkill}
              handleRemove={() => handleRemoveProfessionalSkill(professionalSkill.id)}
              item={professionalSkill}
              className="section-tooltip"
            />
            <div className="section-wrapper">
              <Input
                className="section-input"
                label="Section name"
                placeholder="Operating system"
                handleChange={e => handleChangeProfessionalSkill('sectionName', professionalSkill.id, e.target.value)}
                autoFocus={true}
              />
              <div className="section-icons-wrapper" onClick={() => handleClick(professionalSkill.id)}>
                {active === professionalSkill.id && <DownIcon fill={Colors.primary} width={50} height={50} />}
                {active !== professionalSkill.id && <UpIcon fill={Colors.primary} width={50} height={50} />}
              </div>
            </div>

            {active === professionalSkill.id && (
              <div>
                {professionalTools
                  .filter(professionalTool => professionalTool.skillId === professionalSkill.id)
                  .map(professionalTool => (
                    <div
                      key={professionalTool.id}
                      onMouseEnter={() => setHovered(professionalTool.id)}
                      onMouseLeave={() => setHovered(0)}
                    >
                      {hovered === professionalTool.id && (
                        <TooltipHandler
                          handleAdd={() => handleAddProfessionalTool(professionalSkill.id)}
                          handleRemove={() => handleRemoveProfessionalTool(professionalTool.id)}
                          item={professionalTool}
                          className="tools-tooltip"
                        />
                      )}
                      <div className="input-wrapper">
                        <Input
                          label="Tool name"
                          placeholder="MS Windows"
                          handleChange={e => handleChangeProfessionalTool('name', professionalTool.id, e.target.value)}
                        />
                        <Input
                          label="Experience in years"
                          placeholder="10"
                          handleChange={e =>
                            handleChangeProfessionalTool('experience', professionalTool.id, e.target.value)
                          }
                        />
                        <Input
                          label="Last used"
                          placeholder="2023"
                          handleChange={e =>
                            handleChangeProfessionalTool('lastUsed', professionalTool.id, e.target.value)
                          }
                        />
                      </div>
                    </div>
                  ))}
                <hr className="component-line" />
              </div>
            )}
          </div>
        ))}

        <div className="component-footer">
          <Link to="/step3">Come back</Link>
          <button onClick={handleNextStep}>Next</button>
        </div>
      </C.Container>
    </Theme>
  );
};
