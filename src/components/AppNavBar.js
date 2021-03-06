import { Fragment } from 'react'

import {  NavLink, Link } from 'react-router-dom';
import {  Nav } from 'react-bootstrap'
import { Route } from 'react-router-dom';
import MetaData from './layout/MetaData';




import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { logout } from '../actions/userActions';
import { toggleCart } from '../actions/cartActions';
import Search from './layout/Search';
// import ProductCart from './ProductCart'


//IMPORT PICTURE
import Logo from './../images/logo.png';
import LogoName from './../images/logo-name.png';
import NoAvatar from '../images/no-img-avatar.png'

//ICON
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MenuIcon, XIcon, SearchIcon, ShoppingCartIcon } from '@heroicons/react/outline'
// import { TOGGLE_CART_OVERLAY } from '../constants/cartConstants';


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function AppNavBar() {
  document.title = "Zuittzu | Your Friendly Pet Food Shop"
  const alert = useAlert();
  const dispatch = useDispatch();

  const { user, loading } = useSelector(state => state.auth );
  const { cartItems } = useSelector(state => state.cart);

  const handleLogout = () => {
    dispatch(logout());
    alert.success('Logged out successfully.');
  }

  return (
    <Fragment>
    <Disclosure as="nav" className="color">
      {({ open }) => (
        <>
          <div className="cus-nav max-w-full mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">

              {/*START*/}
              <div className="flex items-center">
                <div className="flex-shrink-0 flex items-center">
                  <Link to="/">
                   <img
                      className="block h-8 w-8"
                      src={Logo}
                      alt="Zuittzu"
                    />
                  </Link>
                  <Link>
                    <img
                      className="hidden lg:block h-8 w-auto"
                      src={LogoName}
                      alt="Zuittzu"
                    />
                  </Link>
                </div>
                <div className="hidden md:block">
                  <div className="ml-5 flex items-baseline space-x-4">
                      <Nav.Link as={NavLink} to="/" id="navlink-home" className="cus-navlink px-3 py-2 rounded-md font-medium ">
                              Home
                      </Nav.Link>

                      <Nav.Link as={NavLink} to="/products" id="navlink-products" className="cus-navlink px-3 py-2 rounded-md font-medium">
                        
                       Products

                      </Nav.Link>

                      <Nav.Link as={NavLink} to="/about" id="navlink-about" className="cus-navlink px-3 py-2 rounded-md font-medium">
                        
                        About

                      </Nav.Link >



                      <Route id="search" render={({ history }) => <Search history={history} />} />

                  </div>
                </div>
              </div>
                {/*END*/}

                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                    
                  <Nav.Link

                      id="navlink-cart"
                      as={NavLink}
                      to="#"
                      onClick={() => dispatch(toggleCart())}
                      className=" p-1 rounded-full  d-flex cus-navlink"
                    >

                      <button class="  text-white position-relative">
                        <span className="sr-only">View Cart</span>
                        <ShoppingCartIcon id="cus-iconCart" className=" h-6 w-6" aria-hidden="true" />
                        { cartItems.length > 0 &&
                          <span className="position-absolute top-0 start-0 translate-middle badge rounded-pill bg-danger">
                          { cartItems.reduce((sum, item) => (sum + item.quantity), 0) }
                          </span>
                        }
                        {/* <span class="position-absolute top-0 start-0 translate-middle badge rounded-pill bg-danger">
                          { ( !cartItems.length ) ? 0
                            : cartItems.reduce((sum, item) => (sum + item.quantity), 0) }
                          <span className="sr-only">View Order</span>
                        </span> */}
                      </button>
                    </Nav.Link>

                    

                    {/* Profile dropdown */}
                     {
                  !user ? (
                    <Fragment>
                      <Nav.Link as={NavLink} to="/login" id="navlink-login" className="cus-navlink px-3 py-2 rounded-md font-medium  ">
                        Login
                      </Nav.Link>

                      <Nav.Link as={NavLink} to="/register" id="navlink-signin" className="cus-navlink px-3 py-2 rounded-md font-medium   ">
                        Sign up
                      </Nav.Link>
                    </Fragment>
                  ) : (
                    <Menu as="div" className="ml-3 relative">
                      <div>
                          {/* PROFILE PIC with Dropdown menu*/}
                          <Menu.Button  className=" flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full"
                              src={user.avatar.url !== 'x' && user.avatar.url || NoAvatar}
                              alt="Avatar"
                            />
                          </Menu.Button>
                      </div>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="z-10 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">

                        {
                          user && user.isAdmin ? (

                            <Menu.Item>
                              {({ active }) => (
                              
                                  <Nav.Link 
                                      as={NavLink}
                                      to="/admin/dashboard"
                                      className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-dark')}>
                                      Admin Dashboard
                                  </Nav.Link>
                            
                              )}

                            </Menu.Item>

                          ) : (
                            <Menu.Item>

                                {({ active }) => (

                                  <Nav.Link 
                                      as={NavLink}
                                      to="/orders/me"
                                      className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-dark')}>
                                      My Orders
                                  </Nav.Link>


                                )}

                              </Menu.Item>
                          )
                        }
                        
                          <Menu.Item>

                            {({ active }) => (

                              <Nav.Link 
                                    as={NavLink}
                                    to="/me"
                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-dark')}>
                                    Profile
                              </Nav.Link>

                            )}

                          </Menu.Item>

                          <Menu.Item>

                          {({ active }) => (

                            <Nav.Link 
                                  as={NavLink}
                                  to="/"
                                  className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-dark')}
                                  onClick={handleLogout}>
                                  Sign out
                            </Nav.Link>

                          )}

                        </Menu.Item>

                      </Menu.Items>
                    </Transition>
                  </Menu>
                  )
                }

                  </div>
                </div>

                <div className="flex md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-500 focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>

            </div>
          </div>

          
             <Disclosure.Panel className="md:hidden">  

                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">

                 <Fragment>
                    <Nav.Link as={NavLink} to="/" className="px-3 py-2 rounded-md font-medium text-gray-100 ">
                      Home
                    </Nav.Link>


                    <Nav.Link as={NavLink} to="/products" className="px-3 py-2 rounded-md font-medium text-gray-100   ">
                      
                      Products

                    </Nav.Link>

                    <Nav.Link as={NavLink} to="/about" className="px-3 py-2 rounded-md font-medium text-gray-100  ">
                      
                      About Zuittzu

                    </Nav.Link>


                   
                  </Fragment>



                  {
                    ! user? 

                      (
                          
                          <div className="flex">
                            <Nav.Link as={NavLink} to="/login" className="px-3 py-2 rounded-md font-medium text-gray-100  ">
                              Login
                            </Nav.Link>
                            <Link to="#!" className="px-3 py-2 rounded-md font-medium text-gray-400  ">
                              /
                            </Link>
                            <Nav.Link as={NavLink} to="/register" className="px-3 py-2 rounded-md font-medium text-gray-100  ">
                              Sign up
                            </Nav.Link>
                          </div>


                      ):null}
                      
                      <Route render={({ history })  => <Search history={history} />} />
                      
                      {
                        user && 

                       <div>
                           
                          <div className="pt-4 pb-3  border-gray-700">
                             
                            <div className="flex items-center px-5">

                                <div className="flex-shrink-0">
                                   <img className="h-10 w-10 rounded-full" src={user.avatar.url !== 'x' && user.avatar.url || NoAvatar}  alt="" /> {/*INSERT PICTURE HERE*/}
                                </div>

                                <div className="ml-3">

                                   <div className="text-base font-medium leading-none text-white">{ user.firstName }</div>
                                   <div className="text-sm font-medium leading-none text-gray-400">{ user.email }</div>

                                </div>

                           
                                <Nav.Link

                                  id="navlink-cart"
                                  as={NavLink}
                                  to="#!"
                                  onClick={() => dispatch(toggleCart())}

                                  className=" p-1 rounded-full cus-navlink"
                                >
                                  <button class=" text-white position-relative">
                                    <ShoppingCartIcon id="cus-iconCart" className=" h-6 w-6" aria-hidden="true" />
                                      {( cartItems.length > 0 ) && 
                                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                      { cartItems.reduce((sum, item) => (sum + item.quantity), 0) }
                                      <span className="sr-only">View Order</span>
                                    </span>}
                                  </button>
                                </Nav.Link>

                            </div>

                             <div className="mt-3 px-2 space-y-1">

                               { user && user.isAdmin ? 
                                  <Nav.Link 
                                    as={NavLink}
                                    to="/admin/dashboard"
                                    className="px-3 py-2 rounded-md font-medium text-gray-100 hover:bg-blue-300">
                                        Admin Dashboard
                                  </Nav.Link>
                                  : 
                                  <Nav.Link 
                                    as={NavLink}
                                    to="/orders/me"
                                    className="px-3 py-2 rounded-md font-medium text-gray-100 hover:bg-blue-300">
                                        My Orders
                                  </Nav.Link>
                               }


                                 <Nav.Link 

                                   id="nav-link-profile"
                                   as={NavLink}

                                   to="/me"
                                   className="px-3 py-2 rounded-md font-medium text-gray-100 hover:bg-blue-300">
                                      Profile

                                </Nav.Link>

                                 <Nav.Link 
                                   id="navlink-signout"
                                   as={NavLink}

                                   to="/logout"
                                   className="px-3 py-2 rounded-md font-medium text-gray-100 hover:bg-blue-300">

                                    Sign out
                                </Nav.Link>
                                  
                            </div>
                         
                         </div>
                       </div>
                  }
                </div>

             </Disclosure.Panel>
          
         
        </>
      )}
    </Disclosure>
    </Fragment>
    
  )
}
