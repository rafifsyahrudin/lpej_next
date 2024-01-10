"use client";
import style from "./page.module.css";

import { Box, Container } from "@mui/material";
import React, { DragEvent, useState } from "react";

export default function Page() {
  const [images, setImages] = useState<(string | ArrayBuffer | null)[]>([]);
  const on = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    console.log("ok");
  };
  return (
    <>
      <Container>
        <Box
          sx={{
            width: 300,
            height: 300,
            bgcolor: "red",
          }}
          component="form"
          onDrag={on}
          onDragStart={on}
          onDragEnd={on}
          onDragOver={on}
          onDragEnter={on}
          onDragLeave={on}
          onDrop={(e) => {
            on(e);
            let dt = e.dataTransfer;
            let files = dt.files;

            [...files].forEach((f) => {
              const fr = new FileReader();
              fr.readAsDataURL(f);
              fr.onload = () => {
                setImages((oldV) => [...oldV, fr.result]);
              };
            });
          }}
        ></Box>
        {images.map((img, i) => (
          <Box
            component="img"
            key={i}
            src={img}
            alt="img"
            sx={{
              width: 300,
              height: 300,
              objectFit: "cover",
            }}
          />
        ))}
      </Container>
    </>
  );
}
