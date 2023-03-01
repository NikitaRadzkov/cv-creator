import * as C from './styles';
import { Theme } from '../../components/Theme';
import { Link, useNavigate } from 'react-router-dom';
import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { formState, setCurrentStep, addProject, removeProject, updateProject } from '../../context/slices/formSlice';
import { Input } from '../../components/Input';
import { TooltipHandler } from '../../components/TooltipHandler';

export const Projects: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { name, projects } = useAppSelector(formState);
  const [hoveredProjectId, setHoveredProjectId] = useState(0);

  const handleNextStep = () => {
    if (projects.length !== 0) {
      navigate('/step4');
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
        payload: 3
      });
    }
  }, []);

  const handleAddProject = () => {
    const newProject = {
      id: new Date().getTime(),
      name: '',
      description: '',
      role: '',
      period: '',
      responsibilities: ''
    };
    dispatch(addProject(newProject));
  };

  const handleRemoveProject = (id: number) => {
    if (projects.length === 1) {
      alert("You can't remove all projects");
    } else {
      dispatch(removeProject({ id }));
    }
  };

  const handleChange = (field: string, id: number, value: string) => {
    dispatch(updateProject({ id, field, value }));
  };

  return (
    <Theme>
      <C.Container>
        <p className="step">Step 3/5</p>
        <h2>Nice {name}, describe your previous projects</h2>
        <p>
          Provide the project name, description, your position, how long you worked on the project, your
          responsibilities, and any accomplishments.
        </p>
        {projects.map(project => (
          <div
            key={project.id}
            onMouseEnter={() => setHoveredProjectId(project.id)}
            onMouseLeave={() => setHoveredProjectId(0)}
          >
            {hoveredProjectId === project.id && (
              <TooltipHandler
                className="tooltip-styles"
                handleAdd={handleAddProject}
                handleRemove={handleRemoveProject}
                item={project}
              />
            )}
            <div className="component-wrapper">
              <div className="component-wrapper-left">
                <Input
                  label="Project name"
                  value={project.name}
                  placeholder="Facebook"
                  autoFocus={true}
                  className="component-wrapper-project-name"
                  handleChange={e => handleChange('name', project.id, e.target.value)}
                />
                <label>Project descriptions</label>
                <textarea
                  // eslint-disable-next-line max-len
                  placeholder="Facebook, Inc. is an American social media and technology company based in Menlo Park, California."
                  value={project.description}
                  onChange={e => handleChange('description', project.id, e.target.value)}
                />
              </div>
              <div className="component-wrapper-right">
                <Input
                  label="Project role"
                  value={project.role}
                  placeholder="QA Automation Engineer"
                  autoFocus={true}
                  handleChange={e => handleChange('role', project.id, e.target.value)}
                />
                <Input
                  label="Period"
                  value={project.period}
                  placeholder="03.2022 - till now"
                  className="component-wrapper-period"
                  autoFocus={true}
                  handleChange={e => handleChange('period', project.id, e.target.value)}
                />
                <label>Responsibilities & achievements</label>
                <textarea
                  // eslint-disable-next-line max-len
                  placeholder="Determination of levels and types of testing,  choosing methodologies  and approaches for testing;"
                  value={project.responsibilities}
                  onChange={e => handleChange('responsibilities', project.id, e.target.value)}
                />
              </div>
            </div>
            <hr className="component-line" />
          </div>
        ))}
        <div className="component-footer">
          <Link to="/step2">Come back</Link>
          <button onClick={handleNextStep}>Next</button>
        </div>
      </C.Container>
    </Theme>
  );
};
