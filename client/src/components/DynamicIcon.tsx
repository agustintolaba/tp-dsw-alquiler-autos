import { Box, Icon } from "@mui/material";

const DynamicIcon = ({ name }: { name: string }) => {
  return (
    <Box>
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      ></link>
      <Box className="flex w-full flex-row items-center space-x-2 scale-150">
        <Icon className="text-slate-300">{name}</Icon>
      </Box>
    </Box>
  );
};

export default DynamicIcon;
