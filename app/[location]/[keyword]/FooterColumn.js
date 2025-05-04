import { Typography, Link, Stack } from "@mui/material";

export default function FooterColumn({ title, items }) {
  return (
    <Stack spacing={1}>
      {title && (
        <Typography variant="subtitle1" fontWeight="bold">
          {title}
        </Typography>
      )}
      {items.map((item, index) => (
        <Link
          href={item.href || "#"}
          key={index}
          underline="hover"
          color="text.secondary"
          variant="body2"
        >
          {item.label}
        </Link>
      ))}
    </Stack>
  );
}
