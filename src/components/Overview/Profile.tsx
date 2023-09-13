import styled from "styled-components";
import Avatar from "../common/Avatar";

interface ProfileProps {
  name: string;
  email: string;
}

const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Name = styled.div`
  margin-bottom: 0.5rem;
`;
const Email = styled.div``;

const Profile: React.FC<ProfileProps> = ({ name, email }) => {
  return (
    <ProfileWrapper>
      <Avatar src="asdf" />
      <div>
        <Name>{name}</Name>
        <Email>{email}</Email>
      </div>
    </ProfileWrapper>
  );
};

export default Profile;
