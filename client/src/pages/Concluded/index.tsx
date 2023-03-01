import * as C from './styles';
import { Theme } from '../../components/Theme';
import { FC, useEffect } from 'react';
import { ReactComponent as CheckIcon } from '../../icons/check.svg';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { formState, setCurrentStep } from '../../context/slices/formSlice';
import { Colors } from '../../shared/colors';

export const Concluded: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { name } = useAppSelector(formState);

  useEffect(() => {
    if (name === '') {
      navigate('/');
    } else {
      dispatch({
        type: setCurrentStep,
        payload: 6
      });
    }
  }, []);

  return (
    <Theme>
      <C.Container>
        <h2>Congratulations</h2>
        <p>You have successfully completed your CV!</p>

        <C.IconArea>
          <CheckIcon fill={Colors.secondary} width={120} height={120} />
        </C.IconArea>

        <p className="wait-loading">Please wait for the resume to load</p>
      </C.Container>
    </Theme>
  );
};
