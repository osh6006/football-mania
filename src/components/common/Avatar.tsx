import styled from "styled-components";

interface AvatarProps {
  src: string;
  alt: string;
}

const AvatarImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 100%;
`;

const Avatar: React.FC<AvatarProps> = ({ src, alt }) => {
  return <AvatarImg src={src} alt={alt} />;
};

export default Avatar;
