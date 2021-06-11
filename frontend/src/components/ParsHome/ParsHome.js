import React from 'react'
import { connect } from 'react-redux'

import {
  EuiPage,
  EuiPageBody,
  EuiPageHeader,
  EuiPageContent,
  EuiPageContentBody
} from '@elastic/eui'

function ParsHome({ user }) {
  return (
    <EuiPage paddingSize="none">
      <EuiPageBody>
        <EuiPageHeader 
          restrictWidth
          iconType="logoElastic"
          pageTitle="Page Title"
          paddingSize="l"
        />
        <EuiPageContent
          borderRadius="none"
          hasShadow={false}
          style={{ display: 'flex' }}
        >
          <EuiPageContentBody>
          </EuiPageContentBody>
        </EuiPageContent>
      </EuiPageBody>
    </EuiPage>
  )
}

export default connect((state) => ({ user: state.auth.user }))(ParsHome)