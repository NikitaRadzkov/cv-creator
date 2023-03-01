import { FC } from 'react';
import * as C from './styles';
import { Link } from 'react-router-dom';
import { ReactComponent as ProfileIcon } from '../../icons/profile.svg';
import { ReactComponent as BookIcon } from '../../icons/book.svg';
import { ReactComponent as ToolsIcon } from '../../icons/tools.svg';
import { ReactComponent as CheckIcon } from '../../icons/check.svg';
import { ReactComponent as ProjectIcon } from '../../icons/project.svg';
import { ReactComponent as UploadIcon } from '../../icons/upload.svg';

interface Props {
  title: string;
  description: string;
  icon: string;
  path: string;
  active: boolean;
}

export const SidebarItem: FC<Props> = ({ title, description, icon, path, active }) => {
  return (
    <C.Container>
      <Link to={path}>
        <C.Info>
          <C.Title>{title}</C.Title>
          <C.Description>{description}</C.Description>
        </C.Info>
        <C.IconArea active={active}>
          {icon === 'profile' && <ProfileIcon fill="white" width={24} height={24} />}
          {icon === 'book' && <BookIcon fill="white" width={24} height={24} />}
          {icon === 'tools' && <ToolsIcon fill="white" width={24} height={24} />}
          {icon === 'check' && <CheckIcon fill="white" width={24} height={24} />}
          {icon === 'project' && <ProjectIcon fill="white" width={24} height={24} />}
          {icon === 'upload' && <UploadIcon fill="white" width={24} height={24} />}
        </C.IconArea>
        <C.Point active={active}></C.Point>
      </Link>
    </C.Container>
  );
};
