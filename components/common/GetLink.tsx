import Link from '@mui/material/Link';
import NextLink from 'next/link';

interface IGetLink {
  link: string;
  name: string;
  newTab?: boolean;
}

function GetLink({ link, name, newTab }: IGetLink) {
  return (
    <Link
      component={NextLink}
      variant="body2"
      href={link}
      target={newTab ? '_blank' : undefined}
      rel="noopener noreferrer"
      sx={{
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
