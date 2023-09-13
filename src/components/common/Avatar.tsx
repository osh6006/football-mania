import styled from "styled-components";

interface AvatarProps {
  src: string;
}

const AvatarWrapper = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 100%;
  background-color: gray;
`;

const Avatar: React.FC<AvatarProps> = () => {
  return <AvatarWrapper />;
};

export default Avatar;
