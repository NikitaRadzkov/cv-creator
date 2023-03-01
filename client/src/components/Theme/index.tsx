import { FC, ReactNode } from 'react';
import { useAppSelector } from '../../hooks/redux';
import { formState } from '../../context/slices/formSlice';
import { Header } from '../Header';
import { SidebarItem } from '../SidebarItem';
import * as C from './styles';

interface Props {
  children: ReactNode;
}

export const Theme: FC<Props> = ({ children }) => {
  const { currentStep } = useAppSelector(formState);

  return (
    <C.Container>
      <C.Area>
        <Header />

        <C.Steps>
          <C.Sidebar>
            <SidebarItem
              title="Personal"
              description="Identify yourself"
              icon="profile"
              path="/"
              active={currentStep === 1}
            />

            <SidebarItem
              title="About Me"
              description="Describe your experience and amount of experience"
              icon="book"
              path="/step2"
              active={currentStep === 2}
            />
            <SidebarItem
              title="Projects"
              description="Describe your lasts projects"
              icon="project"
              path="/step3"
              active={currentStep === 3}
            />
            <SidebarItem
              title="Professional skills"
              description="Tools that you have used."
              icon="tools"
              path="/step4"
              active={currentStep === 4}
            />
            <SidebarItem
              title="Photo"
              description="Upload photo"
              icon="upload"
              path="/step5"
              active={currentStep === 5}
            />
            <SidebarItem
              title="Concluded"
              description="Success"
              icon="check"
              path="/step6"
              active={currentStep === 6}
            />
          </C.Sidebar>
          <C.Page>{children}</C.Page>
        </C.Steps>
      </C.Area>
    </C.Container>
  );
};
