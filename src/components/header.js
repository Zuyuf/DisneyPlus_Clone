import styled from "styled-components";
import { auth, provider } from "../firebase";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";

import { 
   selectUserName, 
   selectUserPhoto, 
   setSignOutState, 
   setUserLoginDetails,
} from "../features/user/userSlice"

//

const Header = (props) => {
   const dispatch = useDispatch();
   const history = useHistory();
   const userName = useSelector(selectUserName);
   const userPhoto = useSelector(selectUserPhoto);

   useEffect(() => {
      auth.onAuthStateChanged(async (user) => {
         if(user) {
            setUser(user);
            history.push("/home");
         }
      })
   }, [userName])

   const handleAuth = () => {
      if (!userName) {
         auth.signInWithPopup(provider)
         .then((result) => {
            console.log(result);
            setUser(result.user);
         })
         .catch((error) => {
            console.log(error)
            alert(error.message)
         })
      }
      else if (userName) {
         auth.signOut()
            .then(() => {
               dispatch(setSignOutState())
               history.push("/")
            })
            .catch(error => alert(error.message)) 
      }
   };

   const setUser = (user) => {
      dispatch(
         setUserLoginDetails({
            name: user.displayName,
            email: user.email,
            photo: user.photoURL
         })
      )
   }

   return  (
      <Nav>
         <Logo>
            <img src="/images/logo.svg" alt="Disney+" />
         </Logo>
         { !userName ? <Login onClick={handleAuth}>Login</Login> 
                     : <>

            <NavMenu>
               <a href= "/home">
                  <img src="/images/home-icon.svg" alt="HOME" />
                  <span>HOME</span>
               </a>
               <a href= "/">
                  <img src="/images/search-icon.svg" alt="SEARCH" />
                  <span>SEARCH</span>
               </a>
               <a href= "/">
                  <img src="/images/watchlist-icon.svg" alt="WATCHLIST" />
                  <span>WATCHLIST</span>
               </a>
               <a href= "/">
                  <img src="/images/original-icon.svg" alt="ORIGINALS" />
                  <span>ORIGINALS</span>
               </a>
               <a href= "/">
                  <img src="/images/movie-icon.svg" alt="MOVIES" />
                  <span>MOVIES</span>
               </a>
               <a href= "/">
                  <img src="/images/series-icon.svg" alt="SERIES" />
                  <span>SERIES</span>
               </a>
            </NavMenu>
            <SignOut>
               <UserImg src={userPhoto} alt={userName} />
               <DropDown>
                  <span onClick={handleAuth}>SignOut</span>
               </DropDown>
            </SignOut>
         </>
         }
      </Nav>
   )
};

const Nav = styled.nav`
   position: fixed;
   top: 0;
   left: 0; 
   right: 0;

   height: 70px;
   background-color: #090b13;

   display: flex;
   justify-content: space-between;
   align-items: center;
   padding: 0 36px;

   letter-spacing: 10px;
   z-index: 3;
`;

const Logo = styled.a`
   padding: 0;
   margin-top: 4px;

   width: 80px;
   max-height: 70px;

   display: inline-block;

   img {
      display: block;
      width: 100%;
   }
`;

const NavMenu = styled.div`
   display: flex;
   align-items: center;
   flex-flow: row nowrap;
   height: 100%;
   justify-content: flex-end;

   position: relative;
   margin-left: 25px;
   margin-right: auto;

   a {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 12px;
      cursor: pointer;

      img {
         height: 20px;
         min-width: 20px;
         width: 20px;
         z-index: auto;
         margin-right: 6px;
         margin-top: auto;
         margin-bottom: auto;
      }

      span {
         color: rgb(249, 249, 249);
         font-size: 13px;
         letter-spacing: 2px;
         line-height: 1.08;
         margin-top: auto;
         margin-bottom: auto;
         white-space: nowrap;
         position: relative;

         &::before {
            content: '';
            position: absolute;
            left: 0px;
            right: 0px;

            background-color: rgb(249, 249, 249);
            border-radius: 0px 0px 4px 4px;
            bottom: -6px;
            height: 2px;

            transform-origin: left center;
            transform: scaleX(0);
            transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;

            opacity: 0;
            visibility: hidden;
            width: auto;
         }
      }

      &:hover {
         span::before {
            transform: scaleX(1);
            visibility: visible;
            opacity: 1 !important;
         }
      }
   }


   @media (max-width: 768px) {
      display: none;
   }
`;

const Login = styled.a`
   background-color: rgba(0, 0, 0, 0.6);
   padding: 8px 16px;
   text-transform: uppercase;
   letter-spacing: 2px;
   cursor: pointer;

   border: 1px solid #f9f9f9;
   border-radius: 4px;

   transition: all 0.2s ease 0s;

   &:hover {
      background-color: #f9f9f9;
      color: #000;
      border-color: transparent;
   }
`;

const UserImg = styled.img`
   height: 100%;
`;

const DropDown = styled.div`
   position: absolute;
   top: 48px;
   right: 0;
   background: rgb(19, 19, 19);

   border: 1px solid rgba(151, 151, 151, 0.34);
   border-radius: 4px;
   box-shadow: rgba(0 0 0 / 50%) 0px 0px 18px 0px;

   padding: 10px;
   font-size: 14px;
   letter-spacing: 3px;
   width: 100px;
   opacity: 0;
`;

const SignOut = styled.div`
   position: relative;
   height: 48px;
   width: 48px;

   display: flex;
   cursor: pointer;
   align-items: center;
   justify-content: center;

   ${UserImg} {
      border-radius: 50%;
      width: 100%;
      height: 100%;
   }

   &:hover {
      ${DropDown} {
         opacity: 1;
         transition-duration: 1s;
      }
   }
`;



//

export default Header;