import React, { useReducer } from 'react'
import { connect } from 'react-redux'
import {
  EuiAvatar,
  EuiHorizontalRule,
  EuiIcon,
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiTitle,
  EuiText
} from '@elastic/eui'
import moment from 'moment'
import heroGirl from "../../assets/img/HeroGirl.svg"
import styled from 'styled-components'

const StyledEuiPage = styled(EuiPage)`
  flex: 1;
`

const StyledEuiPageHeader = styled(EuiPageHeader)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem;

  & h1 {
    font-size: 3.5rem;
  }
`

const StyledEuiPageContentBody = styled(EuiPageContentBody)`
  display: flex;
  flex-direction: column;
  align-items: center;

  & h2 {
    margin-bottom: 1rem;
  }
`

function ProfilePage({ user }) {
  return (
    <StyledEuiPage>
      <EuiPageBody component="section">
        <StyledEuiPageHeader>
          <EuiPageHeaderSection>
            <EuiTitle size="l">
              <h1>Profile</h1>
            </EuiTitle>
          </EuiPageHeaderSection>
        </StyledEuiPageHeader>

        <EuiPageContent verticalPosition="center" horizontalPosition="center">
          <StyledEuiPageContentBody>
            <EuiAvatar 
              size="xl"
              name={user.email}
              initialsLength={2}
              imageUrl={heroGirl}
            />
            <EuiTitle size="l">
              <h2>@{user.email}</h2>
            </EuiTitle>
            <EuiText>
              <p>
                <EuiIcon type="email" /> {user.email}
              </p>
              <p>
                <EuiIcon type="clock" /> member since {moment(user.created_at).format("MMMM Do YYYY")}
              </p>
              <p>
                <EuiIcon type="alert" /> Full name not specified
              </p>
              <EuiHorizontalRule />
              <p>
                <EuiIcon type="quote" /> This user has not written a bio yet
              </p>
            </EuiText>
          </StyledEuiPageContentBody>
        </EuiPageContent>
      </EuiPageBody>
    </StyledEuiPage>
  )
}

export default connect((state) => ({ user: state.auth.user }))(ProfilePage)