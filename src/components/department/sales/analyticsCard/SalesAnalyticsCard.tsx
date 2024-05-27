import { CssBaseline, Grid } from "@mui/material";
import React from "react";
import ShoppingCardIcon from "../../../../assets/images/icons/fi-rr-shopping-cart.svg";
import SectionCard, {
  ISectionCardProps,
} from "../../../common/sectionCard/SectionCard";
import SectionCardBtn from "../../../common/sectionCardBtn/SectionCardBtn";
import { CubeIcon } from "../../../icons";

interface ISalesAnalyticsCardProps extends ISectionCardProps {}

const SalesAnalyticsCard: React.FC<ISalesAnalyticsCardProps> = (props) => {
  return (
    <SectionCard {...props}>
      <CssBaseline />
      <Grid container rowSpacing={1} columnSpacing={2}>
        <Grid item xs={12} sm={"auto"}>
          <SectionCardBtn
            sx={{ width: "100%" }}
            title="Naqd"
            caption={`${props}`}
            icon={<img src={ShoppingCardIcon} alt="Cube" />}
          />
        </Grid>
        <Grid item xs={12} sm={"auto"}>
          <SectionCardBtn
            sx={{ width: "100%" }}
            title="Qaytarilgan mahsulotlar"
            caption="1 hafta | 1.000 ta"
            icon={<CubeIcon />}
          />
        </Grid>
      </Grid>
    </SectionCard>
  );
};

export default SalesAnalyticsCard;
