import { Close } from "@mui/icons-material";
import { Button, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function PromoBanner() {
  const [visiblePromo, setVisiblePromo] = useState(true);
  const navigate = useNavigate();

  if (!visiblePromo) {
    return null;
  }

  return (
    <section className="w-">
      <div className="w-full shadow-sm flex bg-blue-400 flex-wrap lg:items-center lg:justify-center justify-end gap-x-6">
        <Typography className="text-lg" variant="body2" color="white">
          NEW | Extended Warranty Offer! Buy between July 8 – August 7 and get
          +2 years free warranty.
        </Typography>
        <Button onClick={() => navigate("/cart")}>Check out</Button>
        <IconButton onClick={() => setVisiblePromo(false)}>
          <Close className="text-white " />
        </IconButton>
      </div>
    </section>
  );
}
