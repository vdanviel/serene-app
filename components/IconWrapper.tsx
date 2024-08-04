import React from 'react';

interface IconWrapperProps {
  IconComponent: React.ComponentType<any>;
  name: string;
  size?: number;
  color?: string;
}

/*React.FC (Function Component) é um tipo fornecido pelo React para definir componentes funcionais em TypeScript. Ele ajuda a definir a estrutura de um componente funcional e suas props de forma mais clara e segura.*/
const IconWrapper: React.FC<IconWrapperProps> = ({ IconComponent, name = "home", size = 24, color = '#000' }) => {
  return <IconComponent name={name} size={size} color={color} />;
};

export default IconWrapper;