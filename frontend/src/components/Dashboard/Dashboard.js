import React from "react";

import {
  EuiPage,
  EuiPageContent,
  EuiEmptyPrompt,
  EuiPageSideBar,
  EuiPageBody,
  EuiSideNav,
  EuiPageHeader,
} from "@elastic/eui";

export default function Dashboard() {
  const [isSideNavOpenOnMobile, setisSideNavOpenOnMobile] =
    React.useState(false);

  const toggleOpenOnMobile = () => {
    setisSideNavOpenOnMobile(!isSideNavOpenOnMobile);
  };

  const sideNav = [
    {
      name: "PLR",
      id: 0,
      items: [
        {
          name: "Dashboard",
          id: 1,
          onClick: () => {},
        },
        {
          name: "Reset",
          id: 2,
          onClick: () => {},
        },
        {
          name: "Review",
          id: 3,
          onClick: () => {},
        },
      ],
    },
  ];

  return (
    <EuiPage paddingSize="none">
      <EuiPageSideBar paddingSize="l" sticky>
        <EuiSideNav
          aria-label="PLR Sidenav"
          mobileTitle="Navigate within PLR"
          toggleOpenOnMobile={() => toggleOpenOnMobile()}
          style={{ width: 192 }}
          items={sideNav}
        />
      </EuiPageSideBar>

      <EuiPageBody panelled>
        <EuiPageHeader 
          restrictWidth
          iconType="tear"
          pageTitle="Dashboard"
        />
        <EuiPageContent
          verticalPosition="center"
          horizontalPosition="center"
          paddingSize="none"
          color="subdued"
          hasShadow={false}
        >
          <h1>Yooo</h1>
        </EuiPageContent>
      </EuiPageBody>
    </EuiPage>
  );
}
