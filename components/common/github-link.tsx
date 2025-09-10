import NextLink from 'next/link';
import { Link } from '@mui/material';

interface IGithubLinkProps {
  link: string;
  name: string;
}

function GithubLink({ link, name }: IGithubLinkProps) {
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

export default GithubLink;
