import { Fragment, useState } from "react"
import { Dialog, Menu, Transition } from "@headlessui/react"
import {
  MenuAlt1Icon,
  XIcon,
  TemplateIcon,
  BeakerIcon,
} from "@heroicons/react/outline"
import { ChevronDownIcon } from "@heroicons/react/solid"
import { Link, useLocation, Switch, Route } from "react-router-dom"
import { useSelector } from "react-redux"

import Dashboard from "./Dashboard"
import StatList from "./Dashboard/Stats/StatList"
import StatDetail from "./Dashboard/Stats/StatDetail"
import ShippingConfirmation from "./Dashboard/ShippingConfirmation"

import Reset from "./Reset"
import ResetForm from "./Reset/ResetForm"

import Profile from "../shared/components/Profile"
import UpdateProfile from "../shared/components/Profile/UpdateProfile"
import Settings from "../shared/components/Settings"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

const AcuteNavbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  let location = useLocation()

  const user = useSelector((state) => state.users)

  const handleLinkClick = (name) => {
    setActiveLink(name)
  }


  const navigation = [
      { name: "Dashboard", href: "/", icon: TemplateIcon, current: true },
      { name: "Reset", href: "/reset", icon: BeakerIcon, current: false },
    ]


  const [activeLink, setActiveLink] = useState(navigation[0].name)

  return (
    <div className="h-screen flex bg-gray-100">
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          static
          className="fixed inset-0 flex z-40 lg:hidden"
          open={sidebarOpen}
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-cyan-700">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex-shrink-0 flex items-center px-4">
                <img
                  className="h-16 w-auto"
                  src="https://storage.googleapis.com/parlevelreset/ui_images/nav_logo_skinny.svg"
                  alt="Easywire logo"
                />
              </div>

              <nav
                className="mt-5 h-full divide-y divide-cyan-800"
                aria-label="Sidebar"
              >
                <div className="px-2 space-y-1">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => handleLinkClick(item.name)}
                      className={classNames(
                        location.pathname === item.href
                          ? "bg-cyan-800 text-white"
                          : "text-cyan-100 hover:text-white hover:bg-cyan-600",
                        "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      <item.icon
                        className="mr-4 flex-shrink-0 h-6 w-6 text-cyan-200"
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  ))}
                </div>

              </nav>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14" aria-hidden="true">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-col flex-grow bg-cyan-700 pt-5 pb-4">
            <div className="flex items-center flex-shrink-0 px-4">
              <img
                className="h-16 w-auto"
                src="https://storage.googleapis.com/parlevelreset/ui_images/nav_logo_skinny.svg"
                alt="Easywire logo"
              />
            </div>

            <nav
              className="mt-5 divide-y divide-cyan-100"
              aria-label="Sidebar"
            >
              <div className="px-2 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => handleLinkClick(item.name)}
                    className={classNames(
                      location.pathname === item.href
                        ? "bg-cyan-800 text-white"
                        : "text-cyan-100 hover:text-white hover:bg-cyan-600",
                      "group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    <item.icon
                      className="mr-4 flex-shrink-0 h-6 w-6 text-cyan-200"
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto focus:outline-none">
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:border-none">
          <button
            className="px-4 border-r border-gray-200 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuAlt1Icon className="h-6 w-6" aria-hidden="true" />
          </button>

          {/* Search bar */}
          <div className="flex-1 px-4 flex justify-between sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
            <div className="flex-1 flex">
            </div>

            <div className="ml-4 flex items-center md:ml-6">

              {/* Profile dropdown */}
              <Menu as="div" className="ml-3 relative">
                {({ open }) => (
                  <>
                    <div>
                      <Menu.Button className="max-w-xs bg-white rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 lg:p-2 lg:rounded-md lg:hover:bg-gray-50">
                        <img
                          className="h-8 w-8 rounded-full"
                          // src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          src={user.profile_picture}
                          alt=""
                        />
                        <span className="hidden ml-3 text-gray-700 text-sm font-medium lg:block">
                          <span className="sr-only">Open user menu for </span>
                          {user.first_name} {user.last_name}
                        </span>
                        <ChevronDownIcon
                          className="hidden flex-shrink-0 ml-1 h-5 w-5 text-gray-400 lg:block"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>

                    <Transition
                      show={open}
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items
                        static
                        className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                      >
                        <Menu.Item>
                          <Link
                            to="/profile"
                            onClick={() => setActiveLink("Profile")}
                            className={classNames(
                              location.pathname === "/profile" ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                            )}
                          >
                            Your Profile
                          </Link>
                        </Menu.Item>

                        <Menu.Item>
                          <Link
                            to="/settings"
                            onClick={() => setActiveLink("Settings")}
                            className={classNames(
                              location.pathname === "/settings" ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                            )}
                          >
                            Settings
                          </Link>
                        </Menu.Item>

                        <Menu.Item>
                          <a
                            href="/loggedOut"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                          >
                            Logout
                          </a>
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </>
                )}
              </Menu>
            </div>
          </div>
        </div>

        <main className="pb-8 z-0 ">
          <div className="">
          <Switch>
            <Route exact path={'/'}><Dashboard /></Route>
            <Route exact path={'/viewResets'}><StatList /></Route>
            <Route exact path={'/viewResets/:resetNo'}><StatDetail /></Route>
            <Route exact path={'/confirmation'}><ShippingConfirmation /></Route>
            <Route exact path={'/updateShipping/:shippingId'}><ShippingConfirmation /></Route>

            <Route exact path={'/reset'}><Reset /></Route>
            <Route exact path={'/:weekNo/step1'}><ResetForm /></Route>
            <Route exact path={'/:weekNo/step2'}><ResetForm /></Route>
            <Route exact path={'/:weekNo/step3'}><ResetForm /></Route>
            <Route exact path={'/:weekNo/step4'}><ResetForm /></Route>
            <Route exact path={'/:weekNo/step5'}><ResetForm /></Route>

            <Route exact path={'/profile'}><Profile /></Route>
            <Route exact path={'/settings'}><Settings /></Route>
            <Route exact path={'/profile/:profileId/edit/:key'}><UpdateProfile /></Route>           
          </Switch>
          </div>
        </main>
      </div>
    </div>
  )
}

export default AcuteNavbar