import { useState } from 'react';
import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { logo } from '../assets';
import { links } from '../assets/constants';
import { HiOutlineMenu } from 'react-icons/hi';
import { RiCloseLine } from 'react-icons/ri';
import { useCallback } from 'react';

const NavLinks = memo((props) => {
  const { handleClick } = props;

  return (
    <div className='mt-10'>
      {links.map((link) => (
        <NavLink
          key={link.name}
          to={link.to}
          className='flex flex-row justify-start items-center my-8 text-sm font-medium text-gray-400 hover:text-cyan-400'
          onClick={() => handleClick && handleClick()}
        >
          <link.icon className='w-6 h-6 mr-2' />
          {link?.name}
        </NavLink>
      ))}
    </div>
  );
});

export const Sidebar = memo(() => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileMenuOpen = useCallback((visible) => setMobileMenuOpen(visible), []);

  return (
    <>
      <div className='md:flex hidden flex-col w-[240px] py-10 px-4 bg-[#191624]'>
        <img
          src={logo}
          alt='logo'
          decoding='async'
          loading='lazy'
          className='w-full h-14 object-contain'
        />
        <NavLinks />
      </div>

      {/* Mobile menu side bar */}
      <div className='absolute md:hidden block top-6 right-3'>
        {mobileMenuOpen ? (
          <RiCloseLine
            className='w-6 h-6 text-white mr-2 z-50'
            onClick={() => handleMobileMenuOpen(false)}
          />
        ) : (
          <HiOutlineMenu
            className='w-6 h-6 text-white mr-2 z-50'
            onClick={() => handleMobileMenuOpen(true)}
          />
        )}
      </div>

      <div
        className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483d8b] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${
          mobileMenuOpen ? 'left-0' : '-left-full'
        }`}
      >
        <img
          src={logo}
          alt='logo'
          decoding='async'
          loading='lazy'
          className='w-full h-14 object-contain'
        />
        <NavLinks handleClick={() => handleMobileMenuOpen(false)} />
      </div>
    </>
  );
});
