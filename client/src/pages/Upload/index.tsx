import * as C from './styles';
import { Theme } from '../../components/Theme';
import { Link, useNavigate } from 'react-router-dom';
import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { formState, setCurrentStep } from '../../context/slices/formSlice';

export const Upload: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { mainPageTitle, mainPageExperience, name } = useAppSelector(formState);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleNextStep = () => {
    if (mainPageTitle !== '' && mainPageExperience !== '') {
      navigate('/step6');
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
