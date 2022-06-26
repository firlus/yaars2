import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DownloadIcon from "@mui/icons-material/Download";
import createManifest from "../utils/createManifest";
import decodeJwt from "jwt-decode";

export default function Dashboard() {
  return (
    <Card sx={{ maxWidth: 345, my: "28px" }}>
      <CardActionArea>
        <CardMedia component="img" height="140" image="/yaarsXpowerpoint.png" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Install PowerPoint AddIn
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Bring your PowerPoint slides to the next level by using the YAARS
            PowerPoint AddIn.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          color="primary"
          download="manifest.xml"
          href={URL.createObjectURL(
            new Blob([
              createManifest(
                process.env.REACT_APP_HOSTNAME || "localhost",
                decodeJwt(localStorage.getItem("jwt")).name,
                localStorage.getItem("jwt")
              ),
            ]),
            { type: "application/xml" }
          )}
        >
          <DownloadIcon /> Download
        </Button>
      </CardActions>
    </Card>
  );
}
