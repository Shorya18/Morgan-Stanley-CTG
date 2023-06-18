import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import tiny from "../assets/images/tinymiracleslogo.jpg";

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function QuiltedImageList() {
  return (
    <ImageList
      sx={{ width: "100%", height: "95vh", overflow: "hidden" }}
      variant="quilted"
      cols={4}
      rowHeight={98}
    >
      {itemData.map((item) => (
        <ImageListItem
          key={item.img}
          cols={item.cols || 1}
          rows={item.rows || 1}
        >
          <img
            {...srcset(item.img, 121, item.rows, item.cols)}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1594708767771-a7502209ff51?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bmdvfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    title: "img1",
    rows: 3,
    cols: 2,
  },
  {
    img: "https://lh3.googleusercontent.com/D_mXBiodrN6aclKgtEo4xPz4YhxV0cxUUdwpCL1GIkxijmxgTHKWbHvtVLfoWEP4fCFChd1KElli3hR7_71RtNq4q-6ijMpyFpgtzFQM",
    title: "img2",
    rows: 2,
    cols: 2,
  },

  {
    img: tiny,
    title: "img3",
    cols: 2,
    rows: 3,
  },

  {
    img: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29tbXVuaXR5fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    title: "img4",
    rows: 3,
    cols: 2,
  },

  {
    img: "https://images.unsplash.com/photo-1569140733895-eabccf089fc3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG5nb3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    title: "img5",
    rows: 3,
    cols: 2,
  },
  {
    img: "https://lh3.googleusercontent.com/q_o5uwEjMvewGzi3ClLeEXKhzc3ctPlYXCR4Zy4FXIwy8Xw6-Rtq8JG-8i9nM2uwcyrFAbezkf-aPwLHO9ojkEQ2jJkrxm3Q_vOlpu1R",
    title: "img6",
    rows: 2,
    cols: 2,
  },
];
