import React from 'react';
import Svg, {Path} from 'react-native-svg';

interface IconsProps {
  height?: string;
  width?: string;
  className?: string;
}

export const LogoutIcon: React.FC<IconsProps> = ({
  height = '1em',
  width = '1em',
  className,
}) => {
  return (
    <Svg
      height={height}
      width={width}
      viewBox="0 0 24 24"
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0">
      <Path d="M5 22C4.44772 22 4 21.5523 4 21V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V6H18V4H6V20H18V18H20V21C20 21.5523 19.5523 22 19 22H5ZM18 16V13H11V11H18V8L23 12L18 16Z" />
    </Svg>
  );
};
