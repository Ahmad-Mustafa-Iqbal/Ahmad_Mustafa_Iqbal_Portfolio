/* ================================================
   Data: Social Links
   Edit this file to add/remove social links
   ================================================ */

import { FaLinkedinIn, FaGithub, FaInstagram, FaFacebookF, FaWhatsapp } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';

const socialLinks = [
  {
    id: 'linkedin',
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/ahmad-mustafa-iqbal/',
    icon: FaLinkedinIn,
  },
  {
    id: 'github',
    label: 'GitHub',
    url: 'https://github.com/Ahmad-Mustafa-Iqbal',
    icon: FaGithub,
  },
  {
    id: 'instagram',
    label: 'Instagram',
    url: 'https://www.instagram.com/i_am_mustafa08/',
    icon: FaInstagram,
  },
  {
    id: 'facebook',
    label: 'Facebook',
    url: 'https://web.facebook.com/mozi.op.09',
    icon: FaFacebookF,
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    url: 'https://wa.me/923357844881',
    icon: FaWhatsapp,
  },
  {
    id: 'email',
    label: 'Email',
    url: 'mailto:ahmadmustafaand@gmail.com',
    icon: HiOutlineMail,
  },
];

export default socialLinks;
