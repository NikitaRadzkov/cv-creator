import * as C from './styles';
import { Theme } from '../../components/Theme';
import { Link, useNavigate } from 'react-router-dom';
import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { formState, setCurrentStep } from '../../context/slices/formSlice';

export const Upload: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const state = useAppSelector(formState);
  const { mainPageTitle, mainPageExperience, name } = useAppSelector(formState);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const transformStateToJSON = () => {
    const store = {
      name: state.name.split(' ')[0],
      surname: state.name.split(' ')[1],
      profession: state.position,
      education: state.education,
      languages: state.languages.map(language => {
        return {
          language: language.language,
          level: language.level
        };
      }),
      domains: state.domains,
      mainPageTitle: state.mainPageTitle,
      mainPageExperience: state.mainPageExperience,
      mainDescriptions: state.skills.map(item => {
        return {
          title: item.name,
          description: item.description
        };
      }),
      projects: state.projects.map(item => {
        return {
          title: item.name,
          description: item.description,
          role: item.role,
          period: item.period,
          responsibilities: item.responsibilities.split(';'),
          tools: item.tools
        };
      }),
      skills: state.professionalSkills.map(skill => {
        const tools = state.professionalTools.filter(tool => tool.skillId === skill.id);
        return {
          name: skill.sectionName,
          tools: tools.map(tool => {
            return {
              name: tool.name,
              experience: tool.experience,
              lastUsed: tool.lastUsed
            };
          })
        };
      })
    };

    console.log('Store:', store);

    return store;
  };

  const saveFile = (blob: Blob, fileName: string) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
  };

  const handleNextStep = async () => {
    if (mainPageTitle !== '' && mainPageExperience !== '' && selectedFile) {
      navigate('/step6');
      const formData = new FormData();
      formData.append('file', selectedFile);
      try {
        await fetch(`https://35.228.141.206:8443/`, {
          method: 'GET'
        });

        await fetch(`https://35.228.141.206:8443/uploadPhoto`, {
          method: 'POST',
          body: formData
        });

        const response = await fetch(`https://35.228.141.206:8443/save`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(transformStateToJSON())
        });
        const blob = await response.blob();
        saveFile(blob, `${state.name}.docx`);
      } catch (e) {
        console.error(e);
      }
    } else {
      alert('fill in the data correctly');
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setSelectedFile(file);
  };

  useEffect(() => {
    if (name === '') {
      navigate('/');
    } else {
      dispatch({
        type: setCurrentStep,
        payload: 5
      });
    }
  }, []);

  return (
    <Theme>
      <C.Container>
        <p className="step">Step 5/5</p>
        <h2>Final step.</h2>
        <p>Upload your photo.</p>
        <p className="selected-file">
          {selectedFile === null ? 'File not selected' : `Selected file: ${selectedFile.name}`}
        </p>
        <div className="file-upload">
          <input type="file" id="file-input" name="file-input" onChange={handleFileSelect} />
          <label htmlFor="file-input" className="custom-button">
            Choose File
          </label>
        </div>
        <div>
          <Link to="/step4">Come back</Link>
          <button onClick={handleNextStep}>Finalize</button>
        </div>
      </C.Container>
    </Theme>
  );
};
