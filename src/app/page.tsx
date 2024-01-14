import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default async function Page() {
  const post = {
    title: "Title of a longer featured blog post",
    description:
      "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
    image: "https://source.unsplash.com/random?wallpapers",
    imageText: "main image description",
    linkText: "Continue reading…",
  };

  return (
    <>
      <Container>
        <Paper
          sx={{
            display: "flex",
            pt: 1,
            pb: 2,
            px: 2,
            my: 2,
          }}
        >
          <Box
            sx={{
              ml: "auto",
            }}
          >
            <Link href="/sign-in">
              <Button size="small" variant="outlined">
                Sign In
              </Button>
            </Link>
          </Box>
        </Paper>
        <Paper
          sx={{
            position: "relative",
            backgroundColor: "grey.800",
            color: "#fff",
            mb: 4,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundImage: `url(${post.image})`,
          }}
        >
          {/* Increase the priority of the hero background image */}
          {
            <Image
              style={{ display: "none" }}
              src={post.image}
              alt={post.imageText}
              width={100}
              height={100}
            />
          }
          <Box
            sx={{
              position: "absolute",
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
              backgroundColor: "rgba(0,0,0,.3)",
            }}
          />
          <Grid container>
            <Grid item md={6}>
              <Box
                sx={{
                  position: "relative",
                  p: { xs: 3, md: 6 },
                  pr: { md: 0 },
                }}
              >
                <Typography
                  component="h1"
                  variant="h3"
                  color="inherit"
                  gutterBottom
                >
                  {post.title}
                </Typography>
                <Typography variant="h5" color="inherit" paragraph>
                  {post.description}
                </Typography>
                <Button variant="text" href="#">
                  {post.linkText}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
}
