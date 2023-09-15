import styled from "styled-components";
import Avatar from "../common/Avatar";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/user/userSlice";

const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Name = styled.div`
  margin-bottom: 0.5rem;
`;
const Email = styled.div``;

const Profile: React.FC = () => {
  const user = useSelector(selectUser);

  return (
    <ProfileWrapper>
      <Avatar src={user?.photoURL || ""} alt="ProfileImg" />
      <div>
        <Name>{user?.displayName}</Name>
        <Email>{user?.email}</Email>
      </div>
    </ProfileWrapper>
  );
};

export default Profile;
