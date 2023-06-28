import { Button, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { useDispatch } from 'react-redux';
import { changeTheme } from 'redux/theme/slice';
import { lightTheme } from 'styles';
import mainBg from '../../shared/images/bg.png';

const StyledHomeContainer = styled('div')({
  backgroundImage: `url(${ mainBg })`,
  backgroundColor: lightTheme.palette.secondary.main,
  backgroundSize: 'cover',
  width: '100%',
  height: '100vh',
  backgroundRepeat: 'no-repeat',
});

export function Home() {
  const dispatch = useDispatch();

  return (
    <StyledHomeContainer>
      <Typography component="h1" variant="h5">
        Home Page
      </Typography>
      <Button
        variant="outlined"
        onClick={() => {
          dispatch(changeTheme());
        }}
      >
        Change theme
      </Button>
    </StyledHomeContainer>
  );
}