"use client";

import { Box, Container, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import FooterColumn from "./FooterColumn";
import { useEffect, useState } from "react";
import axios from "axios";
import Grid from '@mui/material/Grid2';

const MAX_ROWS_PER_COLUMN = 6;



export default function KeywordFooter() {
  const params = useParams();
  const {location, keyword} = params;
  const [footerData, setFooterData] = useState([]);
  const apiUrl = process.env.NEXT_PUBLIC_IS_DEVELOPMENT === 'True' ? "http://127.0.0.1:8000" : 'https://api.famousbusiness.in'

  const formattedLocation = location.replace(/-/g, ' ');
  const formattedKeyword  = keyword.replace(/-/g, ' ');


  useEffect(() => {
    const params = new URLSearchParams({
        city: formattedLocation,
        keyword: formattedKeyword
    })

    const fetchFooterData = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/listings/search/keyword/business/?${params.toString()}`);
        const data =res.data;

        console.log('internal_link', data.results.internal_link)

        if (Array.isArray(data)) {
          setFooterData(data.results.internal_link);

        } else {
          console.warn("API did not return an array");
          setFooterData([]);
        }
      } catch (error) {
        console.error("Failed to fetch footer data:", error);
        setFooterData([]);
      }
    };
  
    fetchFooterData();

  }, [formattedLocation, formattedKeyword, apiUrl]);


  const renderColumns = () => {
    return footerData.flatMap((section) => {
      const columns = [];
      const chunkCount = Math.ceil(section.items.length / MAX_ROWS_PER_COLUMN);

      for (let i = 0; i < chunkCount; i++) {
        const chunk = section.items.slice(
          i * MAX_ROWS_PER_COLUMN,
          (i + 1) * MAX_ROWS_PER_COLUMN
        );
        columns.push(
          <Grid item xs={12} sm={6} md={3} key={`${section.name}-${i}`}>
            <FooterColumn title={i === 0 ? section.name : ""} items={chunk} />
          </Grid>
        );
      }

      return columns;
    });
  };
  

  return (
    <Box sx={{ backgroundColor: "#f9fafb", py: 6, px: 2 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {renderColumns()}
        </Grid>

        <Typography variant="body2" color="text.secondary" align="center" mt={4}>
          © {new Date().getFullYear()} <a href="https://famousbusiness.in/">famousbusiness.in.</a> All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}
