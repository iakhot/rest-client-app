import NextLink from 'next/link';
import { Link } from '@mui/material';

interface IGetLink {
  link: string;
  name: string;
}

function GetLink({ link, name }: IGetLink) {
  return (
    <Link
      component={NextLink}
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        color: 'inherit',
        textDecoration: 'none',
        fontSize: { xs: '0.9rem', sm: '1rem' },
        '&:hover': { textDecoration: 'underline' },
      }}
    >
      {name}
    </Link>
  );
}

export default GetLink;
