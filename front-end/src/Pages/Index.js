import Apps from "../Components/Apps";
import Typography from '@mui/material/Typography';


const Index = ({parentCallBack}) => {
  return (
    <div className="Index mt-5 container">
      <Typography 
          component="div" 
          variant="h5"
          sx={{ color: "inherit"}}
          className="mb-4"
          >
          Apps We Love
      </Typography>
      <Apps parentCallBack={parentCallBack} />
    </div>
  );
}

export default Index;
