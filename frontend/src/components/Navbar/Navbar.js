import React from "react";
import { connect } from "react-redux";
import { Actions as authActions } from "../../redux/auth";
import {
  EuiAvatar,
  EuiIcon,
  EuiHeader,
  EuiHeaderSection,
  EuiHeaderSectionItem,
  EuiHeaderSectionItemButton,
  EuiHeaderLinks,
  EuiHeaderLink,
  EuiFlexItem,
  EuiFlexGroup,
  EuiLink,
  EuiPopover,
} from "@elastic/eui";
import { Link, useNavigate } from "react-router-dom";
import loginIcon from "../../assets/img/loginIcon.svg";
import styled from "styled-components";

const LogoSection = styled(EuiHeaderLink)`
  padding: 0 2rem;
`;

const AvatarMenu = styled.div`
  display: flex;
  justify-content: space-between;
  min-width: 300px;

  & .avatar-actions {
    margin-left: 2rem;
  }
`;

function Navbar({ user, logUserOut, ...props }) {
  const [avatarMenuOpen, setAvatarMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  const toggleAvatarMenu = () => setAvatarMenuOpen(!avatarMenuOpen);

  const closeAvatarMenu = () => setAvatarMenuOpen(false);

  const handleLogout = () => {
    closeAvatarMenu();
    logUserOut();
    navigate("/");
  };

  const avatarButton = (
    <EuiHeaderSectionItemButton
      aria-label="User avatar"
      onClick={() => user?.email && toggleAvatarMenu()}
    >
      {user?.email ? (
        <EuiAvatar
          size="l"
          name={user.email || "Anonymous"}
          initialsLength={2}
          // imageUrl={user.profile.image}
        />
      ) : (
        <Link to="/login">
          <EuiAvatar
            size="l"
            color="#1E90FF"
            name="user"
            imageUrl={loginIcon}
          />
        </Link>
      )}
    </EuiHeaderSectionItemButton>
  );

  const renderAvatarMenu = () => {
    if (!user) return null;

    return (
      <AvatarMenu>
        <EuiAvatar
          size="xl"
          name={user.email || "Anonymous"}
          initialsLength={2}
          // imageUrl={user.profile.image}
        />
        <EuiFlexGroup direction="column" className="avatar-actions">
          <EuiFlexItem grow={1}>
            <p>{user.email}</p>
          </EuiFlexItem>

          <EuiFlexItem grow={1}>
            <EuiFlexGroup justifyContent="spaceBetween">
              <EuiFlexItem grow={1}>
                <Link to="/profile">Profile</Link>
              </EuiFlexItem>
              <EuiFlexItem grow={1}>
                <EuiLink onClick={() => handleLogout()}>Log out</EuiLink>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlexItem>
        </EuiFlexGroup>
      </AvatarMenu>
    );
  };

  return (
    <EuiHeader style={props.style || {}}>
      <EuiHeaderSection>
        <EuiHeaderSectionItem border="right">
          <LogoSection href="/">
            <EuiIcon type="cloudDrizzle" color="#1E90FF" size="l" /> PLR
          </LogoSection>
        </EuiHeaderSectionItem>
        <EuiHeaderSectionItem border="right">
          <EuiHeaderLinks aria-label="app navigation links">
            <EuiHeaderLink iconType="dashboardApp" href="/dashboard">
              Dashboard
            </EuiHeaderLink>

            <EuiHeaderLink iconType="upgradeAssistantApp" href="#">
              Reset
            </EuiHeaderLink>

            <EuiHeaderLink iconType="visualizeApp" href="/review">
              Review
            </EuiHeaderLink>
          </EuiHeaderLinks>
        </EuiHeaderSectionItem>
      </EuiHeaderSection>

      <EuiHeaderSection>
        <EuiPopover
          id="avatar-menu"
          ownFocus
          isOpen={avatarMenuOpen}
          closePopover={closeAvatarMenu}
          anchorPosition="downLeft"
          button={avatarButton}
          panelPaddingSize="l"
        >
          {renderAvatarMenu()}
        </EuiPopover>
      </EuiHeaderSection>
    </EuiHeader>
  );
}

export default connect((state) => ({ user: state.auth.user }), {
  logUserOut: authActions.logUserOut,
})(Navbar);
