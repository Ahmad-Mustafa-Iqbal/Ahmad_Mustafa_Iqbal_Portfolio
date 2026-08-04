/* ================================================
   Data: Social Links
   Edit this file to add/remove social links
   ================================================ */

import { FaLinkedinIn, FaGithub, FaMediumM, FaKaggle } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { SiLeetcode } from 'react-icons/si';

const socialLinks = [
  {
    id: 'linkedin',
    label: 'LinkedIn',
    url: '#',
    icon: FaLinkedinIn,
  },
  {
    id: 'github',
    label: 'GitHub',
    url: '#',
    icon: FaGithub,
  },
  {
    id: 'kaggle',
    label: 'Kaggle',
    url: '#',
    icon: FaKaggle,
  },
  {
    id: 'leetcode',
    label: 'LeetCode',
    url: '#',
    icon: SiLeetcode,
  },
  {
    id: 'medium',
    label: 'Medium',
    url: '#',
    icon: FaMediumM,
  },
  {
    id: 'email',
    label: 'Email',
    url: 'mailto:your.email@example.com',
    icon: HiOutlineMail,
  },
];

export default socialLinks;
