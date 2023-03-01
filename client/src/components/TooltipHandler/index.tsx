import { FC } from 'react';
import * as C from './styles';
import { ReactComponent as PlusIcon } from '../../icons/plus.svg';
import { ReactComponent as CloseIcon } from '../../icons/close.svg';

interface ISkillHandlerProps {
  handleAdd: () => void | ((id: number) => void);
  handleRemove: (id: number) => void;
  item: {
    id: number;
  };
  className?: string;
}

export const TooltipHandler: FC<ISkillHandlerProps> = ({ handleAdd, handleRemove, item, className }) => {
  return (
    <C.Container className={className}>
      <PlusIcon className="component-handler-icon" onClick={handleAdd} />
      <CloseIcon className="component-handler-icon" onClick={() => handleRemove(item.id)} />
    </C.Container>
  );
};
